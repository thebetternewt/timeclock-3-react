import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
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
import { Query } from 'react-apollo';
import { ME } from '../../apollo/queries/user';
import Department from '../admin/departments/Department';
import CreateDepartment from '../admin/departments/Create';
import EditDepartment from '../admin/departments/Edit';
import TimeSheets from '../employee/timeSheets/TimeSheets';
import AdminTimeSheets from '../admin/timeSheets/TimeSheets';

const Routes = () => {
  return (
    <>
      <Query query={ME}>
        {({ data }) => (
          <Location>
            {({ location }) => {
              if (data && data.me && !data.me.admin) {
                if (location.pathname.match('admin')) {
                  return <Redirect to="/" noThrow />;
                }
              }

              return (
                <Router>
                  <Login path="/login" />
                  <EmployeeDashboard path="/" />
                  <History path="/history" />
                  <AdminDashboard path="/admin" />
                  <TimeSheets path="/timesheets" />
                  <Employee path="/admin/employees/:employeeId" />
                  <CreateEmployee path="/admin/employees/new" />
                  <EditEmployee path="/admin/employees/:employeeId/edit" />
                  <Employees path="/admin/employees" />
                  <AdminHistory path="/admin/history" />
                  <AdminTimeSheets path="/admin/timesheets" />
                  <Departments path="/admin/departments" />
                  <Department path="/admin/departments/:departmentId" />
                  <EditDepartment path="/admin/departments/:departmentId/edit" />
                  <CreateDepartment path="/admin/departments/new" />
                </Router>
              );
            }}
          </Location>
        )}
      </Query>
    </>
  );
};

export default Routes;
