import React, { useState } from 'react';
import { Link } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import DepartmentSelect from '../../shared/DepartmentSelect';
import Container from '../../../styled/layouts/Container';
import Button from '../../../styled/elements/Button';
import { ME } from '../../../apollo/queries/user';

const Departments = () => {
	//   const [departments, setDepartments] = useState([]);
	const [department, setDepartment] = useState();
	const { data } = useQuery(ME);
	let departments = [];

	if (data.me) {
		departments = data.me.supervisedDepartments;
	}

	const handleDeptChange = ({ target: { value } }) => {
		setDepartment(value);
	};

	return (
		<Container direction="column">
			<h1 className="title">Departments</h1>
			<DepartmentSelectWrapper>
				<DepartmentSelect
					departments={departments}
					value={department ? department.id : ''}
					handleChange={handleDeptChange}
				/>
				<Link to={department || ''}>
					<Button
						color="success"
						text="View"
						style={{ marginLeft: '2rem', width: 120 }}
						disabled={!department}
					/>
				</Link>
			</DepartmentSelectWrapper>
		</Container>
	);
};

const DepartmentSelectWrapper = styled.div`
	width: 100%;
	display: flex;
	margin-bottom: 2rem;

	select {
		width: 400px;
	}
`;

export default Departments;
