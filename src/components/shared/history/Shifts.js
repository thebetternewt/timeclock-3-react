import React, { useState, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { parse, format, startOfDay, endOfDay } from 'date-fns';
import styled from 'styled-components';

import Box from '../../../styled/layouts/Box';
import Tag from '../../../styled/elements/Tag';
import Button from '../../../styled/elements/Button';
import ShiftModal from '../../shared/ShiftModal';
import { LIGHT_GRAY, GRAY4 } from '../../../styled/utilities/Colors';
import { USER_SHIFTS } from '../../../apollo/queries/user';

import SearchContext from './searchContext';

const Shifts = () => {
	const [selectedShift, setSelectedShift] = useState();
	const [showShiftModal, setShowShiftModal] = useState(false);

	const context = useContext(SearchContext);

	let shifts = [];

	const { data: shiftData } = useQuery(USER_SHIFTS, {
		variables: {
			userId: context.employee.id,
			deptId: context.department.id,
			startDate: startOfDay(parse(context.payPeriod.startDate)),
			endDate: endOfDay(parse(context.payPeriod.endDate)),
		},
	});

	if (shiftData.shifts) {
		shifts = shiftData.shifts;
		context.setShifts(shiftData.shifts);
	}

	const toggleShiftModal = () => setShowShiftModal(!showShiftModal);

	return (
		<ShiftsTable>
			<ShiftList>
				<ShiftListHeader>
					<div>Time in</div>
					<div>Time out</div>
					<div>Hours Elapsed</div>
				</ShiftListHeader>
				{shifts.map(shift => {
					const hoursElapsed = (shift.minutesElapsed / 60).toFixed(2);
					return (
						<ShiftItem key={shift.id}>
							<div>{format(shift.timeIn, 'MMM DD, h:mm a')}</div>
							<div>
								{shift.timeOut ? format(shift.timeOut, 'MMM DD, h:mm a') : '--'}
							</div>
							<div style={{ display: 'flex' }}>
								{shift.timeOut ? hoursElapsed : '--'}
								{shift.workStudy && (
									<Tag color="info" style={{ margin: '0 auto' }}>
										WS
									</Tag>
								)}
							</div>
							<div>
								<Button
									text="view"
									color="primary"
									onClick={() => {
										setSelectedShift(shift);
										toggleShiftModal();
									}}
								/>
							</div>
						</ShiftItem>
					);
				})}
			</ShiftList>
			{showShiftModal && (
				<ShiftModal shift={selectedShift} close={toggleShiftModal} />
			)}
		</ShiftsTable>
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

const ShiftItem = styled.li`
	display: flex;
	justify-content: space-between;
	background-color: ${LIGHT_GRAY};
	color: #000;

	margin: 5px 0;
	padding: 8px 15px;
	border-radius: 3px;

	> div {
		flex-basis: 30%;
	}
`;

export default Shifts;
