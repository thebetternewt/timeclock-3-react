import React from 'react';
import { Location } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';

import TopNavLink from './TopNavLink';
import { ME } from '../../apollo/queries/user';

const TopNavLinks = () => {
	let admin = false;
	let supervisor = false;

	const { data } = useQuery(ME);

	if (data.me) {
		admin = data.me.admin;
		supervisor = !!data.me.supervisedDepartments.length;
	}

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
