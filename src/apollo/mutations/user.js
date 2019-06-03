import { gql } from 'apollo-boost';

export const REGISTER = gql`
	mutation Register($data: RegisterInput!) {
		register(data: $data) {
			id
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($id: ID!, $data: UserInput!) {
		updateUser(id: $id, data: $data) {
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

export const CLOCK_OUT_USER = gql`
	mutation ClockOutUser($userId: ID!) {
		clockOutUser(userId: $userId) {
			id
		}
	}
`;

export const ADD_SUPERVISOR_TO_DEPT = gql`
	mutation AddSupervisorToDept($userId: ID!, $deptId: ID!) {
		addToDepartment(userId: $userId, deptId: $deptId, supervisor: true)
	}
`;

export const ADD_TO_DEPT = gql`
	mutation AddEmplooyeeToDept($userId: ID!, $deptId: ID!) {
		addToDepartment(userId: $userId, deptId: $deptId)
	}
`;

export const REMOVE_SUPERVISOR_FROM_DEPT = gql`
	mutation RemoveSupervisorFromDept($userId: ID!, $deptId: ID!) {
		addToDepartment(userId: $userId, deptId: $deptId, supervisor: false)
	}
`;

export const REMOVE_FROM_DEPT = gql`
	mutation RemoveEmployeeFromDept($userId: ID!, $deptId: ID!) {
		removeFromDepartment(userId: $userId, deptId: $deptId)
	}
`;

export const ACTIVATE_USER = gql`
	mutation ActivateUser($netId: String!) {
		activateUser(netId: $netId)
	}
`;

export const DEACTIVATE_USER = gql`
	mutation DeactivateUser($netId: String!) {
		deactivateUser(netId: $netId)
	}
`;
