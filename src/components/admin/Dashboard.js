import React from 'react';

import Container from '../../styled/layouts/Container';
import Activity from './Activity';
import PrivateRoute from '../shared/PrivateRoute';

const Dashboard = () => {
  return (
    <Container>
      <Activity />
    </Container>
  );
};

export default () => <PrivateRoute component={Dashboard} />;
