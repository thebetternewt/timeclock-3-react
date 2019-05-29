import React from 'react';
import moment from 'moment';

import Container from '../../../styled/layouts/Container';
import ShiftClock from './ShiftClock';
import Stats from './Stats';
import PrivateRoute from '../../shared/PrivateRoute';
import { Query } from 'react-apollo';
import { CURRENT_PAY_PERIOD } from '../../../apollo/queries/payPeriod';
import { MY_SHIFTS } from '../../../apollo/queries/user';

const Dashboard = () => {
	const shiftQueryVariables = ({ payPeriod }) => {
		const vars = {
			startDate: moment(payPeriod.startDate)
				.startOf('Day')
				.toISOString(),
			endDate: moment(payPeriod.endDate)
				.endOf('Day')
				.toISOString(),
		};
		return vars;
	};

	return (
		<Container>
			<Query query={CURRENT_PAY_PERIOD}>
				{({ data, loading: ppLoading, error: ppError }) => {
					let payPeriod;

					if (data && data.payPeriod) {
						payPeriod = data.payPeriod;

						return (
							<Query
								query={MY_SHIFTS}
								variables={shiftQueryVariables({ payPeriod })}
							>
								{({ data, loading: shiftsLoading }) => {
									const loading = ppLoading || shiftsLoading;

									if (data && data.myShifts) {
										const { myShifts } = data;

										return (
											<Stats
												payPeriod={payPeriod}
												shifts={myShifts}
												loading={loading}
											/>
										);
									}

									return <Stats payPeriod={payPeriod} loading={loading} />;
								}}
							</Query>
						);
					}
					return (
						<Stats payPeriod={payPeriod} loading={!ppError && ppLoading} />
					);
				}}
			</Query>
			<ShiftClock />
		</Container>
	);
};

export default () => <PrivateRoute component={Dashboard} />;
