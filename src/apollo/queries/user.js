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
      lastShift {
        id
        timeIn
        timeOut
        department {
          name
        }
      }
      departments {
        id
        name
      }
    }
  }
`;

export const IS_CLOCKED_IN = gql`
  query IsClockedIn {
    isClockedin
  }
`;

export const MY_SHIFTS = gql`
  query MyShifts($deptId: String, $startDate: DateTime, $endDate: DateTime) {
    myShifts(deptId: $deptId, startDate: $startDate, endDate: $endDate) {
      id
      timeIn
      timeOut
      minutesElapsed
      department {
        id
        name
      }
      user {
        id
        name
      }
    }
  }
`;
