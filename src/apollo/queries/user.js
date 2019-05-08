import { gql } from 'apollo-boost';

export const ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      name
      netId
      nineDigitId
      admin
      active
      email
      isClockedIn
      departments {
        id
        name
      }
      shifts {
        id
        department {
          name
          users {
            id
          }
        }
        timeIn
        minutesElapsed
      }
    }
  }
`;

export const IS_CLOCKED_IN = gql`
  query IsClockedIn {
    isClockedin
  }
`;
