import React, { useState } from 'react';
import styled from 'styled-components';

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
        let isAuth = false;

        if (data && data.me) {
          isAuth = true;
          toggleSidebar(true);
        }

        return (
          <div>
            <Header logoWidth={SIDEBAR_WIDTH}>
              <TopNav />
              <AuthLinksWrapper>
                <AuthLinks isAuth={isAuth} />
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

const MainContent = styled.main`
  margin-left: ${({ withSidebar }) => (withSidebar ? `${SIDEBAR_WIDTH}px` : 0)};
  padding: 2rem;
`;

export default Layout;
