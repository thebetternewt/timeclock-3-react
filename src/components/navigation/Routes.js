import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import { ME } from '../../apollo/queries/user';

import Login from '../auth/Login';
import Employees from '../employees/Employees';

import EmployeeDashboard from '../employee/dashboard/Dashboard';
import EmployeeHistory from '../employee/history/EmployeeHistory';
import TimeSheets from '../employee/timeSheets/TimeSheets';

import CreateEmployee from '../employees/EditUser';
import EditEmployee from '../employees/EditUser';
import Employee from '../employees/Employee';
import Departments from '../departments/Departments';
import Department from '../shared/departments/Department';
import CreateDepartment from '../departments/Create';
import EditDepartment from '../departments/Edit';

import SupervisorDashboard from '../supervisor/dashboard/Dashboard';
import SupervisorTimeSheets from '../supervisor/timeSheets/TimeSheets';
import PayPeriods from '../supervisor/payPeriods/PayPeriods';

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
						<Login path="/" default />

						<EmployeeDashboard path="/home" />
						<EmployeeHistory path="/home/history" />
						<TimeSheets path="/home/timesheets" />

						<SupervisorDashboard path="/supervisor" />
						<SupervisorTimeSheets path="/supervisor/timesheets" />

						<Employee path="/employees/:employeeId" />
						<Employees path="/employees" />
						<EditEmployee path="/employees/:employeeId/edit" />
						<CreateEmployee path="/employees/new" />

						<Departments path="/departments" />
						<Department path="/departments/:departmentId" />
						<EditDepartment path="/departments/:departmentId/edit" />
						<CreateDepartment path="/departments/new" />

						<PayPeriods path="/payperiods" />
					</Router>
				);
			}}
		</Location>
	);
};

export default Routes;
