import React from 'react';
import { Link } from '@reach/router';
import { Mutation } from 'react-apollo';

import { LOGOUT } from '../../apollo/mutations/user';
import { Button } from '../../styled/elements/Button';

const AuthLinks = ({ isAuth }) => (
  <>
    {isAuth ? (
      <Mutation mutation={LOGOUT}>
        {logout => (
          <Button
            onClick={async () => {
              try {
                await logout();
                window.location = '/';
              } catch (e) {
                console.log(e);
              }
            }}
            text="Logout"
          />
        )}
      </Mutation>
    ) : (
      <Link to="/login">Login</Link>
    )}
  </>
);

export default AuthLinks;
