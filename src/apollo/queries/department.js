import { gql } from 'apollo-boost';

export const DEPARTMENTS = gql`
	query Departments {
		departments {
			id
			name
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
				name
				firstName
				lastName
			}
			users {
				id
				netId
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
