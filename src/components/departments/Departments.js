import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import Fuse from 'fuse.js';
import { Link, Redirect } from '@reach/router';
import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';

import { ME, USERS } from '../../apollo/queries/user';
import { DEPARTMENTS } from '../../apollo/queries/department';
import Container from '../../styled/layouts/Container';
import Button from '../../styled/elements/Button';
import DepartmentCard from './DepartmentCard';
import { Input } from '../../styled/elements/Form';

const Departments = () => {
	const [searchString, setSearchString] = useState('');

	const { data: deptData } = useQuery(DEPARTMENTS, {
		fetchPolicy: 'cache-and-network',
	});
	const { departments = [] } = deptData;

	const { data: meData } = useQuery(ME);
	const { me } = meData;

	if (me && !me.admin) {
		return <Redirect to="/" noThrow />;
	}

	const fuzzySearchOptions = {
		shouldSort: true,
		threshold: 0.2,
		location: 0,
		distance: 100,
		maxPatternLength: 3,
		minMatchCharLength: 1,
		keys: ['name', 'supervisors.name'],
	};
	const fuse = new Fuse(departments, fuzzySearchOptions);
	const filteredDepartments = searchString
		? fuse.search(searchString)
		: departments;

	const handleSearch = e => setSearchString(e.target.value);

	return (
		<Container direction="column">
			<h1 className="title">Departments</h1>

			<DepartmentSelectWrapper>
				<Input
					type="text"
					placeholder="Search by name"
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
								<FaPlusCircle /> Create Department
							</>
						)}
					/>
				</Link>
			</DepartmentSelectWrapper>
			<Container>
				<DepartmentCardGrid>
					{filteredDepartments.map(department => (
						<Link to={department.id} key={department.id}>
							<DepartmentCard department={department} />
						</Link>
					))}
				</DepartmentCardGrid>
			</Container>
		</Container>
	);
};

const DepartmentSelectWrapper = styled.div`
	width: 100%;
	display: flex;
	margin-bottom: 2rem;
	align-items: center;
	justify-content: flex-start;

	select {
		width: 300px;
	}
`;

const DepartmentCardGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 1rem;
	grid-template-rows: minmax(100px, auto);
`;

export default Departments;
