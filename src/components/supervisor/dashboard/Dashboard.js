import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';
import { Link } from '@reach/router';

import Button from '../../../styled/elements/Button';
import Container from '../../../styled/layouts/Container';
import DepartmentSelect from '../../shared/DepartmentSelect';
import Activity from '../../shared/dashboard/Activity';
import PrivateRoute from '../../shared/PrivateRoute';
import { ME } from '../../../apollo/queries/user';
import { DEPARTMENTS } from '../../../apollo/queries/department';

const Dashboard = () => {
	const [department, setDepartment] = useState();

	const { data: meData } = useQuery(ME);
	const { me } = meData;

	// Fetch all departments
	const { data: deptData } = useQuery(DEPARTMENTS);
	const { departments: allDepts = [] } = deptData;

	let departments = allDepts;

	// If current user isn't admin (only supervisor),
	// then limit departments to supervised departments.
	if (me && !me.admin) {
		departments = me.supervisedDepartments;
	}

	// If departments are fetched && no department set as selected,
	// then set first department as selected.
	if (departments.length > 0 && !department) setDepartment(departments[0]);

	const handleDeptChange = e =>
		setDepartment(departments.find(dept => dept.id === e.target.value));

	return (
		<Container direction="column">
			<h1 className="title">Dashboard</h1>
			<div style={{ display: 'flex', alignItems: 'flex-end' }}>
				<DepartmentSelectWrapper>
					<label>Department</label>
					<DepartmentSelect
						departments={departments}
						value={department ? department.id : ''}
						handleChange={handleDeptChange}
					/>
				</DepartmentSelectWrapper>

				<Link to={`/departments/${department && department.id}`}>
					<Button
						color="success"
						text="Manage"
						style={{ width: 120, marginLeft: '2rem' }}
						disabled={!department}
					/>
				</Link>
			</div>

			{department && <Activity department={department} />}
		</Container>
	);
};

const DepartmentSelectWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
`;

export default () => <PrivateRoute component={Dashboard} />;
