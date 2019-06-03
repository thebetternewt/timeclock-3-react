import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import { ME } from '../../apollo/queries/user';

import Login from '../auth/Login';

import EmployeeDashboard from '../employee/dashboard/Dashboard';
import History from '../employee/history/History';
import TimeSheets from '../employee/timeSheets/TimeSheets';

import CreateEmployee from '../shared/employees/Create';
import EditEmployee from '../shared/employees/Edit';
import SupervisorCreateEmployee from '../shared/employees/Create';
import SupervisorEditEmployee from '../shared/employees/Edit';

import AdminDashboard from '../admin/dashboard/Dashboard';
import Employees from '../admin/employees/Employees';
import Employee from '../shared/employees/Employee';
import AdminHistory from '../admin/history/History';
import Departments from '../admin/departments/Departments';
import Department from '../shared/departments/Department';
import CreateDepartment from '../admin/departments/Create';
import EditDepartment from '../admin/departments/Edit';
import AdminTimeSheets from '../admin/timeSheets/TimeSheets';

import SupervisorDashboard from '../supervisor/dashboard/Dashboard';
// import SupervisorEmployees from '../supervisor/employees/Employees';
import SupervisorEmployee from '../shared/employees/Employee';
import SupervisorDepartments from '../supervisor/departments/Departments';
import SupervisorDepartment from '../shared/departments/Department';
import SupervisorHistory from '../supervisor/history/History';
import SupervisorTimeSheets from '../supervisor/timeSheets/TimeSheets';

const Routes = () => {
	const { data: meData } = useQuery(ME);

	const { me } = meData;

	return (
		<Location>
			{({ location }) => {
				if (me && !me.admin) {
					if (location.pathname.match('admin')) {
						return <Redirect to="/" noThrow />;
					}
				}

				if (me && !me.supervisor) {
					if (location.pathname.match('supervisor')) {
						return <Redirect to="/" noThrow />;
					}
				}

				if (me && !me.admin && !me.supervisor) {
					if (location.pathname.match('employees')) {
						return <Redirect to="/" noThrow />;
					}
				}

				return (
					<Router>
						<Login path="/login" />

						<EmployeeDashboard path="/" />
						<History path="/history" />
						<TimeSheets path="/timesheets" />
						<Employee path="/admin/employees/:employeeId" />
						<CreateEmployee path="/admin/employees/new" />

						<EditEmployee path="/admin/employees/:employeeId/edit" />
						<AdminDashboard path="/admin" />
						<Employees path="/admin/employees" />
						<AdminHistory path="/admin/history" />
						<AdminTimeSheets path="/admin/timesheets" />
						<Departments path="/admin/departments" />
						<Department path="/admin/departments/:departmentId" />
						<EditDepartment path="/admin/departments/:departmentId/edit" />
						<CreateDepartment path="/admin/departments/new" />

						<SupervisorDashboard path="/supervisor" />
						{/* <SupervisorEmployees path="/supervisor/employees" /> */}
						<SupervisorEmployee path="/supervisor/employees/:employeeId" />
						<SupervisorCreateEmployee path="/supervisor/employees/new" />
						<SupervisorEditEmployee path="/supervisor/employees/:employeeId/edit" />
						<SupervisorDepartments path="/supervisor/departments" />
						<SupervisorDepartment path="/supervisor/departments/:departmentId" />
						<SupervisorHistory path="/supervisor/history" />
						<SupervisorTimeSheets path="/supervisor/timesheets" />
					</Router>
				);
			}}
		</Location>
	);
};

export default Routes;
