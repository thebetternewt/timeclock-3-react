import React from 'react';
import styled from 'styled-components';

import Box from '../../styled/layouts/Box';
import { DANGER } from '../../styled/utilities';

const GraphQlErrors = error => {
  console.log('graphql errors:', error);

  // if (!error.errors.graphQLErrors.length) {
  //   return null;
  // }

  return (
    <ErrorWrapper>
      <ul>
        {error.error.graphQLErrors.map(({ message }) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled(Box)`
  background-color: ${DANGER};
  padding: 1rem;
  margin-bottom: 1rem;

  ul {
    color: #fff;
    opacity: 1;
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default GraphQlErrors;
