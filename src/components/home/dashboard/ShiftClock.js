import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { differenceInSeconds } from 'date-fns';

import Timer from './Timer';
import Box from '../../../styled/layouts/Box';
import { Form } from '../../../styled/elements/Form';
import Button from '../../../styled/elements/Button';
import { ME } from '../../../apollo/queries/user';
import { CLOCK_IN, CLOCK_OUT } from '../../../apollo/mutations/user';
import DepartmentSelect from '../../shared/DepartmentSelect';
import Spinner from '../../../styled/elements/Spinner';

const ShiftClock = () => {
	const [loading, setLoading] = useState(false);
	const [department, setDepartment] = useState('');

	const { data: meData, loading: meLoading } = useQuery(ME, {
		fetchPolicy: 'cache-and-network',
	});
	const { me = {} } = meData;
	const { departments = [], lastShift } = me;

	const clockOut = useMutation(CLOCK_OUT, {
		refetchQueries: () => ['Me', 'MyShifts'],
	});
	const handleClockOut = async () => {
		setLoading(true);
		try {
			await clockOut();
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const clockIn = useMutation(CLOCK_IN, {
		variables: {
			deptId: department,
		},
		refetchQueries: () => ['Me', 'MyShifts'],
	});
	const handleClockIn = async () => {
		setLoading(true);
		try {
			await clockIn();
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	let containerContent;

	if (loading || meLoading) {
		containerContent = <Spinner size="60px" />;
	} else if (me.isClockedIn) {
		const secondsElapsed = differenceInSeconds(new Date(), lastShift.timeIn);

		containerContent = (
			<>
				<div className="title">Currently clocked into</div>
				<div className="department">{lastShift.department.name}</div>
				<Timer secondsElapsed={secondsElapsed} />

				<Button
					onClick={handleClockOut}
					loading={loading}
					text="Clock Out"
					color="danger"
					disabled={loading}
				/>
			</>
		);
	} else {
		containerContent = (
			<Form onSubmit={handleClockIn}>
				<DepartmentSelect
					departments={departments}
					value={department}
					handleChange={e => setDepartment(e.target.value)}
					name="deptId"
				/>

				<Button
					type="submit"
					color="success"
					text="Clock in"
					loading={loading}
					disabled={loading || !department}
				/>
			</Form>
		);
	}

	return <ShiftClockContainer>{containerContent}</ShiftClockContainer>;
};

const ShiftClockContainer = styled(Box)`
	flex-basis: 50%;
	padding: 2rem;
	flex-grow: 0;

	button {
		display: block;
		width: 100%;
		margin-top: 2rem;
		max-width: 200px;
	}

	.title {
		opacity: 0.6;
		margin-bottom: 0.3em;
	}

	.department {
		font-size: 1.5rem;
	}
`;

export default ShiftClock;
