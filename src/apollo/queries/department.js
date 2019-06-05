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
			}
			users {
				id
				netId
				name
			}
		}
	}
`;

export const USERS_BY_DEPARTMENT = gql`
	query UsersByDepartment($deptId: ID!) {
		deptUsers: usersByDepartment(deptId: $deptId) {
			id
			name
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
