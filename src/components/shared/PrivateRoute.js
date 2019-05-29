import React from 'react';
import { Redirect } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import { ME } from '../../apollo/queries/user';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
	const { data } = useQuery(ME);

	if (!data.me) {
		// If user session expired, redirect to login.
		return <Redirect to="/login" noThrow />;
	} else if (data) {
		return <Component {...rest} />;
	}
};

export default PrivateRoute;
