import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { format, parse } from 'date-fns';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import { Form, Select, Input } from '../../../styled/elements/Form';
import Button from '../../../styled/elements/Button';
// import { PAY_PERIODS } from '../../../apollo/queries/payPeriod';
// import {
// 	CREATE_WORK_STUDY,
// 	EDIT_WORK_STUDY,
// 	DELETE_WORK_STUDY,
// } from '../../../../apollo/mutations/workStudy';
import GraphQlErrors from '../../shared/GraphQLErrors';

import 'react-datepicker/dist/react-datepicker.css';

const yearOptions = [
	new Date().getFullYear() - 1,
	new Date().getFullYear(),
	new Date().getFullYear() + 1,
];

const semesterOptions = ['Spring', 'Summer', 'Fall'];

const PayPeriodForm = ({ payPeriod, close }) => {
	const [year, setYear] = useState(payPeriod && payPeriod.year);
	const [semester, setSemester] = useState(payPeriod && payPeriod.semester);
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [editingDates, setEditingDates] = useState(false);
	const [error, setError] = useState();

	const editing = !!payPeriod;
	// const mutation = editing ? EDIT_WORK_STUDY : CREATE_WORK_STUDY;

	// const handleDepartmentChange = e =>
	// 	setDepartment(getDepartment(e.target.value));
	// const handleAmountChange = e => setAmount(e.target.value);
	const handleYearChange = e => setYear(e.target.value);
	const handleSemesterChange = e => setSemester(e.target.value);
	// const handlePeriodChange = e => {
	// 	const selectedPeriod = getPeriod(e.target.value);
	// 	console.log('selectedPeriod:', selectedPeriod);
	// 	setPeriod(selectedPeriod);
	// 	setStartDate(parse(selectedPeriod.startDate));
	// 	setEndDate(parse(selectedPeriod.endDate));
	// };
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

			<ModalActions>
				{/* <Mutation mutation={mutation} refetchQueries={() => ['User']}>
							{(submit, { loading, error: workStudyError }) => {
								if (workStudyError) {
									setError(workStudyError);
								}

								const variables = {
									data: {
										userId: employee.id,
										deptId: department.id,
										workStudyPeriodId: period.id,
										startDate: format(startDate, 'YYYY-MM-DD'),
										endDate: format(endDate, 'YYYY-MM-DD'),
										amount: parseInt(amount, 10),
									},
								};

								if (editing) {
									variables.id = ws.id;
								}

								return (
									<Button
										type="submit"
										text="Yes"
										color="success"
										onClick={async e => {
											e.preventDefault();
											console.log(variables);
											try {
												await submit({
													variables,
												});
												close();
											} catch (error) {
												console.log(error);
											}
										}}
										loading={loading}
									/>
								);
							}}
						</Mutation> */}
				{/* 
						{editing && (
							<Mutation
								mutation={DELETE_WORK_STUDY}
								variables={{ id: ws.id }}
								refetchQueries={() => ['User']}
							>
								{(destroy, { loading }) => (
									<Button
										text="Remove"
										color="danger"
										loading={loading}
										onClick={async e => {
											e.preventDefault();
											try {
												await destroy();
												close();
											} catch (err) {
												console.log(err);
											}
										}}
									/>
								)}
							</Mutation>
						)} */}

				<Button
					text="Cancel"
					onClick={e => {
						e.preventDefault();
						close();
					}}
				/>
			</ModalActions>
		</Form>
	);
};

const WorkStudyDescription = styled.p`
	span {
		font-weight: 600;
	}
`;

const ModalActions = styled.div`
	display: flex;

	button {
		margin-right: 1rem;
	}
`;

export default PayPeriodForm;
