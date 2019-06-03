import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import TimeSheetForm from '../../timeSheets/TimeSheetForm';
import { ME } from '../../../apollo/queries/user';

const TimeSheets = () => {
	const { data: meData } = useQuery(ME);

	let departments = [];

	if (meData.me) {
		departments = meData.me.departments;
	}

	return <TimeSheetForm departments={departments} />;
};

export default TimeSheets;
