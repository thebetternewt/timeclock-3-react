import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';

import { PAY_PERIODS } from '../../../apollo/queries/payPeriod';
import PayPeriodForm from './PayPeriodForm';
import PayPeriodsList from './PayPeriodsList';
import Button from '../../../styled/elements/Button';
import { sort } from '../../../util/arrays';

const PayPeriods = () => {
	const [year, setYear] = useState(new Date().getFullYear());
	const [showForm, setShowForm] = useState(false);

	const { data: ppData } = useQuery(PAY_PERIODS, {
		variables: { year: parseInt(year, 10) },
	});

	const { payPeriods = [] } = ppData;

	return (
		<div>
			<h1 className="title">Pay Periods</h1>
			{showForm ? (
				<PayPeriodForm
					year={year}
					setYear={setYear}
					close={() => setShowForm(false)}
				/>
			) : (
				<Button
					text="Add Pay Period"
					color="success"
					onClick={() => setShowForm(true)}
				/>
			)}
			<PayPeriodsList
				payPeriods={sort(payPeriods, ['year', 'payPeriodId']).reverse()}
			/>
		</div>
	);
};

export default PayPeriods;
