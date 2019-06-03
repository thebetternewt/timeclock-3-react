import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import TimeSheetForm from '../../timeSheets/TimeSheetForm';
import { DEPARTMENTS } from '../../../apollo/queries/department';

const TimeSheets = () => {
	const { data: deptData } = useQuery(DEPARTMENTS);

	let departments = [];

	if (deptData.departments) {
		departments = deptData.departments;
	}

	return <TimeSheetForm admin={true} departments={departments} />;
};

export default TimeSheets;
