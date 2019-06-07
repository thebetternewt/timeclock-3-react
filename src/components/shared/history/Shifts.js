import React, { useState, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { parse, format, startOfDay, endOfDay } from 'date-fns';
import styled from 'styled-components';
import { FaMoon, FaGraduationCap, FaPencilAlt } from 'react-icons/fa';

import Box from '../../../styled/layouts/Box';
import Button from '../../../styled/elements/Button';
import ShiftModal from '../../shared/ShiftModal';
import { LIGHT_GRAY, GRAY4 } from '../../../styled/utilities/Colors';
import { USER_SHIFTS } from '../../../apollo/queries/user';

import SearchContext from './searchContext';
import { Location } from '@reach/router';
import { Item } from '../../../styled/elements/List';

const Shifts = () => {
	const [selectedShift, setSelectedShift] = useState();
	const [showShiftModal, setShowShiftModal] = useState(false);

	const context = useContext(SearchContext);

	const { data: shiftData } = useQuery(USER_SHIFTS, {
		variables: {
			userId: context.employee.id,
			deptId: context.department.id,
			startDate: startOfDay(parse(context.payPeriod.startDate)),
			endDate: endOfDay(parse(context.payPeriod.endDate)),
		},
	});

	const { shifts = [] } = shiftData;

	console.log('shifts:', shifts);

	if (shifts.length) {
		context.setShifts(shifts);
	}

	const toggleShiftModal = () => setShowShiftModal(!showShiftModal);

	return (
		<Location>
			{({ location: { pathname } }) => (
				<ShiftsTable>
					<ShiftList>
						{shifts
							.filter(shift => shift.timeOut)
							.map(shift => {
								const hoursElapsed = (shift.minutesElapsed / 60).toFixed(2);
								return (
									<ShiftItem key={shift.id}>
										<div className="timestamp">
											<div className="day">
												{format(shift.timeIn, 'MMM DD')}
											</div>
											<div className="time">
												{format(shift.timeIn, 'h:mm a')} -{' '}
												{format(shift.timeOut, 'h:mm a')}
											</div>
										</div>
										<div className="total-time">{hoursElapsed} hours</div>
										<div className="badges">
											{shift.workStudy && (
												<Badge color="#660000">
													<FaGraduationCap />
												</Badge>
											)}
											{shift.nightShiftMinutes > 0 && (
												<Badge color="indigo">
													<FaMoon />
												</Badge>
											)}
										</div>
										{pathname !== '/history' && (
											<div className="actions">
												<Button
													text={() => <FaPencilAlt />}
													naked
													onClick={() => {
														setSelectedShift(shift);
														toggleShiftModal();
													}}
													alt="edit"
												/>
											</div>
										)}
									</ShiftItem>
								);
							})}
					</ShiftList>
					{showShiftModal && (
						<ShiftModal shift={selectedShift} close={toggleShiftModal} />
					)}
				</ShiftsTable>
			)}
		</Location>
	);
};

const ShiftsTable = styled(Box)`
	width: 100%;
	margin: 3rem 0;
`;

const ShiftList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const ShiftListHeader = styled.div`
	display: flex;
	justify-content: space-between;

	padding: 8px 15px;
	border-bottom: 3px solid ${GRAY4};
	margin-bottom: 0.8rem;

	> div {
		flex-basis: 30%;
	}
`;

const ShiftItem = styled(Item)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	background-color: ${LIGHT_GRAY};
	color: #000;

	margin: 5px 0;
	padding: 8px 15px;
	border-radius: 3px;

	.timestamp {
		flex-basis: 160px;
	}

	.day {
		font-weight: 500,
		color: #333;
	}

	.time {
		color: #555;
		font-size: 0.8em;
	}

	.total-time {
		margin-left: 1.3rem;
	}

	.badges {
		margin-left: 3rem;
		display: flex;
	}

	.actions {
		margin-left: auto;
	}
`;

const Badge = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	border-radius: 100%;
	color: #fff;
	background-color: ${({ color }) => color || '#ccc'};
	text-transform: uppercase;
	margin-right: 10px;
`;

export default Shifts;
