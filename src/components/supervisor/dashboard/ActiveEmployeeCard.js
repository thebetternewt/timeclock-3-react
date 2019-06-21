import React from 'react';
import styled from 'styled-components';
import { format, differenceInMinutes } from 'date-fns';
import { CLOCK_OUT_USER } from '../../../apollo/mutations/user';
import { useMutation } from 'react-apollo-hooks';
import Button from '../../../styled/elements/Button';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { PRIMARY } from '../../../styled/utilities';

const ActiveEmployeeCard = ({ employee, loading, clockedIn }) => {
	const clockOutUser = useMutation(CLOCK_OUT_USER, {
		variables: { userId: employee.id },
		refetchQueries: () => ['UsersByDepartment'],
	});

	console.log('emp:', employee);

	const { lastShift } = employee;

	let cardContent;

	if (clockedIn) {
		cardContent = (
			<div className="card-content">
				<p>Time in: {format(lastShift.timeIn, 'h:mm A')}</p>
				<p>
					Hours Elapsed:{' '}
					{(differenceInMinutes(new Date(), lastShift.timeIn) / 60).toFixed(2)}
				</p>
			</div>
		);
	} else if (!clockedIn && lastShift) {
		cardContent = (
			<div className="card-content">
				<h5>Last Shift</h5>
				<p>{lastShift.department.name}</p>
				<p>
					{format(lastShift.timeIn, 'h:mm A')} -{' '}
					{format(lastShift.timeOut, 'h:mm A')}
				</p>
				<p>
					{(
						differenceInMinutes(lastShift.timeOut, lastShift.timeIn) / 60
					).toFixed(2)}{' '}
					hours
				</p>
			</div>
		);
	} else {
		cardContent = (
			<div className="card-content">
				<p>
					<em>No shifts available</em>
				</p>
			</div>
		);
	}

	return (
		<Card clockedIn={clockedIn}>
			<h4 className="card-title">
				{employee.lastName}, {employee.firstName}
			</h4>
			{cardContent}
			<div className="card-footer">
				<Button
					href={`/employees/${employee.id}`}
					color="primary"
					text="Details"
				/>
				{clockedIn && (
					<Button
						color="danger"
						text="Clock Out"
						loading={loading}
						onClick={async () => {
							try {
								await clockOutUser();
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
	display: flex;
	flex-direction: column;
	background-color: #eee;
	color: #111;
	border-radius: 3px;
	box-shadow: 3px 5px 12px rgba(0, 0, 0, 0.4);
	padding: 12px;
	height: 100%;
	transition: 200ms all ease;

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

export default ActiveEmployeeCard;
