import React, { useState } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { FaUserCircle, FaUserNinja, FaCircle } from 'react-icons/fa';

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
											{me.admin ? (
												<div
													style={{
														border: '2px solid red',
														display: 'flex',
														borderRadius: '50%',
														width: 30,
														height: 30,
														marginLeft: '.5rem',
														alignItems: 'center',
														justifyContent: 'center',
													}}
												>
													<FaUserNinja size="15" color="red" />
												</div>
											) : (
												<FaUserCircle
													size="30"
													style={{ marginLeft: '.5rem' }}
												/>
											)}
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
		/* margin-left: 0.7rem; */
	}
`;

const MainContent = styled.main`
	margin-left: ${({ withSidebar }) => (withSidebar ? `${SIDEBAR_WIDTH}px` : 0)};
	padding: 2rem;
`;

export default Layout;
