import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { format, parse } from 'date-fns';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import NumberFormat from 'react-number-format';

import DepartmentSelect from '../../shared/DepartmentSelect';
import { Form, Select, Input } from '../../../styled/elements/Form';
import { ALL_WORK_STUDY_PERIOD } from '../../../apollo/queries/workStudyPeriod';
import {
	CREATE_WORK_STUDY,
	EDIT_WORK_STUDY,
	DELETE_WORK_STUDY,
} from '../../../apollo/mutations/workStudy';
import GraphQlErrors from '../../shared/GraphQLErrors';
import Button from '../../../styled/elements/Button';
import { arraysEqual } from '../../../util/arrays';

import 'react-datepicker/dist/react-datepicker.css';

const yearOptions = [
	new Date().getFullYear() - 1,
	new Date().getFullYear(),
	new Date().getFullYear() + 1,
];

const WorkStudyForm = ({
	employee,
	departments = [],
	workStudy: ws,
	close,
}) => {
	const initialValues = {
		department: ws ? ws.department : null,
		year: ws ? ws.period.year : '',
		period: ws ? ws.period : null,
		startDate: ws ? parse(ws.startDate) : null,
		endDate: ws ? parse(ws.endDate) : null,
		amount: ws ? ws.amount : null,
	};

	const [department, setDepartment] = useState(initialValues.department);
	const [year, setYear] = useState(initialValues.year);
	const [periods, setPeriods] = useState([]);
	const [period, setPeriod] = useState(initialValues.period);
	const [startDate, setStartDate] = useState(initialValues.startDate);
	const [endDate, setEndDate] = useState(initialValues.endDate);
	const [amount, setAmount] = useState(initialValues.amount);
	const [editingDates, setEditingDates] = useState(false);
	const [error, setError] = useState();

	const editing = !!ws;
	const mutation = editing ? EDIT_WORK_STUDY : CREATE_WORK_STUDY;

	const handleDepartmentChange = e =>
		setDepartment(getDepartment(e.target.value));
	const handleAmountChange = e => {
		let value = e.target.value;
		console.log(value);

		value = value.replace(/[$,]/g, '');

		console.log('new', value);
		setAmount(value);
	};
	const handleYearChange = e => {
		setYear(e.target.value);
		setPeriod(null);
	};
	const handlePeriodChange = e => {
		const selectedPeriod = getPeriod(e.target.value);
		console.log('selectedPeriod:', selectedPeriod);
		setPeriod(selectedPeriod);
		setStartDate(parse(selectedPeriod.startDate));
		setEndDate(parse(selectedPeriod.endDate));
	};
	const handleStartDateChange = date => setStartDate(date);
	const handleEndDateChange = date => setEndDate(date);

	const getDepartment = id => departments.find(dept => dept.id === id);
	const getPeriod = id => periods.find(period => period.id === id);
	const toggleEditingDates = () => setEditingDates(!editingDates);

	return (
		<Form>
			{error && <GraphQlErrors error={error} />}
			<label htmlFor="deptId"> Department</label>
			<DepartmentSelect
				name="deptId"
				departments={departments}
				handleChange={handleDepartmentChange}
				value={department ? department.id : ''}
			/>

			<label htmlFor="year">Year</label>
			<Select name="year" onChange={handleYearChange} value={year}>
				<option value="">Choose year.</option>
				{yearOptions.map(year => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</Select>

			<label htmlFor="workStudyPeriodId">Work study period</label>
			<Query
				query={ALL_WORK_STUDY_PERIOD}
				variables={{ year: parseInt(year, 10) }}
			>
				{({ data, loading, error }) => {
					let periodOptions;

					if (!year && periods.length) {
						setPeriods([]);
					} else if (year && data && data.allWorkStudyPeriod) {
						if (!arraysEqual(data.allWorkStudyPeriod, periods)) {
							setPeriods(data.allWorkStudyPeriod);
						}

						if (periods.length) {
							periodOptions = periods.map(period => (
								<option key={period.id} value={period.id}>
									{period.name}
								</option>
							));
						}
					}

					return (
						<Select
							name="workStudyPeriodId"
							onChange={handlePeriodChange}
							value={period ? period.id : ''}
						>
							{periods.length ? (
								<>
									<option value="">Choose work study period.</option>
									{periodOptions}
								</>
							) : (
								<option value="">No work study periods found.</option>
							)}
						</Select>
					);
				}}
			</Query>

			<label htmlFor="amount">Work Study Amount</label>
			<NumberFormat
				customInput={Input}
				name="amount"
				allowEmptyFormatting
				thousandSeparator={true}
				prefix={'$'}
				value={amount}
				onChange={handleAmountChange}
			/>

			{department && year && period && (
				<>
					<WorkStudyDescription>
						<span>{employee.name}</span> is eligible for work study in{' '}
						<span>{department.name}</span> during{' '}
						<span>
							{period.name} {year} ({format(startDate, 'MMM DD')} -{' '}
							{format(endDate, 'MMM DD')}).
							<Button
								text="Edit Dates"
								naked
								onClick={e => {
									e.preventDefault();
									toggleEditingDates();
								}}
							/>
						</span>
					</WorkStudyDescription>

					{editingDates && (
						<div style={{ display: 'flex' }}>
							<DatePicker
								customInput={<Input style={{ marginRight: '1rem' }} />}
								name="startDate"
								selected={startDate}
								selectsStart
								startDate={startDate}
								endDate={startDate}
								minDate={parse(period.startDate)}
								maxDate={parse(period.endDate)}
								onChange={handleStartDateChange}
							/>

							<DatePicker
								customInput={<Input />}
								name="endDate"
								selected={endDate}
								selectsEnd
								startDate={startDate}
								endDate={endDate}
								minDate={parse(period.startDate)}
								maxDate={parse(period.endDate)}
								onChange={handleEndDateChange}
							/>
						</div>
					)}

					<p> Is this correct?</p>
					<ModalActions>
						<Mutation mutation={mutation} refetchQueries={() => ['User']}>
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
						</Mutation>

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
						)}

						<Button
							text="Cancel"
							onClick={e => {
								e.preventDefault();
								close();
							}}
						/>
					</ModalActions>
				</>
			)}
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

export default WorkStudyForm;
