import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation Login($netId: String!, $password: String!) {
    login(netId: $netId, password: $password) {
      id
      firstName
      lastName
      name
      email
      netId
      nineDigitId
      admin
      active
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const CLOCK_IN = gql`
  mutation ClockIn($deptId: String!) {
    clockIn(deptId: $deptId) {
      id
    }
  }
`;
export const CLOCK_OUT = gql`
  mutation ClockOut {
    clockOut {
      id
    }
  }
`;
