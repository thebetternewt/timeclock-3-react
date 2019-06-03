import React from 'react';
import { Location } from '@reach/router';

import TopNavLink from './TopNavLink';

const TopNavLinks = ({ user }) => {
	const admin = user ? user.admin : false;
	const supervisor = user ? !!user.supervisedDepartments.length : false;

	return (
		<Location>
			{() => (
				<>
					<TopNavLink to="/">Home</TopNavLink>
					{admin && <TopNavLink to="/admin">Admin</TopNavLink>}
					{supervisor && <TopNavLink to="/supervisor">Supervisor</TopNavLink>}
				</>
			)}
		</Location>
	);
};

export default TopNavLinks;
