import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import TimeSheets from '../../shared/timeSheets/TimeSheets';
import { ME } from '../../../apollo/queries/user';

const SupervisorTimeSheets = () => {
	const { data: meData } = useQuery(ME);
	const { me } = meData;

	let departments = [];

	if (me) {
		departments = meData.me.supervisedDepartments;
	}

	return <TimeSheets admin={true} departments={departments} />;
};

export default SupervisorTimeSheets;
