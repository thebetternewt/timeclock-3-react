import React from 'react';
import { Link } from '@reach/router';

const NavLinks = () => {
  return (
    <>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </>
  );
};

export default NavLinks;
