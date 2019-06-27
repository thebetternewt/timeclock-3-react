import React from 'react';
import { Redirect } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import { ME } from '../../apollo/queries/user';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
	const { data, loading } = useQuery(ME);

	if (!data.me && !loading) {
		// If user session expired, redirect to login.
		return <Redirect to="/" noThrow />;
	} else if (data) {
		return <Component {...rest} />;
	}
};

export default PrivateRoute;
