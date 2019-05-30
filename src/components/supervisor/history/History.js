import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';

import SearchContext from './searchContext';
import Box from '../../../styled/layouts/Box';
import Container from '../../../styled/layouts/Container';
import PrivateRoute from '../../shared/PrivateRoute';
import SearchForm from './SearchForm';
import Shifts from './Shifts';
import { GRAY3 } from '../../../styled/utilities/Colors';
import { USER_SHIFTS } from '../../../apollo/queries/user';
import { client } from '../../../apollo/client';

const History = () => {
	const [employee, setEmployee] = useState('');
	const [shifts, setShifts] = useState([]);
	const [payPeriods, setPayPeriods] = useState([]);
	const [payPeriod, setPayPeriod] = useState();
	const [departments, setDepartments] = useState([]);
	const [department, setDepartment] = useState();

	const hoursElapsed = shifts
		.reduce((total, shift) => total + shift.minutesElapsed / 60, 0)
		.toFixed(2);

	const onShiftsFetched = newShifts => {
		setShifts(newShifts);

		const newDepts = newShifts.reduce((acc, shift) => {
			const dept = shift.department;
			if (!acc.find(d => d.id === dept.id)) {
				acc.push(dept);
			}
			return acc;
		}, []);

		setDepartments(newDepts);
		setDepartment(newDepts[0]);
	};

	const fetchShifts = async ({ payPeriod: period = payPeriod }) => {
		const { data } = await client.query({
			query: USER_SHIFTS,
			variables: {
				userId: employee,
				deptId: department && department.id,
				startDate: moment(period.startDate)
					.startOf('Day')
					.toISOString(),
				endDate: moment(period.endDate)
					.endOf('Day')
					.toISOString(),
			},
			fetchPolicy: 'no-cache',
		});

		onShiftsFetched(data.shifts);
	};

	let filteredShifts = [];

	if (department) {
		filteredShifts = shifts.filter(
			shift => shift.department.id === department.id
		);
	}

	return (
		<SearchContext.Provider
			value={{
				employee,
				setEmployee,
				payPeriods,
				setPayPeriods,
				shifts,
				payPeriod,
				departments,
				setDepartments,
				department,
				setShifts,
				setPayPeriod,
				setDepartment,
				fetchShifts,
				filteredShifts,
			}}
		>
			<Container>
				<Search>
					<div className="title">History</div>
					<SearchForm />
				</Search>
				<Summary>
					<h2 className="title">Summary</h2>
					{shifts.length ? (
						<>
							<div className="date">
								{moment(payPeriod.startDate).format('MMM D')} -{' '}
								{moment(payPeriod.endDate).format('MMM D')}
							</div>
							<div className="total-time">{hoursElapsed} hours</div>
							<div className="department">
								{department ? department.name : 'No Department Selected'}
							</div>
						</>
					) : (
						<Box className="no-selection">
							<FaArrowLeft /> Search for results using the form
						</Box>
					)}
				</Summary>
			</Container>
			<Container>
				<Shifts />
			</Container>
		</SearchContext.Provider>
	);
};

const Search = styled.div`
	flex-basis: 50%;
	display: flex;
	flex-direction: column;
	padding-right: 2rem;

	.title {
		text-transform: uppercase;
		opacity: 0.6;
		margin-bottom: 0.3em;
	}
	button {
		margin-top: 1rem;
	}
`;

const Summary = styled(Box)`
	flex-basis: 50%;
	display: flex;
	flex-direction: column;

	.no-selection {
		width: 100%;
		height: 60px;
		background-color: ${GRAY3};
		display: flex;
		justify-self: center;
		align-items: center;
		justify-content: center;
		margin: 1rem auto 0;

		svg {
			margin-right: 1rem;

			animation-duration: 1s;
			animation-iteration-count: infinite;
			animation-name: slide;
			animation-timing-function: linear;

			@keyframes slide {
				0% {
					transform: translateX(0);
				}
				50% {
					transform: translateX(-5px);
				}
				100% {
					transform: translateX(0);
				}
			}
		}
	}

	.title {
		text-transform: uppercase;
		opacity: 0.6;
		margin-bottom: 0.3em;
		font-weight: 400;
		font-size: 1rem;
		margin: 0;
	}

	.date {
		font-size: 1.5rem;
	}

	.total-time {
		font-size: 4rem;
		font-weight: 600;
		margin: 0.7rem 0 0;
	}

	.department {
		opacity: 0.7;
		font-size: 1.2em;
	}
`;

export default () => <PrivateRoute component={History} />;
