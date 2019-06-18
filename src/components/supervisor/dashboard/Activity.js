import React from 'react';
import { Redirect } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import ActiveEmployeeCard from './ActiveEmployeeCard';
import { USERS_BY_DEPARTMENT } from '../../../apollo/queries/department';
import Spinner from '../../../styled/elements/Spinner';
import { sortUsers } from '../../../util/arrays';

const ActivityWrapper = ({ departmentId, ...props }) => {
	console.log('activy props:', props);

	const { data, loading } = useQuery(USERS_BY_DEPARTMENT, {
		variables: { deptId: departmentId },
		fetchPolicy: 'no-cache',
	});

	const { deptUsers = [] } = data;

	if (loading) {
		return <Spinner size="60px" />;
	}

	if (!data.deptUsers) {
		return <Redirect to="/supervisor" />;
	}

	let clockedInEmployees = [];
	let clockedOutEmployees = [];

	clockedInEmployees = deptUsers.filter(
		emp => emp.isClockedIn && emp.lastShift.department.id === departmentId
	);

	const clockedInIds = clockedInEmployees.map(emp => emp.id);

	clockedOutEmployees = deptUsers.filter(emp => !clockedInIds.includes(emp.id));

	return (
		<Activity>
			<div className="clocked-in">
				<h2 className="section-title">
					Clocked in Employees: {clockedInEmployees.length}
				</h2>
				<EmployeeCardGrid>
					{sortUsers(clockedInEmployees, 'lastName').map(user => (
						<ActiveEmployeeCard employee={user} key={user.id} clockedIn />
					))}
				</EmployeeCardGrid>
			</div>
			<div className="clocked-out">
				<div className="divider" />
				<h2 className="section-title">
					Clocked out Employees: {clockedOutEmployees.length}
				</h2>
				<EmployeeCardGrid>
					{sortUsers(clockedOutEmployees, 'lastName').map(user => (
						<ActiveEmployeeCard employee={user} key={user.id} />
					))}
				</EmployeeCardGrid>
			</div>
		</Activity>
	);
};

const Activity = styled.div`
	display: flex;
	flex-direction: column;
	width: 800px;
	margin-bottom: 3rem;

	.clocked-in {
		margin: 3rem 0;
	}

	.heading {
		text-transform: uppercase;
		opacity: 0.8;
		font-weight: 400;
		font-size: 1rem;
		margin: 0 0 1rem;
	}
`;

const EmployeeCardGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1rem;
`;

export default ActivityWrapper;
