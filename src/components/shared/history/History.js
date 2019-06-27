import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { FaArrowLeft } from 'react-icons/fa';
import SearchContext from './searchContext';
import { format } from 'date-fns';

import Box from '../../../styled/layouts/Box';
import Container from '../../../styled/layouts/Container';
import SearchForm from './SearchForm';
import Shifts from './Shifts';
import Spinner from '../../../styled/elements/Spinner';
import { GRAY3 } from '../../../styled/utilities/Colors';
import { ME } from '../../../apollo/queries/user';

const History = ({ employee }) => {
	const [year, setYear] = useState(new Date().getFullYear());
	const [shifts, setShifts] = useState([]);
	const [payPeriod, setPayPeriod] = useState();
	const [payPeriods, setPayPeriods] = useState([]);
	const [department, setDepartment] = useState();
	const [showShifts, setShowShifts] = useState(false);

	let departments = [];

	const { data: meData } = useQuery(ME);
	const { me } = meData;

	if (!me && !employee) return <Spinner size="60px" />;
	const user = employee || me;

	departments = user.departments;

	if (!department && departments.length) {
		setDepartment(departments[0]);
	}

	const hoursElapsed = shifts
		.reduce((total, shift) => total + shift.minutesElapsed / 60, 0)
		.toFixed(2);

	return (
		<SearchContext.Provider
			value={{
				employee: user,
				year,
				setYear,
				payPeriods,
				setPayPeriods,
				shifts,
				payPeriod,
				departments,
				department,
				setShifts,
				setPayPeriod,
				setDepartment,
				fetchShifts: null,
				showShifts,
				setShowShifts,
			}}
		>
			<Container>
				<Search>
					<SearchForm />
				</Search>
				<Summary>
					<h2 className="title">Summary</h2>
					{shifts.length ? (
						<>
							<div className="date">
								{format(payPeriod.startDate, 'MMM D')} -{' '}
								{format(payPeriod.endDate, 'MMM D')}
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

			{showShifts && (
				<Container>
					<Shifts />
				</Container>
			)}
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

export default History;
