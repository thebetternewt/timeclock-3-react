import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { ME } from '../../../apollo/queries/user';
import Departments from '../../shared/departments/Departments';

const SupervisorDepartments = () => {
	const { data: meData } = useQuery(ME);

	let departments = [];

	if (meData.me) {
		departments = meData.me.supervisedDepartments;
	}

	return <Departments departments={departments} />;
};

export default SupervisorDepartments;
