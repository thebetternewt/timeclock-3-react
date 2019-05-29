import React from 'react';
import { Link } from '@reach/router';

const AuthLinks = ({ isAuth }) => (
	<>{!isAuth && <Link to="/login">Login</Link>}</>
);

export default AuthLinks;
