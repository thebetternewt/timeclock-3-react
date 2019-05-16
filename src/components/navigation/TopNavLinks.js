import React from 'react';
import { Location } from '@reach/router';

import TopNavLink from './TopNavLink';
import { Query } from 'react-apollo';
import { ME } from '../../apollo/queries/user';

const TopNavLinks = () => {
  return (
    <Location>
      {() => (
        <>
          <TopNavLink to="/">Home</TopNavLink>
          <Query query={ME}>
            {({ data }) => {
              if (data && data.me && data.me.admin) {
                return <TopNavLink to="/admin">Admin</TopNavLink>;
              }

              return null;
            }}
          </Query>
        </>
      )}
    </Location>
  );
};

export default TopNavLinks;
