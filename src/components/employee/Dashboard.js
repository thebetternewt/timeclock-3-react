import React from 'react';
import styled from 'styled-components';

import Box from '../../styled/layouts/Box';
import Layout from '../Layout';
import Timer from './Timer';

const Dashboard = () => {
  return (
    <Content>
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
      <Timer>
        <form />
      </Timer>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
`;

const Stats = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;

  .title {
    text-transform: uppercase;
    opacity: 0.6;
    margin-bottom; 0.3em;
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

export default Dashboard;
