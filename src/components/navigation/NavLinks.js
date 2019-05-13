import React from 'react';
import { Link } from '@reach/router';

const NavLinks = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/admin">Admin</Link>
    </>
  );
};

export default NavLinks;
