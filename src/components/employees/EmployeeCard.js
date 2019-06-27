import React from 'react';
import styled from 'styled-components';
import Button from '../../styled/elements/Button';

const EmployeeCard = ({ employee }) => (
	<Card>
		<h4>{employee.name}</h4>
		<p className="netId">{employee.netId}</p>
		<p className="studentId">
			Student ID: {employee.nineDigitId.slice(0, 3)}-
			{employee.nineDigitId.slice(3, 6)}-{employee.nineDigitId.slice(6, 9)}
		</p>
		<p className="phone"> Phone: {employee.phone} </p>
		<div className="card-footer">
			<Button
				href={`/employees/${employee.id}`}
				color="primary"
				text="Details"
			/>
		</div>
	</Card>
);

const Card = styled.div`
	background-color: #eee;
	color: #111;
	border-radius: 3px;
	box-shadow: 3px 5px 12px rgba(0, 0, 0, 0.4);
	padding: 12px;
	height: 100%;
	transition: 200ms all ease;

	h4 {
		margin: 0 0 0.2em;
	}

	.netId,
	.studentId,
	.phone {
		margin: 0;
		font-size: 0.8rem;
	}

	&:hover {
		box-shadow: 5px 7px 15px rgba(0, 0, 0, 0.5);
		background-color: #fff;
		/* font-weight: bold; */
		/* text-transform: uppercase; */
		transform: scale(1.1);
	}
`;

export default EmployeeCard;
