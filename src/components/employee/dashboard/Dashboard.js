import React from 'react';
import { startOfDay, endOfDay } from 'date-fns';

import Container from '../../../styled/layouts/Container';
import Spinner from '../../../styled/elements/Spinner';
import ShiftClock from './ShiftClock';
import Stats from './Stats';
import PrivateRoute from '../../shared/PrivateRoute';
import { useQuery } from 'react-apollo-hooks';
import { CURRENT_PAY_PERIOD } from '../../../apollo/queries/payPeriod';
import { MY_SHIFTS } from '../../../apollo/queries/user';

const StatsWrapper = ({ payPeriod }) => {
	const { data: shiftData, loading: shiftsLoading } = useQuery(MY_SHIFTS, {
		variables: {
			startDate: startOfDay(payPeriod.startDate),
			endDate: endOfDay(payPeriod.endDate),
		},
	});

	const { myShifts } = shiftData;

	return (
		<Stats payPeriod={payPeriod} shifts={myShifts} loading={shiftsLoading} />
	);
};

const Dashboard = () => {
	const { data: ppData, loading } = useQuery(CURRENT_PAY_PERIOD);

	const { payPeriod } = ppData;

	return (
		<Container direction="column">
			<h1 className="title">Dashboard</h1>
			<div style={{ display: 'flex' }}>
				<div style={{ flexBasis: '50%' }}>
					{!payPeriod || loading ? (
						<Spinner size="60px" style={{ marginTop: '3rem' }} />
					) : (
						<StatsWrapper payPeriod={payPeriod} />
					)}
				</div>
				<ShiftClock />
			</div>
		</Container>
	);
};

export default () => <PrivateRoute component={Dashboard} />;
