import React from 'react';
import { Router } from '@reach/router';
import Login from '../auth/Login';
import EmployeeDashboard from '../employee/Dashboard';
import AdminDashboard from '../admin/Dashboard';
import History from '../employee/history/History';
import Employees from '../admin/employees/Employees';
import Employee from '../admin/employees/Employee';
import CreateEmployee from '../admin/employees/Create';
import EditEmployee from '../admin/employees/Edit';
import AdminHistory from '../admin/history/History';
import Departments from '../admin/departments/Departments';

const Routes = () => {
  return (
    <Router>
      <Login path="/login" />
      <EmployeeDashboard path="/" />
      <History path="/history" />
      <AdminDashboard path="/admin" />
      <Employee path="/admin/employees/:employeeId" />
      <CreateEmployee path="/admin/employees/new" />
      <EditEmployee path="/admin/employees/:employeeId/edit" />
      <Employees path="/admin/employees" />
      <AdminHistory path="/admin/history" />
      <Departments path="/admin/departments" />
    </Router>
  );
};

export default Routes;
