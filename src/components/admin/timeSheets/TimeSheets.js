import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import TimeSheets from '../../shared/timeSheets/TimeSheets';
import { DEPARTMENTS } from '../../../apollo/queries/department';

const AdminTimeSheets = () => {
	const { data: deptData } = useQuery(DEPARTMENTS);

	const { departments = [] } = deptData;

	return <TimeSheets admin={true} departments={departments} />;
};

export default AdminTimeSheets;
