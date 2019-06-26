import React from 'react';
import { format } from 'date-fns';
import { useMutation } from 'react-apollo-hooks';
import { DELETE_PAY_PERIOD } from './mutations';

const PayPeriodsList = ({ payPeriods }) => {
	const deletePayPeriod = useMutation(DELETE_PAY_PERIOD, {
		refetchQueries: () => ['PayPeriods'],
	});

	const handleDelete = async id => {
		try {
			deletePayPeriod({ variables: { id } });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ul style={{ padding: 0 }}>
			{payPeriods.map(pp => (
				<li key={pp.id} style={{ display: 'flex', margin: '8px 0' }}>
					<div>
						{pp.year} #{pp.payPeriodId} ({format(pp.startDate, 'YYYY-MM-DD')} -{' '}
						{format(pp.endDate, 'YYYY-MM-DD')})
					</div>
					<button
						onClick={() => handleDelete(pp.id)}
						style={{ marginLeft: 16, cursor: 'pointer' }}
					>
						delete
					</button>
				</li>
			))}
		</ul>
	);
};

export default PayPeriodsList;
