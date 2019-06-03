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
			supervisor
			active
			email
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
			departments {
				id
				name
			}
			supervisedDepartments {
				id
				name
			}
		}
	}
`;

export const IS_CLOCKED_IN = gql`
	query IsClockedIn {
		isClockedIn
	}
`;

export const MY_SHIFTS = gql`
	query MyShifts($deptId: String, $startDate: DateTime, $endDate: DateTime) {
		myShifts(deptId: $deptId, startDate: $startDate, endDate: $endDate) {
			id
			timeIn
			timeOut
			minutesElapsed
			workStudy
			nightShiftMinutes
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

export const USER_SHIFTS = gql`
	query UserShifts(
		$userId: ID
		$deptId: ID
		$startDate: DateTime
		$endDate: DateTime
	) {
		shifts(
			userId: $userId
			deptId: $deptId
			startDate: $startDate
			endDate: $endDate
		) {
			id
			timeIn
			timeOut
			minutesElapsed
			workStudy
			nightShiftMinutes
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

export const USERS = gql`
	query Users {
		users {
			id
			name
			netId
		}
	}
`;

export const USER = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			firstName
			lastName
			name
			netId
			nineDigitId
			email
			admin
			supervisor
			active
			departments {
				id
				name
			}
			workStudy {
				id
				startDate
				endDate
				amount
				period: workStudyPeriod {
					id
					name
					year
					startDate
					endDate
				}
				department {
					id
					name
				}
			}
		}
	}
`;
