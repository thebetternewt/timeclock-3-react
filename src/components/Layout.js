import React, { useState } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';

import Header from '../styled/layouts/Header';
import TopNav from './navigation/TopNav';
import AuthLinks from './navigation/AuthLinks';
import { Query } from 'react-apollo';
import { ME } from '../apollo/queries/user';
import Sidebar from './navigation/Sidebar';

const SIDEBAR_WIDTH = 250;

const Layout = ({ children }) => {
	const [showSidebar, toggleSidebar] = useState(false);

	return (
		<Query query={ME}>
			{({ data }) => {
				let me;

				if (data && data.me) {
					me = data.me;
					toggleSidebar(true);
				}

				return (
					<div>
						<Header logoWidth={SIDEBAR_WIDTH}>
							<TopNav user={me} />
							<AuthLinksWrapper>
								{me && (
									<Link to="/">
										<Avatar>
											<span>{me.name}</span>
											<FaUserCircle size="30" />
										</Avatar>
									</Link>
								)}
								<AuthLinks isAuth={!!me} />
							</AuthLinksWrapper>
						</Header>
						{showSidebar && <Sidebar width={SIDEBAR_WIDTH} />}
						<MainContent withSidebar={showSidebar}>{children}</MainContent>
					</div>
				);
			}}
		</Query>
	);
};

const AuthLinksWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const Avatar = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 1rem;

	svg {
		margin-left: 0.7rem;
	}
`;

const MainContent = styled.main`
	margin-left: ${({ withSidebar }) => (withSidebar ? `${SIDEBAR_WIDTH}px` : 0)};
	padding: 2rem;
`;

export default Layout;
