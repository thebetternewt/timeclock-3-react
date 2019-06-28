import { Link } from '@reach/router';
import { format, startOfDay, endOfDay } from 'date-fns';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { FaCheck, FaPencilAlt, FaPlusCircle, FaTimes } from 'react-icons/fa';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

import { ACTIVATE_USER, DEACTIVATE_USER } from '../../apollo/mutations/user';
import { ME, USER, USER_SHIFTS } from '../../apollo/queries/user';
import Button from '../../styled/elements/Button';
import { Item, List, ListHeader } from '../../styled/elements/List';
import Spinner from '../../styled/elements/Spinner';
import Box from '../../styled/layouts/Box';
import Container from '../../styled/layouts/Container';
import { DANGER, LIGHT_GRAY, SUCCESS } from '../../styled/utilities';
import History from '../shared/history/History';
import ShiftModal from '../shared/ShiftModal';
import WorkStudyModal from './workStudy/WorkStudyModal';
import { aggWorkStudy } from '../../util/workstudy';
import { Query } from 'react-apollo';

const Employee = ({ employeeId }) => {
	const [workStudyModalOpen, setWorkStudyModalOpen] = useState(false);
	const [selectedWorkStudy, setSelectedWorkStudy] = useState();
	const [addShiftModalOpen, setAddShiftModalOpen] = useState(false);
	const [activateLoading, setActivateLoading] = useState(false);

	const { data: meData } = useQuery(ME);
	const { me = {} } = meData;

	const { data: userData, loading } = useQuery(USER, {
		variables: { id: employeeId },
		fetchPolicy: 'no-cache',
	});

	const deactivate = useMutation(DEACTIVATE_USER, {
		refetchQueries: () => ['User'],
	});
	const activate = useMutation(ACTIVATE_USER, {
		refetchQueries: () => ['User'],
	});

	let user;
	user = userData.user;

	console.log('emp:', user);

	if (loading) {
		return <Spinner size="100px" style={{ marginTop: '2rem' }} />;
	}

	if (!user) {
		return <EmployeeDetailBox>User Not Found.</EmployeeDetailBox>;
	}

	const toggleWorkStudyModal = () => setWorkStudyModalOpen(!workStudyModalOpen);
	const toggleAddShiftModal = () => setAddShiftModalOpen(!addShiftModalOpen);

	const handleWorkStudySelect = ws => setSelectedWorkStudy(ws);

	return (
		<Container direction="column">
			<h1 className="title">{user.name}</h1>
			<Container>
				<EmployeeDetail>
					<DetailColumn>
						<h3>Details</h3>
						<div>NetID: {user.netId}</div>
						<div>
							Student ID: {user.nineDigitId.slice(0, 3)}-
							{user.nineDigitId.slice(3, 6)}-{user.nineDigitId.slice(6, 9)}{' '}
						</div>
						<div>Email: {user.email}</div>
						{user.phone && (
							<div>
								Phone:{' '}
								<NumberFormat
									value={user.phone}
									displayType="text"
									format="(###) ###-####"
								/>
							</div>
						)}
						<div className="divider" />

						{user.street1 && (
							<div className="address">
								<h3>Address:</h3>
								<p>{user.street1}</p>
								<p>{user.street2}</p>
								<p>
									{user.city}, {user.state} {user.zip}
								</p>
								<div className="divider" />
							</div>
						)}

						<div className="status">
							<h3>Status:</h3>
							<div className="status-indicator" style={{ marginTop: '1rem' }}>
								{user.active ? (
									<FaCheck color={SUCCESS} />
								) : (
									<FaTimes color={DANGER} />
								)}
								Active
							</div>

							<div className="status-indicator">
								{user.admin ? (
									<FaCheck color={SUCCESS} />
								) : (
									<FaTimes color={DANGER} />
								)}
								Admin
							</div>
						</div>
					</DetailColumn>
					<DetailColumn>
						<div className="user-departments">
							<h3>Current Departments</h3>
							<ul>
								{user.departments.map(dept => {
									// Show link to department if current user is admin or dept supervisor
									const showLink =
										me.admin ||
										me.supervisedDepartments.find(sd => sd.id === dept.id);

									return (
										<DeptItem key={dept.id}>
											{dept.name}
											{showLink && (
												<Button href={`/departments/${dept.id}`} text="view" />
											)}
										</DeptItem>
									);
								})}
							</ul>
						</div>
					</DetailColumn>
				</EmployeeDetail>
				<EmployeeActionsWrapper>
					<Link to="edit">
						<Button text="Edit Employee" color="primary" />
					</Link>

					{(me.admin || (me.supervisor && !user.active)) && (
						<Button
							text={user.active ? 'Deactivate Employee' : 'Activate Employee'}
							color="danger"
							loading={activateLoading}
							onClick={async () => {
								const variables = { netId: user.netId };
								setActivateLoading(true);

								try {
									if (user.active) {
										await deactivate({ variables });
									} else {
										await activate({ variables });
									}
								} catch (err) {
									console.log(err);
								}
								setActivateLoading(false);
							}}
						/>
					)}

					<Button
						text="Add Shift"
						color="success"
						onClick={toggleAddShiftModal}
					/>
				</EmployeeActionsWrapper>
			</Container>

			<div>
				<div className="divider" />
				<h2 className="section-title">History</h2>
				<History employee={user} />
			</div>

			{/* Workstudy */}
			<div>
				<div className="divider" />
				<h2 className="section-title">Work Study</h2>
				<EmployeeDetailBox>
					<ListHeader>Workstudy</ListHeader>
					<List>
						{user &&
							user.workStudy.map(ws => (
								<Query
									query={USER_SHIFTS}
									variables={{
										userId: employeeId,
										deptId: ws.department.id,
										startDate: startOfDay(ws.startDate),
										endDate: endOfDay(ws.endDate),
									}}
									key={ws.id}
								>
									{({ data }) => {
										let wsDetails = [];

										if (data && data.shifts) {
											wsDetails = aggWorkStudy({
												amountAllotted: ws.amount,
												shifts: data.shifts,
											});
										}

										return (
											<WorkStudyItem>
												<div className="detail">
													<div className="department">{ws.department.name}</div>
													<div className="period">
														<span style={{ fontWeight: 'bold' }}>
															{ws.period.name} {ws.period.year}
														</span>
														<br />
														{format(ws.startDate, 'MMM DD')} -{' '}
														{format(ws.endDate, 'MMM DD')}
													</div>
												</div>
												<div className="amount">
													<p>
														<NumberFormat
															displayType="text"
															thousandSeparator
															decimalScale={2}
															prefix="$"
															value={
																wsDetails.amountAllotted - wsDetails.amountUsed
															}
														/>{' '}
														of{' '}
														<NumberFormat
															displayType="text"
															thousandSeparator
															decimalScale={2}
															prefix="$"
															value={wsDetails.amountAllotted}
														/>{' '}
														remaining
													</p>
													<p>
														{(
															wsDetails.hoursAvailable - wsDetails.hoursUsed
														).toFixed(1)}{' '}
														hours remaining
													</p>
												</div>

												<div className="actions">
													<Button
														text={() => <FaPencilAlt />}
														naked
														onClick={() => {
															handleWorkStudySelect(ws);
															toggleWorkStudyModal();
														}}
													/>
												</div>
											</WorkStudyItem>
										);
									}}
								</Query>
							))}
					</List>
					<Button
						color="success"
						text={() => (
							<>
								<FaPlusCircle /> Add Workstudy
							</>
						)}
						style={{ marginTop: '1rem' }}
						onClick={() => {
							setSelectedWorkStudy(null);
							toggleWorkStudyModal();
						}}
					/>
				</EmployeeDetailBox>
			</div>
			{workStudyModalOpen && (
				<WorkStudyModal
					close={toggleWorkStudyModal}
					employee={user}
					departments={user.departments}
					workStudy={selectedWorkStudy}
				/>
			)}

			{addShiftModalOpen && (
				<ShiftModal employee={user} close={toggleAddShiftModal} />
			)}
		</Container>
	);
};

