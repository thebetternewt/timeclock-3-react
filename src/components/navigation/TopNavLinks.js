import React from 'react';
import { Location } from '@reach/router';

import TopNavLink from './TopNavLink';

const TopNavLinks = () => {
  return (
    <Location>
      {() => (
        <>
          <TopNavLink to="/">Home</TopNavLink>
          <TopNavLink to="/admin">Admin</TopNavLink>
        </>
      )}
    </Location>
  );
};

export default TopNavLinks;
