import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import searchContext from './searchContext';
import Box from '../../../styled/layouts/Box';
import { LIGHT_GRAY, GRAY4 } from '../../../styled/utilities/Colors';
import Tag from '../../../styled/elements/Tag';
import Button from '../../../styled/elements/Button';
import ShiftModal from '../../shared/ShiftModal';

const Shifts = () => {
  const [selectedShift, setSelectedShift] = useState();
  const [showShiftModal, setShowShiftModal] = useState(false);
  const { filteredShifts } = useContext(searchContext);

  console.log('shifts:', filteredShifts);

  const toggleShiftModal = () => setShowShiftModal(!showShiftModal);

  return (
    <ShiftsTable>
      <ShiftList>
        <ShiftListHeader>
          <div>Time in</div>
          <div>Time out</div>
          <div>Hours Elapsed</div>
        </ShiftListHeader>
        {filteredShifts.map(shift => {
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
                  <Tag color="primary" style={{ marginLeft: 5 }}>
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
  margin-top: 3rem;
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
