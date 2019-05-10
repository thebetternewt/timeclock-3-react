import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';

import Box from '../../../styled/layouts/Box';
import Container from '../../../styled/layouts/Container';
import PrivateRoute from '../../shared/PrivateRoute';
import SearchForm from './SearchForm';
import Shifts from './Shifts';
import { GRAY3 } from '../../../styled/utilities/Colors';

const History = () => {
  const [searching, setSearching] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [payPeriod, setPayPeriod] = useState();
  const [department, setDepartment] = useState();

  const toggleSearching = () => setSearching(!searching);

  const hoursElapsed = shifts
    .reduce((total, shift) => total + shift.minutesElapsed / 60, 0)
    .toFixed(2);

  console.log('hoursElapsed:', hoursElapsed);

  return (
    <>
      <Container>
        <Search>
          <div className="title">History</div>
          <SearchForm
            setShiftsInHistory={setShifts}
            setPayPeriodInHistory={setPayPeriod}
            setDepartmentInHistory={setDepartment}
          />
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
        <Shifts shifts={shifts} />
      </Container>
    </>
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
