import React from 'react';
import {
	FaRegChartBar,
	FaRegFileAlt,
	FaUsers,
	FaRegBuilding,
	FaRegCalendarAlt,
} from 'react-icons/fa';

import NavLink from './SideNavLink';

const AdminLinks = () => (
	<>
		<li>
			<NavLink to="/departments">
				<FaRegBuilding />
				Departments
			</NavLink>
		</li>
		<li>
			<NavLink to="/employees">
				<FaUsers />
				Employees
			</NavLink>
		</li>
		<li>
			<NavLink to="/payperiods">
				<FaRegCalendarAlt />
				Pay Periods
			</NavLink>
		</li>
	</>
);

const SupervisorLinks = ({ admin = false }) => {
	return (
		<>
			<li>
				<NavLink to="/supervisor">
					<FaRegChartBar />
					Dashboard
				</NavLink>
			</li>
			<li>
				<NavLink to="/supervisor/timesheets">
					<FaRegFileAlt />
					Timesheets
				</NavLink>
			</li>
			{/* <li>
				<NavLink to="/budgets">
					<FaDollarSign />
					Budgets
				</NavLink>
			</li> */}
			{admin && <AdminLinks />}
		</>
	);
};

export default SupervisorLinks;
