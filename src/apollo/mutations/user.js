import { gql } from 'apollo-boost';

export const REGISTER = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
    }
  }
`;

export const EDIT = gql`
  mutation UpdateUser($data: UserInput!) {
    updateUser(data: $data) {
      id
    }
  }
`;

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
