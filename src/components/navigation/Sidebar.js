import React from 'react';
import styled from 'styled-components';
import { Match } from '@reach/router';
import { IoMdLogOut } from 'react-icons/io';

import { useQuery, useMutation } from 'react-apollo-hooks';
import { ME } from '../../apollo/queries/user';
import { LOGOUT } from '../../apollo/mutations/user';

import { fixed, GRAY4, GRAY5 } from '../../styled/utilities';
import EmployeeLinks from './EmployeeLinks';
import SupervisorLinks from './SupervisorLinks';
import NavLink from './SideNavLink';

const SidebarWrapper = ({ width }) => {
	const logout = useMutation(LOGOUT);

	const { data: meData } = useQuery(ME);
	const { me = {} } = meData;

	const elevated = me.supervisor || me.admin;
	console.log(elevated);

	const handleLogout = async e => {
		e.preventDefault();
		try {
			await logout();
			window.location = '/';
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Sidebar width={width}>
			<ul>
				<Match path="/home/*">
					{({ match }) => {
						if (match) {
							return <EmployeeLinks />;
						}

						return <SupervisorLinks admin={me.admin} />;
					}}
				</Match>
				<li>
					<NavLink to="/logout" onClick={handleLogout}>
						<IoMdLogOut />
						Log out
					</NavLink>
				</li>
			</ul>
		</Sidebar>
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
