import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import Container from '../../../styled/layouts/Container';
import DepartmentSelect from '../../shared/DepartmentSelect';
import Activity from '../../shared/dashboard/Activity';
import PrivateRoute from '../../shared/PrivateRoute';
import { ME } from '../../../apollo/queries/user';

const Dashboard = () => {
	// const [departments, setDepartments] = useState([]);
	const [department, setDepartment] = useState();

	const { data } = useQuery(ME);

	let departments = [];

	if (data.me) {
		departments = data.me.supervisedDepartments;
	}

	const handleDeptChange = e =>
		setDepartment(departments.find(dept => dept.id === e.target.value));

	return (
		<Container direction="column">
			<DepartmentSelectWrapper>
				<label>Department</label>
				<DepartmentSelect
					departments={departments}
					value={department ? department.id : ''}
					handleChange={handleDeptChange}
				/>
			</DepartmentSelectWrapper>

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
