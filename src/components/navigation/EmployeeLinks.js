import React from 'react';
import { Mutation } from 'react-apollo';
import { FaRegChartBar, FaRegFileAlt, FaHistory } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';

import NavLink from './SideNavLink';
import { LOGOUT } from '../../apollo/mutations/user';

const EmployeeLinks = () => {
	return (
		<ul>
			<li>
				<NavLink to="/">
					<FaRegChartBar />
					Dashboard
				</NavLink>
			</li>
			<li>
				<NavLink to="/history">
					<FaHistory />
					History
				</NavLink>
			</li>
			<li>
				<NavLink to="/timesheets">
					<FaRegFileAlt />
					Timesheets
				</NavLink>
			</li>
			<li>
				<Mutation mutation={LOGOUT}>
					{logout => (
						<NavLink
							to="/logout"
							onClick={async e => {
								e.preventDefault();
								try {
									await logout();
									window.location = '/';
								} catch (e) {
									console.log(e);
								}
							}}
						>
							<IoMdLogOut />
							Log out
						</NavLink>
					)}
				</Mutation>
			</li>
		</ul>
	);
};

export default EmployeeLinks;
