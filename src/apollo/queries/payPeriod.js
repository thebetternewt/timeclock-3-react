import { gql } from 'apollo-boost';

export const PAY_PERIODS = gql`
  query PayPeriods($year: Int) {
    payPeriods(data: { year: $year }) {
      id
      startDate
      endDate
      fiscalYear
      payPeriodId
      semester
    }
  }
`;
