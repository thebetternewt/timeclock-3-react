import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';

import { PAY_PERIODS } from '../../../apollo/queries/payPeriod';
import PayPeriodForm from './PayPeriodForm';

const PayPeriods = () => {
	const [year, setYear] = useState(new Date().getFullYear());

	const { data: ppData } = useQuery(PAY_PERIODS, {
		variables: { year: parseInt(year, 10) },
	});

	const { payPeriods = [] } = ppData;

	console.log(payPeriods);

	return (
		<div>
			<h1>Pay Periods</h1>
			<PayPeriodForm year={year} setYear={setYear} />
		</div>
	);
};

export default PayPeriods;
