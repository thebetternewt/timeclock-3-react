import React from 'react';
import styled from 'styled-components';

import Spinner from './Spinner';
import {
  SUCCESS,
  PRIMARY,
  GRAY1,
  DANGER,
  GRAY5,
  LIGHT_GRAY,
} from '../utilities';

const StyledButton = styled.button`
  padding: 0.5em 8px;
  margin: 5px 0;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    /* background: ${LIGHT_GRAY};
    color: ${GRAY5}; */
    cursor: not-allowed;
  }

  svg {
    margin-right: 5px;
  }

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
`;

export const Button = ({ text, loading, ...styles }) => (
  <StyledButton {...styles}>
    {loading ? (
      <Spinner size="1rem" />
    ) : text && typeof text === 'string' ? (
      text
    ) : (
      text()
    )}
  </StyledButton>
);
