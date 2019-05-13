import React from 'react';
import { Router } from '@reach/router';
import Login from '../auth/Login';
import EmployeeDashboard from '../employee/Dashboard';
import AdminDashboard from '../admin/Dashboard';
import History from '../employee/history/History';

const Routes = () => {
  return (
    <Router>
      <Login path="/login" default />
      <EmployeeDashboard path="/" />
      <AdminDashboard path="/admin" />
      <History path="/history" />
    </Router>
  );
};

export default Routes;
