import React from 'react';
import styled from 'styled-components';

import Spinner from './Spinner';

const StyledButton = styled.button`
  padding: 0.5em 8px;
  margin: 5px 0;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 500;


  background: ${({ color }) => color || '#ddd'};
  cursor: pointer;
  }}
`;

export const Button = ({ text, loading, ...styles }) => (
  <StyledButton {...styles}>
    {loading ? <Spinner size="1rem" /> : text}
  </StyledButton>
);
