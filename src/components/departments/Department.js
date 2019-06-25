import { Link } from '@reach/router';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { FaPlusCircle } from 'react-icons/fa';
import Select from 'react-select';
import styled from 'styled-components';
import {
	ADD_SUPERVISOR_TO_DEPT,
	ADD_TO_DEPT,
	REMOVE_FROM_DEPT,
	REMOVE_SUPERVISOR_FROM_DEPT,
} from '../../apollo/mutations/user';
import { DEPARTMENT } from '../../apollo/queries/department';
import {
	ME,
	USERS,
	USER_SHIFTS,
	CURRENT_USER_WORKSTUDY,
} from '../../apollo/queries/user';
import { CURRENT_WORK_STUDY_PERIOD } from '../../apollo/queries/workStudyPeriod';
import Button from '../../styled/elements/Button';
import Spinner from '../../styled/elements/Spinner';
import Container from '../../styled/layouts/Container';
import { sort } from '../../util/arrays';
import EmployeeCard from '../shared/EmployeeCard';
import { aggWorkStudy } from '../../util/workstudy';

const Department = ({ departmentId }) => {
	const [addingEmployee, setAddingEmployee] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState('');

	const toggleAddingEmployee = () => setAddingEmployee(!addingEmployee);

	const handleEmployeeSearchSelect = opt => setSelectedEmployee(opt.value);

	// users in the department
	const { data: deptData, loading: deptLoading } = useQuery(DEPARTMENT, {
		variables: { id: departmentId },
		fetchPolicy: 'no-cache',
	});
	const { department = {} } = deptData;
	const { users: employees = [] } = department;

	if (department.supervisors) {
		employees.forEach(emp => {
			emp.isSupervisor = !!department.supervisors.find(
				sup => sup.id === emp.id
			);
		});
	}

	// users in the system to choose to add to the department
	const { data: usersData } = useQuery(USERS, { fetchPolicy: 'no-cache' });
	const { users: allUsers = [] } = usersData;

	const { data: meData, loading: meLoading } = useQuery(ME);
	const { me = {} } = meData;
	const { admin } = me;

	const { data: wsData, loading: wsLoading } = useQuery(
		CURRENT_WORK_STUDY_PERIOD
	);
	const { workStudyPeriod: currentWSPeriod } = wsData;

	// const { data: userData } = useQuery(USER);
	// const { workStudy: userWorkStudy } = userData;

	const removeFromDept = useMutation(REMOVE_FROM_DEPT);
	const handleRemove = async user => {
		if (
			window.confirm(
				`Are you sure you want to remove ${user.name} from  ${department.name}?`
			)
		) {
			try {
				await removeFromDept({
					variables: { userId: user.id, deptId: departmentId },
					refetchQueries: () => ['Department'],
				});
			} catch (err) {
				console.log(err);
			}
		}
	};

	const addToDept = useMutation(ADD_TO_DEPT);
	const handleAdd = async () => {
		try {
			await addToDept({
				variables: { userId: selectedEmployee, deptId: departmentId },
				refetchQueries: () => ['Department'],
			});
		} catch (err) {
			console.log(err);
		}
		setSelectedEmployee('');
		setAddingEmployee(false);
	};

	const addSupervisorToDept = useMutation(ADD_SUPERVISOR_TO_DEPT);
	const handleAddSupervisor = async userId => {
		try {
			await addSupervisorToDept({
				variables: { userId, deptId: departmentId },
				refetchQueries: () => ['Department'],
			});
		} catch (err) {
			console.log(err);
		}
	};

	const removeSupervisorFromDept = useMutation(REMOVE_SUPERVISOR_FROM_DEPT);
	const handleRemoveSupervisor = async user => {
		if (
			window.confirm(
				`Are you sure you want to remove ${user.name} from supervising ${
					department.name
				}?`
			)
		) {
			try {
				await removeSupervisorFromDept({
					variables: { userId: user.id, deptId: departmentId },
					refetchQueries: () => ['Department'],
				});
			} catch (err) {
				console.log(err);
			}
		}
	};

	const dataLoading = deptLoading || meLoading || wsLoading;

	if (dataLoading) {
		return <Spinner size="100px" style={{ marginTop: '2rem' }} />;
	}

	const employeesForHire = allUsers.filter(
		user => !employees.find(emp => emp.id === user.id)
	);

	const nonSupervisors = allUsers.filter(
		user => !department.supervisors.find(emp => emp.id === user.id)
	);

	const employeeOptions = sort(employeesForHire, 'lastName').map(emp => ({
		value: emp.id,
		label: `${emp.lastName}, ${emp.firstName} (${emp.netId})`,
	}));

	const selectStyles = {
		container: base => ({
			...base,
			width: 500,
			marginRight: '2rem',
			color: '#333',
		}),
		menu: base => ({
			...base,
			marginTop: -6,
			borderRadius: `0 0 3px 3px`,
		}),
	};

	return (
		<div>
			<Container direction="column">
				<div style={{ display: 'flex' }}>
					<h1 className="title">{department.name}</h1>
					{admin && (
						<DepartmentActionsWrapper>
							<Button
								href="edit"
								text="edit"
								naked
								style={{
									display: 'flex',
									alignSelf: 'flex-end',
									width: 'auto',
									minWidth: 0,
								}}
							/>
						</DepartmentActionsWrapper>
					)}
				</div>
			</Container>

			{/* Employees */}
			<Container direction="column">
				<h2 className="section-title">Employees</h2>

				{addingEmployee ? (
					<DepartmentActionsWrapper>
						<Select
							options={employeeOptions}
							placeholder="Search for employee (first name, last name, netId)"
							styles={selectStyles}
							onChange={handleEmployeeSearchSelect}
							maxMenuHeight={120}
						/>

						<Button color="success" onClick={handleAdd} text="Add" />

						<Button
							color="danger"
							onClick={toggleAddingEmployee}
							text="Cancel"
						/>
						<Link to={`../../employees/new?deptId=${departmentId}`}>
							<Button color="primary" text="Create New" />
						</Link>
					</DepartmentActionsWrapper>
				) : (
					<DepartmentActionsWrapper>
						<Button
							color="success"
							text={() => (
								<>
									<FaPlusCircle /> Add Employee
								</>
							)}
							onClick={toggleAddingEmployee}
						/>
					</DepartmentActionsWrapper>
				)}

				<EmployeeCardGrid>
					{sort(employees, ['lastName', 'isSupervisor']).map(user => (
						<Query
							query={CURRENT_USER_WORKSTUDY}
							variables={{
								userId: user.id,
								deptId: departmentId,
							}}
							key={user.id}
						>
							{({ data }) => {
								let amount;
								if (data && data.workStudy) {
									amount = data.workStudy.amount;
								}

								return (
									<Query
										query={USER_SHIFTS}
										variables={{
											userId: user.id,
											deptId: departmentId,
											startDate: currentWSPeriod.startDate,
											endDate: currentWSPeriod.endDate,
										}}
									>
										{({ data }) => {
											let wsDetails = [];

											if (data && data.shifts) {
												wsDetails = aggWorkStudy({
													amountAllotted: amount,
													shifts: data.shifts,
												});
											}

											const toggleSupervisor = () => {
												if (!admin) return; //? Not necessary, but prevents mutation from running unnecessarily.

												if (user.isSupervisor) {
													handleRemoveSupervisor(user);
												} else {
													handleAddSupervisor(user.id);
												}
											};

											return (
												<EmployeeCard
													hideAction={!admin && user.isSupervisor}
													employee={user}
													supervisor={user.isSupervisor}
													action={() => handleRemove(user)}
													actionText={'Remove'}
													workStudyDetails={wsDetails}
													workStudyUsed={Math.round(wsDetails.percentUsed)}
													toggleSupervisor={toggleSupervisor}
												/>
											);
										}}
									</Query>
								);
							}}
						</Query>
					))}
				</EmployeeCardGrid>
			</Container>
		</div>
	);
};

const DepartmentActionsWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;
	z-index: 10;

	button {
		margin-right: 1rem;
		min-width: 100px;
		padding: 0 1rem;
	}
`;

const EmployeeCardGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1rem;
`;

export default Department;
