import React, { useState } from 'react';
import { Link, Match } from '@reach/router';
import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';

import DepartmentSelect from '../../shared/DepartmentSelect';
import Container from '../../../styled/layouts/Container';
import Button from '../../../styled/elements/Button';

const Departments = ({ departments = [] }) => {
	const [department, setDepartment] = useState('');

	const handleDepartmentSelect = ({ target: { value } }) => {
		setDepartment(value);
	};

	return (
		<Match path="/admin/*">
			{({ match: admin }) => (
				<Container direction="column">
					<h1 className="title">Departments</h1>

					<DepartmentSelectWrapper>
						<DepartmentSelect
							departments={departments}
							handleChange={handleDepartmentSelect}
							value={department}
						/>
						{department && (
							<Link to={department}>
								<Button
									color="success"
									text="Manage"
									style={{ marginLeft: '2rem', width: 120 }}
									disabled={!department}
								/>
							</Link>
						)}
					</DepartmentSelectWrapper>

					{admin && (
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
					)}
				</Container>
			)}
		</Match>
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
