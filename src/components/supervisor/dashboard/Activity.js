import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import ActiveEmployeeCard from './ActiveEmployeeCard';
import { USERS_BY_DEPARTMENT } from '../../../apollo/queries/department';
import Spinner from '../../../styled/elements/Spinner';

const ActivityWrapper = ({ departmentId, ...props }) => {
	console.log('activy props:', props);

	const { data, loading } = useQuery(USERS_BY_DEPARTMENT, {
		variables: { deptId: departmentId },
		fetchPolicy: 'no-cache',
	});

	if (!data.deptUsers || loading) {
		return <Spinner size="60px" />;
	}

	let clockedInEmployees = [];

	if (data.deptUsers) {
		clockedInEmployees = data.deptUsers.filter(
			emp => emp.isClockedIn && emp.lastShift.department.id === departmentId
		);
	}

	return (
		<Activity>
			<div className="employee-count">
				Employee Count: {data.deptUsers.length}
			</div>
			<div style={{ marginTop: '1rem' }} className="divider" />
			<div>
				<h2 className="section-title">
					Clocked in Employees: {clockedInEmployees.length}
				</h2>
				<EmployeeCardGrid>
					{clockedInEmployees.map(user => (
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

	.employee-count {
		opacity: 0.8;
		margin-bottom: 0.3em;
		font-weight: 400;
		font-size: 1rem;
		margin: 1rem 0 2rem;
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
