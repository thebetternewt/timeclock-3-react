import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.5em 8px;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 500;

  margin: 5px 0;

  background: ${({ color }) => color || '#ddd'};
  }}
`;
