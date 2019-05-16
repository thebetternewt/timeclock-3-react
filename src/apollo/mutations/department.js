import { gql } from 'apollo-boost';

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($data: DepartmentInput!) {
    createDepartment(data: $data) {
      id
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($deptId: ID!, $data: DepartmentInput!) {
    updateDepartment(deptId: $deptId, data: $data) {
      id
    }
  }
`;
