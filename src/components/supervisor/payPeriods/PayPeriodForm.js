import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { parse } from 'date-fns';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import { Form, Select, Input } from '../../../styled/elements/Form';
import Button from '../../../styled/elements/Button';
import GraphQlErrors from '../../shared/GraphQLErrors';
import { CREATE_PAY_PERIOD } from './mutations';

import 'react-datepicker/dist/react-datepicker.css';

const yearOptions = [
	new Date().getFullYear() - 1,
	new Date().getFullYear(),
	new Date().getFullYear() + 1,
];

const semesterOptions = ['Spring', 'Summer', 'Fall'];

const PayPeriodForm = ({ close }) => {
	const [year, setYear] = useState(new Date().getFullYear());
	const [semester, setSemester] = useState(semesterOptions[0].toUpperCase());
	const [payPeriodId, setPayPeriodId] = useState('');
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [error, setError] = useState();

	const createPayPeriod = useMutation(CREATE_PAY_PERIOD, {
		variables: {
			data: {
				year,
				payPeriodId,
				fiscalYear: payPeriodId > 12 ? year + 1 : year,
				semester,
				startDate,
				endDate,
			},
		},
		refetchQueries: () => ['PayPeriods'],
	});
	const handleCreate = async e => {
		e.preventDefault();
		try {
			await createPayPeriod();
		} catch (err) {
			console.log(err);
			setError(err);
		}
	};

	const handleYearChange = e => setYear(parseInt(e.target.value));
	const handleSemesterChange = e => setSemester(e.target.value);
	const handlePayPeriodIdChange = e => setPayPeriodId(parseInt(e.target.value));
	const handleStartDateChange = date => setStartDate(date);
	const handleEndDateChange = date => setEndDate(date);

	return (
		<Form>
			{error && <GraphQlErrors error={error} />}

			<label htmlFor="year">Year</label>
			<Select name="year" id="year" onChange={handleYearChange} value={year}>
				{yearOptions.map(year => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</Select>

			<label htmlFor="semester">Semester</label>
			<Select
				name="semester"
				id="semester"
				onChange={handleSemesterChange}
				value={semester}
			>
				{semesterOptions.map(semester => (
					<option key={semester} value={semester.toUpperCase()}>
						{semester}
					</option>
				))}
			</Select>

			<label htmlFor="payPeriodId">Pay Period Number</label>
			<Input
				type="number"
				name="payPeriodId"
				id="payPeriodId"
				placeholder="1"
				onChange={handlePayPeriodIdChange}
			/>

			<label htmlFor="startDate">Start Date</label>
			<DatePicker
				customInput={<Input style={{ marginRight: '1rem' }} />}
				name="startDate"
				id="startDate"
				selected={startDate}
				selectsStart
				maxDate={parse(endDate)}
				onChange={handleStartDateChange}
			/>

			<label htmlFor="endDate">End Date</label>
			<DatePicker
				customInput={<Input style={{ marginRight: '1rem' }} />}
				name="endDate"
				id="endDate"
				selected={endDate}
				selectsEnd
				minDate={parse(startDate)}
				onChange={handleEndDateChange}
			/>

			<Actions>
				<Button text="Submit" onClick={handleCreate} color="success" />

				<Button
					text="Cancel"
					onClick={e => {
						e.preventDefault();
						close();
					}}
				/>
			</Actions>
		</Form>
	);
};

const Actions = styled.div`
	display: flex;
	margin-top: 1rem;

	button {
		margin-right: 1rem;
	}
`;

export default PayPeriodForm;
