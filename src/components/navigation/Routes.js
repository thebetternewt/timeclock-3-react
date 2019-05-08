import React from 'react';
import { Router } from '@reach/router';
import Login from '../auth/Login';
import Dashboard from '../employee/Dashboard';

const Routes = () => {
  return (
    <Router>
      <Dashboard path="/" default />
      <Login path="/login" />
    </Router>
  );
};

export default Routes;
