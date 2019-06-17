import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';
import { Link, navigate } from '@reach/router';

import Button from '../../../styled/elements/Button';
import Container from '../../../styled/layouts/Container';
import DepartmentSelect from '../../shared/DepartmentSelect';
import Activity from './Activity';
import PrivateRoute from '../../shared/PrivateRoute';
import { ME } from '../../../apollo/queries/user';
import { DEPARTMENTS } from '../../../apollo/queries/department';
import { sortDepartments } from '../../../util/arrays';

const SupervisorDashboard = ({ ...props }) => {
	console.log('dash-props:', props);
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

	// Sort departments by name
	departments = sortDepartments(departments, 'name');

	// If departments are fetched && no department set as selected,
	// then set first department as selected.
	if (departments.length > 0 && !department) setDepartment(departments[0]);

	const handleDeptChange = async e => {
		const deptId = e.target.value;
		setDepartment(departments.find(dept => dept.id === deptId));
		await navigate(`/supervisor/${deptId}`);
	};

	return (
		<>
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
			</Container>
			<Container>
				{/* {department && <Activity department={department} />} */}
				{props.children}
			</Container>
		</>
	);
};

const DepartmentSelectWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
`;

export default props => (
	<PrivateRoute {...props} component={SupervisorDashboard} />
);
