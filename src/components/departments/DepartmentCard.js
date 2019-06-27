import React from 'react';
import styled from 'styled-components';

const DepartmentCard = ({ department }) => {
	const { supervisors, users } = department;

	return (
		<Card>
			<div>
				<h4>{department.name}</h4>
				<h5>Supervisors</h5>
				<ul className="supervisors">
					{supervisors.length > 0 ? (
						supervisors.map(sup => <li key={sup.id}>{sup.name}</li>)
					) : (
						<li className="none">
							<em>None Assigned</em>
						</li>
					)}
				</ul>
			</div>
			<div>
				<p className="employee-count">Employees: {users.length}</p>
			</div>
		</Card>
	);
};

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #eee;
	color: #111;
	border-radius: 3px;
	box-shadow: 3px 5px 12px rgba(0, 0, 0, 0.4);
	padding: 12px;
	height: 100%;
	transition: 200ms all ease;

	h4 {
		margin: 0 0 0.5em;
	}

	h5 {
		font-size: 0.8em;
		margin: 0.5em 0 0.2em;
	}

	.supervisors {
		margin: 0;
		padding: 0;
		font-size: 0.8rem;
		list-style: none;

		.none {
			opacity: 0.6;
		}
	}

	.employee-count {
		font-size: 0.8em;
		margin: 1rem 0 0;
		padding-top: 5px;
		border-top: 1px solid #ddd;
	}

	&:hover {
		box-shadow: 5px 7px 15px rgba(0, 0, 0, 0.5);
		background-color: #fff;
		/* font-weight: bold; */
		/* text-transform: uppercase; */
		transform: scale(1.1);
	}
`;

export default DepartmentCard;
