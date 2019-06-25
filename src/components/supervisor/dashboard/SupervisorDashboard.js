import React, { useState } from 'react';
import { Link } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import Button from '../../../styled/elements/Button';
import Container from '../../../styled/layouts/Container';
import StackedBar from '../../shared/StackedBar';
import DepartmentSelect from '../../shared/DepartmentSelect';
import PrivateRoute from '../../shared/PrivateRoute';
import { ME } from '../../../apollo/queries/user';
import { DEPARTMENTS, DEPT_BUDGET } from '../../../apollo/queries/department';
import { sort } from '../../../util/arrays';
import { getFiscalYear } from '../../../util/helpers';

const SupervisorDashboard = ({ children, navigate, ...props }) => {
	const [departmentId, setDepartmentId] = useState();

	const { data: meData } = useQuery(ME);
	const { me } = meData;

	// Fetch all departments
	const { data: deptData } = useQuery(DEPARTMENTS);
	const { departments: allDepts = [] } = deptData;
	let departments = allDepts;

	const { data: budgetData } = useQuery(DEPT_BUDGET, {
		variables: { deptId: departmentId, fiscalYear: getFiscalYear() },
	});
	const { deptBudget } = budgetData;

	let amount = 0;
	let totalExpenditures = 0;
	let totalNightShiftExpenditures = 0;
	let totalWageExpenditures = 0;
	let totalWorkStudyExpenditures = 0;

	if (deptBudget) {
		amount = deptBudget.amount;
		totalExpenditures = deptBudget.summary.totalExpenditures;
		totalNightShiftExpenditures =
			deptBudget.summary.totalNightShiftExpenditures;
		totalWageExpenditures = deptBudget.summary.totalWageExpenditures;
		totalWorkStudyExpenditures = deptBudget.summary.totalWorkStudyExpenditures;
	}

	// If current user isn't admin (only supervisor),
	// then limit departments to supervised departments.
	if (me && !me.admin) {
		departments = me.supervisedDepartments;
	}

	// Sort departments by name
	departments = sort(departments, 'name');

	// If departments are fetched && no department set as selected,
	// then set first department as selected.
	if (departments.length > 0 && !departmentId) {
		const selectedDepartmentId = props['*'];
		if (selectedDepartmentId) {
			setDepartmentId(selectedDepartmentId);
			navigate(selectedDepartmentId);
		} else {
			setDepartmentId(departments[0].id);
			navigate(departments[0].id);
		}
	}

	const handleDeptChange = async e => {
		const deptId = e.target.value;
		setDepartmentId(deptId);
		navigate(`/supervisor/${deptId}`);
	};

	return (
		<>
			<Container direction="column">
				<h1 className="title">Dashboard</h1>
				<div style={{ display: 'flex', alignItems: 'flex-end' }}>
					<DepartmentSelectWrapper>
						<label>Department</label>
						<DepartmentSelect
							departments={departments}
							value={departmentId}
							handleChange={handleDeptChange}
						/>
					</DepartmentSelectWrapper>

					<Link to={`/departments/${departmentId}`}>
						<Button
							color="success"
							text="Manage Employees"
							style={{ marginLeft: '2rem' }}
							disabled={!departmentId}
						/>
					</Link>
				</div>
			</Container>
			<Container direction="column">
				<BudgetWrapper>
					<h2 className="section-title">Budget</h2>
					<StackedBar
						items={[
							{
								value: totalWageExpenditures / amount || 0,
								label: 'Wages',
							},
							{
								value: totalNightShiftExpenditures / amount || 0,
								label: 'Night Shift',
							},
							{
								value: totalWorkStudyExpenditures / amount || 0,
								label: 'Work Study',
							},
						]}
						baseLabel={
							deptBudget
								? () => (
										<>
											<NumberFormat
												displayType="text"
												thousandSeparator
												decimalScale={2}
												prefix="$"
												value={amount - totalExpenditures / 100}
											/>{' '}
											remaining
										</>
								  )
								: 'No budget found.'
						}
					/>
				</BudgetWrapper>
			</Container>

			<Container>{children}</Container>
		</>
	);
};

const DepartmentSelectWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
`;

const BudgetWrapper = styled.div`
	margin: 2rem 0;
	max-width: 600px;
`;

export default props => (
	<PrivateRoute {...props} component={SupervisorDashboard} />
);
