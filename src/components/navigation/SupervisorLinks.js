import React from 'react';
import { Mutation } from 'react-apollo';
import { FaRegChartBar, FaRegFileAlt } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';

import NavLink from './SideNavLink';
import { LOGOUT } from '../../apollo/mutations/user';

const SuperVisorLinks = () => {
	return (
		<ul>
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

export default SuperVisorLinks;
