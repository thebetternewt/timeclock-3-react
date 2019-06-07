import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Box from '../../../styled/layouts/Box';
import { LIGHT_GRAY, GRAY4 } from '../../../styled/utilities/Colors';
import Button from '../../../styled/elements/Button';
import { Mutation } from 'react-apollo';
import { CLOCK_OUT_USER } from '../../../apollo/mutations/user';

const PayPeriodsTable = ({ payPeriods }) => (
	<Table>
		<List>
			<ListHeader>
				<div>Name</div>
				<div>Hours Elapsed</div>
				<div />
			</ListHeader>
			{payPeriods.map(pp => {
				return (
					<Item key={pp.id}>
						<div>{pp.name}</div>
						<div>
							{/* Hours elapsed since clock in. */}
							{(
								moment().diff(moment(pp.lastShift.timeIn)) /
								1000 /
								60 /
								60
							).toFixed(2)}
						</div>

						<div>
							<Mutation
								mutation={CLOCK_OUT_USER}
								variables={{ userId: pp.id }}
								refetchQueries={() => ['UsersByDepartment']}
							>
								{(clockOut, { loading }) => {
									return (
										<Button
											color="danger"
											text="clock out"
											loading={loading}
											onClick={async () => {
												try {
													await clockOut();
												} catch (err) {
													console.log(err);
												}
											}}
										/>
									);
								}}
							</Mutation>
						</div>
					</Item>
				);
			})}
		</List>
	</Table>
);

const Table = styled(Box)`
	width: 100%;
`;

const List = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const ListHeader = styled.div`
	display: flex;
	justify-content: space-between;

	padding: 8px 15px;
	border-bottom: 3px solid ${GRAY4};
	margin-bottom: 0.8rem;

	> div {
		flex-basis: 30%;
	}
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center
  background-color: ${LIGHT_GRAY};
  color: #000;

  margin: 5px 0;
  padding: 8px 15px;
  border-radius: 3px;

  > div {
    flex-basis: 30%;
  }

  button {
    float: right;
  }
`;

export default PayPeriodsTable;
