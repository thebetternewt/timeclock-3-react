import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';
import { useQuery } from 'react-apollo-hooks';

import { ME, USERS } from '../../apollo/queries/user';
import EmployeeSelect from '../shared/EmployeeSelect';
import Container from '../../styled/layouts/Container';
import Button from '../../styled/elements/Button';
import { Link, Redirect } from '@reach/router';

const Employees = () => {
	const [employee, setEmployee] = useState('');

	const { data: meData } = useQuery(ME);
	const { me } = meData;

	const { data: usersData } = useQuery(USERS);
	const { users = [] } = usersData;

	if (me && !me.admin && !me.supervisor) {
		return <Redirect to="/" noThrow />;
	}

	const handleEmployeeSelect = ({ target: { value } }) => setEmployee(value);

	return (
		<Container direction="column">
			<h1 className="title">Employees</h1>

			<EmployeeSelectWrapper>
				<EmployeeSelect
					employees={users}
					handleChange={handleEmployeeSelect}
					value={employee}
				/>

				<Link to={employee}>
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
