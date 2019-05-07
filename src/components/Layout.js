import React from 'react';
import styled from 'styled-components';

import Header from '../styled/layouts/Header';
import TopNav from './navigation/TopNav';
import AuthLinks from './navigation/AuthLinks';

const SIDEBAR_WIDTH = 250;

const Layout = ({ children }) => {
  return (
    <div>
      <Header logoWidth={SIDEBAR_WIDTH}>
        <TopNav />
        <AuthLinksWrapper>
          <AuthLinks />
        </AuthLinksWrapper>
      </Header>
      <main>{children}</main>
    </div>
  );
};

const AuthLinksWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default Layout;
