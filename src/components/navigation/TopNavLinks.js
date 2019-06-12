import React from 'react';

import TopNavLink from './TopNavLink';

const TopNavLinks = ({ user = {} }) => (
	<>
		<TopNavLink to="/home">Home</TopNavLink>
		{user.supervisor && <TopNavLink to="/supervisor">Supervisor</TopNavLink>}
	</>
);

export default TopNavLinks;
