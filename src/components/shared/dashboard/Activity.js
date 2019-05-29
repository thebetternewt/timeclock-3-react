import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import Box from '../../../styled/layouts/Box';
import EmployeesTable from './EmployeesTable';
import { USERS_BY_DEPARTMENT } from '../../../apollo/queries/department';
import Spinner from '../../../styled/elements/Spinner';

const ActivityWrapper = ({ department }) => {
	const { data, loading } = useQuery(USERS_BY_DEPARTMENT, {
		variables: { deptId: department.id },
	});

	if (!data.deptUsers || loading) {
		return <Spinner size="60px" />;
	}

	let clockedInEmployees = [];

	if (data.deptUsers) {
		clockedInEmployees = data.deptUsers.filter(
			emp => emp.isClockedIn && emp.lastShift.department.id === department.id
		);
	}

	return (
		<Activity>
			<div className="employee-count">
				Employee Count: {data.deptUsers.length}
			</div>
			<Box>
				<div className="heading">
					Clocked in employees: {clockedInEmployees.length}
				</div>
				<EmployeesTable employees={clockedInEmployees} />
			</Box>
		</Activity>
	);
};

const Activity = styled.div`
	display: flex;
	flex-direction: column;
	width: 800px;

	.employee-count {
		opacity: 0.7;
		margin-bottom: 0.3em;
		font-weight: 400;
		font-size: 1rem;
		margin: 1rem 0 2rem;
	}

	.heading {
		text-transform: uppercase;
		opacity: 0.7;
		margin-bottom: 0.3em;
		font-weight: 400;
		font-size: 1rem;
		margin: 0;
	}
`;

export default ActivityWrapper;
