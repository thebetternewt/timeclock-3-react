import React, { useState } from 'react';
import styled from 'styled-components';

import Fuse from 'fuse.js';
import { Link } from '@reach/router';
import { FaPlusCircle } from 'react-icons/fa';
import Select from 'react-select';

import Box from '../../styled/layouts/Box';
import Container from '../../styled/layouts/Container';
import Button from '../../styled/elements/Button';
import { List, ListHeader, Item } from '../../styled/elements/List';
import Spinner from '../../styled/elements/Spinner';
import {
	DEPARTMENT,
	USERS_BY_DEPARTMENT,
} from '../../apollo/queries/department';
import EmployeeSelect from '../shared/EmployeeSelect';
import { USERS, ME } from '../../apollo/queries/user';
import {
	ADD_SUPERVISOR_TO_DEPT,
	REMOVE_SUPERVISOR_FROM_DEPT,
	REMOVE_FROM_DEPT,
	ADD_TO_DEPT,
} from '../../apollo/mutations/user';
import { sortUsers } from '../../util/arrays';
import { useQuery, useMutation } from 'react-apollo-hooks';
import EmployeeCard from '../shared/EmployeeCard';
import { Input } from '../../styled/elements/Form';

const Department = ({ departmentId }) => {
	const [addingSupervisor, setAddingSupervisor] = useState(false);
	const [selectedSupervisor, setSelectedSupervisor] = useState('');
	const [addingEmployee, setAddingEmployee] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState('');
	const [searchString, setSearchString] = useState('');
	const [loading, setLoading] = useState(false);

	const toggleAddingSupervisor = () => setAddingSupervisor(!addingSupervisor);
	const toggleAddingEmployee = () => setAddingEmployee(!addingEmployee);

	const handleSupervisorSelect = e => setSelectedSupervisor(e.target.value);

	const handleEmployeeSearchSelect = opt => setSelectedEmployee(opt.value);
	const handleSupervisorSearchSelect = opt => setSelectedSupervisor(opt.value);

	// users in the department
	const { data: deptData, loading: deptLoading } = useQuery(DEPARTMENT, {
		variables: { id: departmentId },
		fetchPolicy: 'no-cache',
	});
	const { department = {} } = deptData;
	const { users: employees = [] } = department;

	// users in the system to choose to add to the department
	const { data: usersData } = useQuery(USERS, { fetchPolicy: 'no-cache' });
	const { users: allUsers = [] } = usersData;

	const { data: meData, loading: meLoading } = useQuery(ME);
	const { me = {} } = meData;
	const { admin, supervisor } = me;

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
	const handleAddSupervisor = async () => {
		try {
			await addSupervisorToDept({
				variables: { userId: selectedSupervisor, deptId: departmentId },
				refetchQueries: () => ['Department'],
			});
		} catch (err) {
			console.log(err);
		}
		setSelectedSupervisor('');
		setAddingSupervisor(false);
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
			setLoading(true);
			try {
				await removeSupervisorFromDept({
					variables: { userId: user.id, deptId: departmentId },
					refetchQueries: () => ['Department'],
				});
			} catch (err) {
				console.log(err);
			}
			setLoading(false);
		}
	};

	const dataLoading = deptLoading || meLoading;

	if (dataLoading) {
		return <Spinner size="100px" style={{ marginTop: '2rem' }} />;
	}

	const employeesForHire = allUsers.filter(
		user => !employees.find(emp => emp.id === user.id)
	);

	const nonSupervisors = allUsers.filter(
		user => !department.supervisors.find(emp => emp.id === user.id)
	);

	const supervisorOptions = sortUsers(nonSupervisors, 'lastName').map(emp => ({
		value: emp.id,
		label: `${emp.lastName}, ${emp.firstName} (${emp.netId})`,
	}));

	const employeeOptions = sortUsers(employeesForHire, 'lastName').map(emp => ({
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

			{/* Supervisors */}
			{admin && (
				<Container direction="column">
					<h2 className="section-title">Supervisors</h2>

					{addingSupervisor ? (
						<DepartmentActionsWrapper>
							<Select
								options={supervisorOptions}
								placeholder="Search for employee (first name, last name, netId)"
								styles={selectStyles}
								onChange={handleSupervisorSearchSelect}
								maxMenuHeight={120}
							/>

							<Button
								color="success"
								onClick={handleAddSupervisor}
								text="Add"
							/>

							<Button
								color="danger"
								onClick={toggleAddingSupervisor}
								text="Cancel"
							/>
							<Link to="../../employees/new">
								<Button color="primary" text="Create New" />
							</Link>
						</DepartmentActionsWrapper>
					) : (
						<DepartmentActionsWrapper>
							<Button
								color="success"
								text={() => (
									<>
										<FaPlusCircle /> Add New
									</>
								)}
								onClick={toggleAddingSupervisor}
							/>
						</DepartmentActionsWrapper>
					)}

					<EmployeeCardGrid>
						{sortUsers(department.supervisors, 'lastName').map(user => (
							<EmployeeCard
								key={user.id}
								employee={user}
								action={() => handleRemoveSupervisor(user)}
								actionText={'Remove'}
								// loading={loading}
							/>
						))}
					</EmployeeCardGrid>
				</Container>
			)}

			{/* Employees */}
			<Container direction="column">
				<div className="divider" />
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
									<FaPlusCircle /> Add New
								</>
							)}
							onClick={toggleAddingEmployee}
						/>
					</DepartmentActionsWrapper>
				)}

				<EmployeeCardGrid>
					{sortUsers(employees, 'lastName').map(user => (
						<EmployeeCard
							key={user.id}
							employee={user}
							action={() => handleRemove(user)}
							actionText={'Remove'}
							// loading={loading}
						/>
					))}
				</EmployeeCardGrid>
			</Container>
		</div>
	);
};

const DepartmentDetailBox = styled(Box)`
	margin-bottom: 2rem;
`;

const DepartmentActionsWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;

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