const EmployeeDetail = styled.div`
	display: flex;
	flex-basis: 50%;
	margin-bottom: 2rem;
`;

const DetailColumn = styled.div`
	font-size: 0.9rem;

	h3 {
		font-weight: normal;
		margin-bottom: 0.5rem;
		margin-top: 0;
		font-size: 1.2rem;
	}

	.divider {
		margin: 2rem 0 0.3rem;
	}

	.address,
	.status {
		margin-top: 1rem;

		p {
			margin: 0.1em;
		}
	}

	.status-indicator {
		display: flex;
		align-items: center;

		svg {
			margin-right: 0.6rem;
		}
	}

	.user-departments {
		margin: 0 0 0 3rem;

		ul {
			margin-top: 0;
			list-style: none;
			padding: 0;
		}
	}

	> * {
		margin: 0.3rem 0;
	}
`;

const EmployeeDetailBox = styled(Box)`
	margin: 2rem 0;
`;

const EmployeeActionsWrapper = styled.div`
	margin-left: auto;

	button {
		display: block;
		width: 200px;
	}
`;

const WorkStudyItem = styled(Item)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	background-color: ${LIGHT_GRAY};
	color: #000;

	margin: 5px 0;
	padding: 8px 15px;
	border-radius: 3px;

	.detail {
		flex-basis: 220px;
	}

	.department {
		font-weight: 500;
		color: #333;
		margin-bottom: 0.2rem;
	}

	.period {
		color: #555;
		font-size: 0.8em;
	}

	.amount {
		font-size: 0.8em;
		margin-left: 1.3rem;

		p {
			margin: 0;
			margin-bottom: 0.3em;

			&:nth-of-type(2) {
				opacity: 0.6;
			}
		}
	}

	.actions {
		margin-left: auto;
	}
`;

const DeptItem = styled.li`
	display: flex;
	white-space: nowrap;
	align-items: center;
	justify-content: space-between;
	font-size: 0.9rem;
	margin: 0.3rem 0;

	a {
		height: 1rem;
		font-size: 0.7em;
		padding: 3px;
		margin: 0 0 0 2rem;
		text-transform: uppercase;
	}
`;

export default Employee;
