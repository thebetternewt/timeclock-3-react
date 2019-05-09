import React from 'react';
import styled from 'styled-components';

import Container from '../../styled/layouts/Container';
import ShiftClock from './ShiftClock';
import PrivateRoute from '../shared/PrivateRoute';

const Dashboard = () => {
  // TODO: Wire up to db (myShifts query)
  return (
    <Container>
      <Stats>
        <div className="title">Current Pay Period</div>
        <div className="date">May 5 - May 17</div>
        <div className="total">36.8 hours</div>
        <div className="departments">
          <ul>
            <li>Digital Initiatives: 14.6 hours</li>
            <li>Systems: 12.2 hours</li>
          </ul>
        </div>
      </Stats>
      <ShiftClock>
        <form />
      </ShiftClock>
    </Container>
  );
};

const Stats = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;

  .title {
    text-transform: uppercase;
    opacity: 0.6;
  }

  .date {
    font-size: 1.5rem;
  }

  .total {
    font-size: 4rem;
    font-weight: 600;
    margin: 1rem 0 0;
  }

  .departments {
    opacity: 0.7;
    font-size: 1.2em;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
`;

export default () => <PrivateRoute component={Dashboard} />;
