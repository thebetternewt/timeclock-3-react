import React, { useState } from 'react';
import { Link } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import Button from '../../../styled/elements/Button';
import Container from '../../../styled/layouts/Container';
import DepartmentSelect from '../../shared/DepartmentSelect';
import PrivateRoute from '../../shared/PrivateRoute';
import { ME } from '../../../apollo/queries/user';
import { DEPARTMENTS } from '../../../apollo/queries/department';
import { sortDepartments } from '../../../util/arrays';

const SupervisorDashboard = ({ children, navigate, ...props }) => {
	console.log('dash-props:', props);
	console.log('splat:', props['*']);
	const [departmentId, setDepartmentId] = useState();

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
	if (departments.length > 0 && !departmentId) {
		const selectedDepartmentId = props['*'];
		if (selectedDepartmentId) {
			setDepartmentId(selectedDepartmentId);
			navigate(selectedDepartmentId);
		} else {
			setDepartmentId(departments[0].id);
			navigate(departments[0].id);
		}
	}

	const handleDeptChange = async e => {
		const deptId = e.target.value;
		setDepartmentId(deptId);
		navigate(`/supervisor/${deptId}`);
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
							value={departmentId}
							handleChange={handleDeptChange}
						/>
					</DepartmentSelectWrapper>

					<Link to={`/departments/${departmentId}`}>
						<Button
							color="success"
							text="Manage"
							style={{ width: 120, marginLeft: '2rem' }}
							disabled={!departmentId}
						/>
					</Link>
				</div>
			</Container>
			<Container>{children}</Container>
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
