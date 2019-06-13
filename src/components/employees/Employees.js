import React, { useState } from 'react';
import { Link, Redirect } from '@reach/router';
import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';
import { useQuery } from 'react-apollo-hooks';
import Fuse from 'fuse.js';

import { ME, USERS } from '../../apollo/queries/user';
import Container from '../../styled/layouts/Container';
import Button from '../../styled/elements/Button';
import EmployeeCard from './EmployeeCard';
import { Input } from '../../styled/elements/Form';

const Employees = () => {
	const [searchString, setSearchString] = useState('');

	const { data: meData } = useQuery(ME);
	const { me } = meData;

	const { data: usersData } = useQuery(USERS);
	const { users = [] } = usersData;

	const fuzzySearchOptions = {
		shouldSort: true,
		threshold: 0.2,
		location: 0,
		distance: 100,
		maxPatternLength: 3,
		minMatchCharLength: 1,
		keys: ['firstName', 'lastName', 'netId'],
	};
	const fuse = new Fuse(users, fuzzySearchOptions);
	const filteredUsers = searchString ? fuse.search(searchString) : users;

	// console.log('results:', filteredUsers);

	if (me && !me.admin && !me.supervisor) {
		return <Redirect to="/" noThrow />;
	}

	const handleSearch = e => setSearchString(e.target.value);

	return (
		<Container direction="column">
			<h1 className="title">Employees</h1>

			<EmployeeSelectWrapper>
				<Input
					type="text"
					placeholder="Search for employee (first name, last name, netId)"
					style={{
						width: 500,
						marginRight: '2rem',
					}}
					onChange={handleSearch}
				/>

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
			</EmployeeSelectWrapper>
			<Container>
				<EmployeeCardGrid>
					{filteredUsers.map(user => (
						<EmployeeLink to={user.id} key={user.id}>
							<EmployeeCard employee={user} />
						</EmployeeLink>
					))}
				</EmployeeCardGrid>
			</Container>
		</Container>
	);
};

const EmployeeSelectWrapper = styled.div`
	width: 100%;
	display: flex;
	margin-bottom: 2rem;
	align-items: center;
	justify-content: flex-start;

	select {
		width: 300px;
	}
`;

const EmployeeCardGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1rem;
`;

const EmployeeLink = styled(Link)`
	/* &:nth-of-type(2) {
		display: none;
	}

	&:nth-of-type(4) {
		display: none;
	} */
`;

export default Employees;
