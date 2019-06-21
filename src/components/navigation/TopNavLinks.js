import React from 'react';

import TopNavLink from './TopNavLink';
import config from '../../config';

const TopNavLinks = ({ user = {} }) => {
	let hideHome = false;
	const hasElevatedPermissions = user.supervisor || user.admin;

	if (config.hideHomeForSupervisors && hasElevatedPermissions) {
		hideHome = true;
	}

	return (
		<>
			{!hideHome && <TopNavLink to="/home">Home</TopNavLink>}
			{hasElevatedPermissions && (
				<TopNavLink to="/supervisor">Supervisor</TopNavLink>
			)}
		</>
	);
};

export default TopNavLinks;
