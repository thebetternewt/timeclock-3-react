import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import Employees from '../../shared/employees/Employees';
import { USERS } from '../../../apollo/queries/user';

const AdminEmployees = () => {
	const { data: employeeData } = useQuery(USERS);

	let employees = [];

	if (employeeData.users) {
		employees = employeeData.users;
	}

	return <Employees employees={employees} />;
};

export default AdminEmployees;
