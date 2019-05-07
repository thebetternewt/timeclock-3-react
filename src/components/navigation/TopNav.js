import React from 'react';
import styled from 'styled-components';
import NavLinks from './NavLinks';

const TopNav = ({ className }) => {
  return (
    <nav className={className}>
      <NavLinks />
    </nav>
  );
};

export default styled(TopNav)`
  display: flex;
  align-items: center;
`;
