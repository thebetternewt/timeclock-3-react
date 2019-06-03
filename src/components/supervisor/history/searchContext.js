import { createContext } from 'react';

export default createContext({
	employee: '',
	payPeriods: [],
	payPeriod: null,
	departments: [],
	department: null,
	supervisedDepts: [],
	supervisedDept: null,
	shifts: [],
	setEmployee: () => {},
	setPayPeriods: () => {},
	setPayPeriod: () => {},
	setDepartments: () => {},
	setDepartment: () => {},
	setShifts: () => {},
	fetchShifts: () => {},
	setSupervisedDepts: () => {},
	setSupervisedDept: () => {},
});
