import React, { useContext } from 'react';
import { format } from 'date-fns';
import { useQuery } from 'react-apollo-hooks';

import { PAY_PERIODS } from '../../../apollo/queries/payPeriod';
import {
	Form,
	FormControl,
	Select,
	Input,
} from '../../../styled/elements/Form';
import Button from '../../../styled/elements/Button';
import searchContext from './searchContext';

const SearchForm = () => {
	const context = useContext(searchContext);

	const { data: ppData } = useQuery(PAY_PERIODS, {
		variables: { year: parseInt(context.year, 10) },
	});

	const { payPeriods = [] } = ppData;

	if (payPeriods.length) {
		context.setPayPeriods(payPeriods);
		// Set initial pay period if not already set in context.
		if (!context.payPeriod) context.setPayPeriod(payPeriods[0]);
	}

	console.log('ctx:', context);

	const handleSubmit = async e => {
		e.preventDefault();
		context.setShowShifts(true);
	};

	const handleChange = async ({ target: { name, value } }) => {
		context.setShowShifts(false);

		switch (name) {
			case 'year':
				context.setYear(value);
				return;
			case 'payPeriod':
				const payPeriod = context.payPeriods.find(pp => pp.id === value);
				context.setPayPeriod(payPeriod);
				return;
			case 'department':
				context.setDepartment(
					context.departments.find(dept => dept.id === value)
				);
				return;
			default:
				return;
		}
	};

	const validateYear = year =>
		year.toString().match(/\d{4}/) && // Year is 4 digits
		parseInt(year, 10) > 1987 && // Year is > 1987
		parseInt(year, 10) < 2100; // Year is > 2100

	return (
		<Form onSubmit={handleSubmit}>
			<FormControl>
				<label>Calendar Year</label>
				<Input
					name="year"
					value={context.year}
					placeholder={new Date().getFullYear()}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<label>Pay Period</label>
				<Select
					name="payPeriod"
					onChange={handleChange}
					value={context.payPeriod ? context.payPeriod.id : ''}
					disabled={!validateYear(context.year)}
				>
					{context.payPeriods.length ? (
						context.payPeriods.map(opt => (
							<option key={opt.id} value={opt.id}>
								{opt.payPeriodId} ({format(opt.startDate, 'MMM DD')}) - (
								{format(opt.endDate, 'MMM DD')})
							</option>
						))
					) : (
						<option>No Pay Periods Found</option>
					)}
				</Select>
			</FormControl>

			<FormControl>
				<label>Department</label>
				<Select
					name="department"
					value={context.department ? context.department.id : ''}
					onChange={handleChange}
					disabled={!context.payPeriod}
				>
					{context.departments.length ? (
						context.departments.map(opt => (
							<option key={opt.id} value={opt.id}>
								{opt.name}
							</option>
						))
					) : (
						<option>No Departments Found</option>
					)}
				</Select>
			</FormControl>

			<FormControl>
				<Button
					type="submit"
					text="Search"
					color="success"
					style={{ marginLeft: 'auto' }}
				/>
			</FormControl>
		</Form>
	);
};

export default SearchForm;
