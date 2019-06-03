import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { DEPARTMENTS } from '../../../apollo/queries/department';
import Departments from '../../shared/departments/Departments';

const AdminDepartments = () => {
	const { data: deptData } = useQuery(DEPARTMENTS);

	let departments = [];

	if (deptData.departments) {
		departments = deptData.departments;
	}

	return <Departments departments={departments} />;
};

export default AdminDepartments;
