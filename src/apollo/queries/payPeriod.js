import { gql } from 'apollo-boost';

export const PAY_PERIODS = gql`
	query PayPeriods($year: Int) {
		payPeriods(data: { year: $year }) {
			id
			startDate
			endDate
			year
			fiscalYear
			payPeriodId
			semester
		}
	}
`;

export const CURRENT_PAY_PERIOD = gql`
	query PayPeriod {
		payPeriod {
			id
			startDate
			endDate
			fiscalYear
			payPeriodId
			semester
		}
	}
`;
