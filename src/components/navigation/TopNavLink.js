import React from 'react';
import { Link, Location } from '@reach/router';

export default props => (
	<Location>
		{({ location }) => {
			return (
				<Link
					{...props}
					getProps={({ isPartiallyCurrent, href }) => {
						const admin = location.pathname.match('admin');
						const supervisor = location.pathname.match('supervisor');
						let isActive = isPartiallyCurrent;

						// Set isActive false if not in admin section.
						// ? This could possbly be inproved since a new check would have to be added for each
						// ? major section of the site.
						if (admin && !href.match('admin')) isActive = false;
						if (supervisor && !href.match('supervisor')) isActive = false;

						return {
							className: isActive ? 'active' : null,
						};
					}}
				/>
			);
		}}
	</Location>
);
