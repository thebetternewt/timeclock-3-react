import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import { ME } from '../../apollo/queries/user';
import config from '../../config';

import Login from '../auth/Login';

import EmployeeDashboard from '../home/dashboard/Dashboard';
import EmployeeHistory from '../home/history/EmployeeHistory';
import TimeSheets from '../home/timeSheets/TimeSheets';

import Employees from '../employees/Employees';
import Employee from '../employees/Employee';
import CreateEmployee from '../employees/EditEmployee';
import EditEmployee from '../employees/EditEmployee';

import Departments from '../departments/Departments';
import Department from '../departments/Department';
import CreateDepartment from '../departments/EditDepartment';
import EditDepartment from '../departments/EditDepartment';

import SupervisorDashboard from '../supervisor/dashboard/SupervisorDashboard';
import DepartmentActivity from '../supervisor/dashboard/Activity';

import SupervisorTimeSheets from '../supervisor/timeSheets/TimeSheets';
import PayPeriods from '../supervisor/payPeriods/PayPeriods';
import Spinner from '../../styled/elements/Spinner';

const Routes = () => {
	const { data: meData, loading } = useQuery(ME);

	if (loading) {
		return <Spinner size="100px" />;
	}

	const { me } = meData;

	return (
		<Location>
			{({ location }) => {
				if (me && config.hideHomeForSupervisors) {
					if (me && (me.admin || me.supervisor)) {
						if (location.pathname.match(/home/)) {
							return <Redirect to="/supervisor" />;
						}
					}
				}

				if (me && !me.admin && !me.supervisor) {
					if (
						location.pathname.match(
							/supervisor|employees|departments|payperiods/
						)
					) {
						return <Redirect to="/home" />;
					}
				}

				return (
					<Router>
						<Login path="/" default />

						<EmployeeDashboard path="/home" />
						<EmployeeHistory path="/home/history" />
						<TimeSheets path="/home/timesheets" />

						<SupervisorDashboard path="/supervisor">
							<DepartmentActivity path=":departmentId" />
						</SupervisorDashboard>

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
