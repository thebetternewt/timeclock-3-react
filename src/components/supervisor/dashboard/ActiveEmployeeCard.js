import React from 'react';
import styled from 'styled-components';
import { format, differenceInMinutes } from 'date-fns';
import { CLOCK_OUT_USER } from '../../../apollo/mutations/user';
import { useMutation } from 'react-apollo-hooks';
import Button from '../../../styled/elements/Button';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { PRIMARY } from '../../../styled/utilities';

const ActiveEmployeeCard = ({ employee, loading }) => {
	const clockOutUser = useMutation(CLOCK_OUT_USER, {
		variables: { userId: employee.id },
		refetchQueries: () => ['UsersByDepartment'],
	});

	return (
		<Card>
			<h4>{employee.name}</h4>
			<p>Time in: {format(employee.lastShift.timeIn, 'hh:mm A')}</p>
			<p>
				Hours Elapsed:{' '}
				{(
					differenceInMinutes(new Date(), employee.lastShift.timeIn) / 60
				).toFixed(2)}
			</p>
			<div className="footer">
				<Button
					href={`/employees/${employee.id}`}
					color="primary"
					text="Details"
				/>
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
		margin: 0 0 0.8em;
	}

	p {
		margin: 0.3em 0;
		font-size: 0.8rem;
	}

	&:hover {
		box-shadow: 5px 7px 15px rgba(0, 0, 0, 0.5);
		background-color: #fff;
	}

	.footer {
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
