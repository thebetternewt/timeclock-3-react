import React, { useState } from 'react';
import moment from 'moment';
import { Query } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';

import {
	Form,
	FormControl,
	Select,
	Input,
} from '../../../styled/elements/Form';
import Button from '../../../styled/elements/Button';
import { client } from '../../../apollo/client';
import { ME, USER_SHIFTS } from '../../../apollo/queries/user';
import { PAY_PERIODS } from '../../../apollo/queries/payPeriod';
import { USERS_BY_DEPARTMENT } from '../../../apollo/queries/department';
import Container from '../../../styled/layouts/Container';
import TimeSheet from './TimeSheet';
import DepartmentSelect from '../../shared/DepartmentSelect';
import EmployeeSelect from '../../shared/EmployeeSelect';

const TimeSheetForm = ({ admin = false, departments = [] }) => {
	const [year, setYear] = useState(moment().year());
	const [payPeriod, setPayPeriod] = useState();
	const [payPeriods, setPayPeriods] = useState([]);
	const [department, setDepartment] = useState();
	const [employees, setEmployees] = useState([]);
	const [employee, setEmployee] = useState();
	const [printing, setPrinting] = useState(false);
	const [me, setMe] = useState();

	const { data: meData } = useQuery(ME);
	if (meData.me && !me) {
		setMe(meData.me);
	}

	const validateYear = year =>
		year.toString().match(/\d{4}/) && // Year is 4 digits
		parseInt(year, 10) > 1987 && // Year is > 1987
		parseInt(year, 10) < 2100; // Year is > 2100

	const { data: ppData } = useQuery(PAY_PERIODS, {
		variables: { year: parseInt(year, 10) },
	});

	if (
		validateYear(year) && // valid year input
		ppData.payPeriods && // data received
		!payPeriods.length && // current payPeriods array empty
		ppData.payPeriods.length // new payPeriods array not empty
	) {
		setPayPeriods(ppData.payPeriods);
	}

	const allowSubmit = validateYear(year) && payPeriod && department;

	const handleSubmit = e => {
		e.preventDefault();
		setPrinting(true);
	};

	const handleChange = ({ target: { name, value } }) => {
		setPrinting(false);
		switch (name) {
			case 'year':
				setYear(value);
				setPayPeriods([]);
				return;
			case 'payPeriod':
				setPayPeriod(payPeriods.find(pp => pp.id === value));
				return;
			case 'department':
				const dept = departments.find(dept => dept.id === value);
				setDepartment(dept);
				fetchEmployees({ department: dept });
				return;
			case 'employee':
				setEmployee(employees.find(emp => emp.id === value));
				return;
			default:
				return;
		}
	};

	const fetchEmployees = async ({ department }) => {
		const { data } = await client.query({
			query: USERS_BY_DEPARTMENT,
			variables: {
				deptId: department && department.id,
			},
			fetchPolicy: 'no-cache',
		});

		setEmployees(data.deptUsers);
	};

	const employeeForSearch = () => {
		if (!admin) {
			return me;
		}

		return employee;
	};

	return (
		<Container direction="column">
			<div style={{ maxWidth: 400 }}>
				<Form onSubmit={handleSubmit}>
					<FormControl>
						<label>Calendar Year</label>
						<Input
							name="year"
							value={year}
							placeholder={new Date().getFullYear()}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl>
						<label>Pay Period</label>
						<Select
							name="payPeriod"
							key="payPeriod"
							onChange={handleChange}
							value={payPeriod ? payPeriod.id : ''}
							disabled={!validateYear(year)}
						>
							{payPeriods.length ? (
								<>
									<option value="">Select Pay Period</option>
									{payPeriods.map(opt => (
										<option key={opt.id} value={opt.id}>
											{opt.payPeriodId} (
											{moment(opt.startDate).format('MMM DD')} -{' '}
											{moment(opt.endDate).format('MMM DD')})
										</option>
									))}
								</>
							) : (
								<option>No Pay Periods Found</option>
							)}
						</Select>
					</FormControl>

					<FormControl>
						<label>Department</label>
						<DepartmentSelect
							departments={departments}
							value={department ? department.id : ''}
							handleChange={handleChange}
							disabled={!payPeriod}
						/>
					</FormControl>

					{me && me.admin && admin && (
						<FormControl>
							<label>Employee</label>
							<EmployeeSelect
								employees={employees}
								value={employee && employee.id}
								handleChange={handleChange}
								disabled={!department}
								includeAll
							/>
						</FormControl>
					)}

					<FormControl>
						<Button
							type="submit"
							text="Print"
							color={allowSubmit ? 'success' : 'default'}
							disabled={!allowSubmit}
							style={{ marginLeft: 'auto' }}
						/>
					</FormControl>
				</Form>

				{printing && (me || employee) && (
					<Query
						query={USER_SHIFTS}
						variables={{
							userId: employeeForSearch() ? employeeForSearch().id : '',
							deptId: department.id,
							startDate: moment(payPeriod.startDate)
								.startOf('Day')
								.toISOString(),
							endDate: moment(payPeriod.endDate)
								.endOf('Day')
								.toISOString(),
						}}
					>
						{({ data }) => {
							if (data && data.shifts) {
								let emps = [];

								if (!admin || employee) {
									// Only one employee
									const emp = employeeForSearch();
									emp.shifts = data.shifts;
									emps.push(emp);
								} else {
									// Multiple employees
									emps = employees.map(emp => ({
										...emp,
										shifts: data.shifts.filter(
											shift => shift.user.id === emp.id
										),
									}));
								}

								return (
									<TimeSheet
										employees={emps}
										payPeriod={payPeriod}
										department={department}
										endPrinting={() => setPrinting(false)}
									/>
								);
							}

							return null;
						}}
					</Query>
				)}
			</div>
		</Container>
	);
};

export default TimeSheetForm;
