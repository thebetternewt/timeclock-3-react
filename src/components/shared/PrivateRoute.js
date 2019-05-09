import React from 'react';
import { Redirect } from '@reach/router';
import { Query } from 'react-apollo';
import { ME } from '../../apollo/queries/user';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  console.log('private route...');

  return (
    <Query query={ME}>
      {({ data }) => {
        if (data && !data.me) {
          // If user session expired, redirect to login.
          return <Redirect to="/login" noThrow />;
        } else if (data) {
          return <Component {...rest} />;
        }

        return null;
      }}
    </Query>
  );

  // If token does exist, update authContext with user data.
  // if (token && !authContext.user) {
  //   const user = jwt.decode(token)
  //   authContext.setAuthenticatedUser(user)
  // }
};

export default PrivateRoute;
