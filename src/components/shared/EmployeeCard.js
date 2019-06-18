import React from 'react';
import styled from 'styled-components';
import Button from '../../styled/elements/Button';

const EmployeeCard = ({
	employee,
	action,
	actionText,
	actionColor = 'danger',
	loading,
}) => {
	// console.log(employee);
	return (
		<Card>
			<h4>
				{employee.lastName}, {employee.firstName}
			</h4>
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
				{action && (
					<Button
						color={actionColor}
						text={actionText}
						loading={loading}
						onClick={async () => {
							try {
								await action();
							} catch (err) {
								console.log(err);
							}
						}}
					/>
				)}
			</div>
		</Card>
	);
};

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

	.card-title {
		margin: 0 0 0.8em;
	}

	.card-content {
		flex-grow: 1;

		h5 {
			margin: 0;
		}
	}

	p {
		margin: 0.3em 0;
		font-size: 0.8rem;
	}

	.card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 1rem 0 0;
		padding-top: 5px;
		border-top: 1px solid #ddd;

		a,
		button {
			font-size: 0.9em;
			padding: 5px;
			height: auto;
			width: auto;

			&:not(:last-child) {
				margin-right: 5px;
			}
		}
	}
`;

export default EmployeeCard;
