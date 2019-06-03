import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';

import EmployeeSelect from '../../shared/EmployeeSelect';
import Container from '../../../styled/layouts/Container';
import Button from '../../../styled/elements/Button';
import { Link } from '@reach/router';

const Employees = ({ employees = [] }) => {
	const [employee, setEmployee] = useState();

	const handleEmployeeSelect = ({ target: { value } }) => setEmployee(value);

	return (
		<Container direction="column">
			<h1 className="title">Employees</h1>

			<EmployeeSelectWrapper>
				<EmployeeSelect
					employees={employees}
					handleChange={handleEmployeeSelect}
					value={employee}
				/>
				<Link to={employee || ''}>
					<Button
						color="success"
						text="View"
						style={{ marginLeft: '2rem', width: 120 }}
						disabled={!employee}
					/>
				</Link>
			</EmployeeSelectWrapper>

			<Link to="new">
				<Button
					color="success"
					text={() => (
						<>
							<FaPlusCircle /> Create Employee
						</>
					)}
				/>
			</Link>
		</Container>
	);
};

const EmployeeSelectWrapper = styled.div`
	width: 100%;
	display: flex;
	margin-bottom: 2rem;

	select {
		width: 400px;
	}
`;

export default Employees;
