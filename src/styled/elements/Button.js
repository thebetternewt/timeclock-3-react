import React from 'react';
import styled from 'styled-components';

import Spinner from './Spinner';
import { SUCCESS } from '../utilities';
import { PRIMARY, GRAY1, DANGER } from '../utilities/Colors';

const StyledButton = styled.button`
  padding: 0.5em 8px;
  margin: 5px 0;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 500;


  ${({ color }) => {
    switch (color) {
      case 'primary':
        return `
          background: ${PRIMARY};
          color: #fff;
        `;
      case 'success':
        return `
          background: ${SUCCESS};
          color: ${GRAY1};
        `;
      case 'danger':
        return `
          background: ${DANGER};
          color: #fff;
        `;
      default: {
        return `background: #ddd;`;
      }
    }
  }};
  cursor: pointer;
  }}
`;

export const Button = ({ text, loading, ...styles }) => (
  <StyledButton {...styles}>
    {loading ? <Spinner size="1rem" /> : text}
  </StyledButton>
);
