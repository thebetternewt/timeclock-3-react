import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import TimeSheets from '../../shared/timeSheets/TimeSheets';
import { ME } from '../../../apollo/queries/user';

const EmployeeTimeSheets = () => {
	const { data: meData } = useQuery(ME);

	let departments = [];

	if (meData.me) {
		departments = meData.me.departments;
	}

	return <TimeSheets departments={departments} />;
};

export default EmployeeTimeSheets;
