import React from 'react';
import { Router } from '@reach/router';
import Login from '../auth/Login';

const Routes = () => {
  return (
    <Router>
      <Login path="/login" default />
    </Router>
  );
};

export default Routes;
