import { gql } from 'apollo-boost';

export const CREATE_WORK_STUDY = gql`
  mutation CreateWorkStudy($data: WorkStudyInput!) {
    createWorkStudy(data: $data) {
      id
    }
  }
`;

export const EDIT_WORK_STUDY = gql`
  mutation EditWorkStudy($id: ID!, $data: WorkStudyInput!) {
    editWorkStudy(id: $id, data: $data) {
      id
    }
  }
`;

export const DELETE_WORK_STUDY = gql`
  mutation DeleteWorkStudy($id: ID!) {
    deleteWorkStudy(id: $id)
  }
`;
