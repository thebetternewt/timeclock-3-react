import React from 'react';
import styled from 'styled-components';
import { Location } from '@reach/router';

import { fixed, GRAY4, GRAY5 } from '../../styled/utilities';
import EmployeeLinks from './EmployeeLinks';
import AdminLinks from './AdminLinks';
import SupervisorLinks from './SupervisorLinks';

const SidebarWrapper = ({ width }) => {
	return (
		<Location>
			{({ location: { pathname } }) => (
				<Sidebar width={width}>
					<Location>
						{({ location }) => {
							if (pathname.includes('admin')) {
								return <AdminLinks />;
							} else if (pathname.includes('supervisor')) {
								return <SupervisorLinks />;
							} else {
								return <EmployeeLinks />;
							}
						}}
					</Location>
				</Sidebar>
			)}
		</Location>
	);
};

const Sidebar = styled.nav`
	${fixed({ y: '60px' })}
	height: calc(100vh - 60px);
	width: ${({ width }) => `${width}px`};

	background-color: ${GRAY4};

	ul {
		list-style: none;
		width: 100%;
		padding: 0;
		margin: 30px 0 0;
	}

	li {
		display: block;
		width: 100%;
		height: 80px;

		a {
			display: block;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			padding-left: 40px;
			text-transform: uppercase;
			text-decoration: none;
			color: inherit;

			&.active {
				background-color: ${GRAY5};
			}

			svg {
				margin-right: 12px;
			}
		}
	}
`;

export default SidebarWrapper;
