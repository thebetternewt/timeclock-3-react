import { gql } from 'apollo-boost';

export const CREATE_SHIFT = gql`
  mutation CreateShift($data: ShiftInput!) {
    createShift(data: $data) {
      id
    }
  }
`;

export const UPDATE_SHIFT = gql`
  mutation UpdateShift($id: ID!, $data: ShiftInput!) {
    updateShift(id: $id, data: $data) {
      id
    }
  }
`;
export const DELETE_SHIFT = gql`
  mutation DeleteShift($id: ID!) {
    deleteShift(id: $id)
  }
`;
