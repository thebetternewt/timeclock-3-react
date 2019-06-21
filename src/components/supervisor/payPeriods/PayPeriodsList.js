import React from 'react';
import { format } from 'date-fns';

const PayPeriodsList = ({ payPeriods }) => {
	return (
		<ul>
			{payPeriods.map(pp => (
				<li key={pp.id}>
					{pp.year} #{pp.payPeriodId} ({format(pp.startDate, 'YYYY-MM-DD')} -{' '}
					{format(pp.endDate, 'YYYY-MM-DD')})
				</li>
			))}
		</ul>
	);
};

export default PayPeriodsList;
