import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';

import { PAY_PERIODS } from '../../../apollo/queries/payPeriod';
import PayPeriodForm from './PayPeriodForm';
import PayPeriodsList from './PayPeriodsList';
import Button from '../../../styled/elements/Button';
import { sort } from '../../../util/arrays';
import { Input, Form } from '../../../styled/elements/Form';

const PayPeriods = () => {
	const [year, setYear] = useState('');
	const [showForm, setShowForm] = useState(false);

	const { data: ppData } = useQuery(PAY_PERIODS, {
		variables: { year: parseInt(year, 10) },
	});

	const { payPeriods = [] } = ppData;
	console.log(payPeriods);
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
			<Form style={{ margin: '2rem 0' }}>
				<label>Year</label>
				<Input
					style={{ width: 200 }}
					value={year}
					onChange={e => setYear(e.target.value)}
				/>
			</Form>
			<PayPeriodsList
				payPeriods={sort(payPeriods, ['payPeriodId', 'year']).reverse()}
			/>
		</div>
	);
};

export default PayPeriods;
