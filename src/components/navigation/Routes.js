import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import { ME } from '../../apollo/queries/user';

import Login from '../auth/Login';
import Employees from '../employees/Employees';

import EmployeeDashboard from '../employee/dashboard/Dashboard';
import EmployeeHistory from '../employee/history/EmployeeHistory';
import TimeSheets from '../employee/timeSheets/TimeSheets';

import CreateEmployee from '../shared/employees/Create';
import EditEmployee from '../shared/employees/Edit';
// import SupervisorCreateEmployee from '../shared/employees/Create';
// import SupervisorEditEmployee from '../shared/employees/Edit';

// import AdminDashboard from '../admin/dashboard/Dashboard';
import Employee from '../employees/Employee';
import Departments from '../admin/departments/Departments';
import Department from '../shared/departments/Department';
import CreateDepartment from '../admin/departments/Create';
import EditDepartment from '../admin/departments/Edit';
// import AdminTimeSheets from '../admin/timeSheets/TimeSheets';

import SupervisorDashboard from '../supervisor/dashboard/Dashboard';
// import SupervisorEmployee from '../shared/employees/Employee';
// import SupervisorDepartments from '../supervisor/departments/Departments';
// import SupervisorDepartment from '../shared/departments/Department';
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
						<Login path="/login" />

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
