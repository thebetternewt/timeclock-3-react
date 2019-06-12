import React from 'react';
import { Link, Location } from '@reach/router';

export default props => (
	<Location>
		{({ location }) => {
			return (
				<Link
					{...props}
					getProps={({ href }) => {
						const homePath = location.pathname.match(/home|login/);
						let isActive = false;

						// Set isActive false if not in admin section.
						// ? This could possbly be inproved since a new check would have to be added for each
						// ? major section of the site.

						// Home paths
						if (homePath && !href.match('supervisor')) isActive = true;

						// Supervisor paths
						if (!homePath && href.match('supervisor')) isActive = true;

						return {
							className: isActive ? 'active' : null,
						};
					}}
				/>
			);
		}}
	</Location>
);
