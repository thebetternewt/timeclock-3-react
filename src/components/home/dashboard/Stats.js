import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import Spinner from '../../../styled/elements/Spinner';

const StatsWrapper = ({ payPeriod = {}, shifts = [], loading }) => {
	// Get department Ids from shifts array.
	const departments = shifts.reduce((acc, shift) => {
		const dept = shift.department;
		if (!acc.find(d => d.id === dept.id)) {
			acc.push(dept);
		}
		return acc;
	}, []);

	/*
     Transform department ids array to object with keys pertaining to each
     dept, like so:
    
     {
       "1": {
         dept: { ...dept1Details },
         shifts: [],
         totalMinutesElapsed: 0
       },
       "2": {
         .dept: { ...dept2Details },
         shifts: [],
         totalMinutesElapsed: 0
       },
     }
   */
	const shiftsByDepartment = departments.reduce((deptObj, dept) => {
		deptObj[dept.id] = { dept, shifts: [], totalMinutesElapsed: 0 };
		return deptObj;
	}, {});

	// Iterate through shifts array and push each shift onto shifts array for
	// corresponding department
	shifts.forEach(shift => {
		shiftsByDepartment[shift.department.id].shifts.push(shift);
	});

	// Iterate through shiftsByDepartment object and update total minutes elapsed.
	Object.keys(shiftsByDepartment).forEach(deptId => {
		const shifts = shiftsByDepartment[deptId].shifts;

		const totalMinutesElapsed = shifts.reduce(
			(total, shift) => (total += shift.minutesElapsed),
			0
		);

		shiftsByDepartment[deptId].totalMinutesElapsed = totalMinutesElapsed;
	});

	// Calculate total minutes elapsed for entire pay period across all departments.
	const totalMinutes = Object.keys(shiftsByDepartment).reduce(
		(total, deptId) => {
			return (total += shiftsByDepartment[deptId].totalMinutesElapsed);
		},
		0
	);

	// Create list items for department totals.
	const departmentTotals = Object.keys(shiftsByDepartment).map(deptId => (
		<li key={deptId}>
			{shiftsByDepartment[deptId].dept.name}:{' '}
			{(shiftsByDepartment[deptId].totalMinutesElapsed / 60).toFixed(2)} hours
		</li>
	));

	const stats = (
		<>
			<div className="title">Current Pay Period</div>
			<div className="date">
				{`${format(payPeriod.startDate, 'MMM D')} - ${format(
					payPeriod.endDate,
					'MMM D'
				)}`}
			</div>
			<div className="total">{(totalMinutes / 60).toFixed(2)} hours</div>
			<div className="departments">
				<ul>{departmentTotals}</ul>
			</div>
		</>
	);
	return (
		<Stats>
			{loading ? <Spinner size="60px" style={{ marginTop: '3rem' }} /> : stats}
		</Stats>
	);
};

export default StatsWrapper;

const Stats = styled.div`
	flex-basis: 50%;
	display: flex;
	flex-direction: column;

	.title {
		text-transform: uppercase;
		opacity: 0.6;
	}

	.date {
		font-size: 1.5rem;
	}

	.total {
		font-size: 4rem;
		font-weight: 600;
		margin: 1rem 0 0;
	}

	.departments {
		opacity: 0.7;
		font-size: 1.2em;

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}
	}
`;
