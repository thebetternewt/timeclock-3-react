import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Box from '../../../styled/layouts/Box';
import Tag from '../../../styled/elements/Tag';
import { LIGHT_GRAY, GRAY4 } from '../../../styled/utilities/Colors';

const Shifts = ({ shifts }) => {
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
							<div>{moment(shift.timeIn).format('MMM DD LT')}</div>
							<div>
								{shift.timeOut
									? moment(shift.timeOut).format('MMM DD LT')
									: '--'}
							</div>
							<div style={{ display: 'flex' }}>
								{shift.timeOut ? hoursElapsed : '--'}
								{shift.workStudy && (
									<Tag color="info" style={{ margin: '0 auto' }}>
										WS
									</Tag>
								)}
							</div>
						</ShiftItem>
					);
				})}
			</ShiftList>
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
