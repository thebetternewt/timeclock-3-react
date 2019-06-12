import React from 'react';
import { FaRegChartBar, FaRegFileAlt, FaHistory } from 'react-icons/fa';

import NavLink from './SideNavLink';

const EmployeeLinks = () => {
	return (
		<>
			<li>
				<NavLink to="/home">
					<FaRegChartBar />
					Dashboard
				</NavLink>
			</li>
			<li>
				<NavLink to="/home/history">
					<FaHistory />
					History
				</NavLink>
			</li>
			<li>
				<NavLink to="/home/timesheets">
					<FaRegFileAlt />
					Timesheets
				</NavLink>
			</li>
		</>
	);
};

export default EmployeeLinks;
