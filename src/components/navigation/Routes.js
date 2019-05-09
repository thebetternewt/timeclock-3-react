import React from 'react';
import { Router } from '@reach/router';
import Login from '../auth/Login';
import Dashboard from '../employee/Dashboard';
import History from '../employee/History';

const Routes = () => {
  return (
    <Router>
      <Login path="/login" default />
      <Dashboard path="/" />
      <History path="/history" />
    </Router>
  );
};

export default Routes;
