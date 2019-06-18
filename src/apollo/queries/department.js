import { gql } from 'apollo-boost';

export const DEPARTMENTS = gql`
	query Departments {
		departments {
			id
			name
			supervisors {
				id
				netId
				nineDigitId
				name
				lastName
				firstName
			}
			users {
				id
				netId
				nineDigitId
				name
				firstName
				lastName
			}
		}
	}
`;

export const DEPARTMENT = gql`
	query Department($id: ID!) {
		department(id: $id) {
			id
			name
			supervisors {
				id
				netId
				nineDigitId
				name
				lastName
				firstName
			}
			users {
				id
				netId
				nineDigitId
				name
				firstName
				lastName
			}
		}
	}
`;

export const USERS_BY_DEPARTMENT = gql`
	query UsersByDepartment($deptId: ID!) {
		deptUsers: usersByDepartment(deptId: $deptId) {
			id
			name
			firstName
			lastName
			netId
			nineDigitId
			isClockedIn
			lastShift {
				id
				timeIn
				timeOut
				department {
					id
					name
				}
			}
		}
	}
`;
