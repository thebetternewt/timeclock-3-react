import { gql } from 'apollo-boost';

export const CREATE_PAY_PERIOD = gql`
	mutation CreatePayPeriod($data: PayPeriodInput!) {
		createPayPeriod(data: $data) {
			id
		}
	}
`;

export const DELETE_PAY_PERIOD = gql`
	mutation DeletePayPeriod($id: ID!) {
		deletePayPeriod(id: $id)
	}
`;
