import { createContext } from 'react';

export default createContext({
	employee: '',
	payPeriods: [],
	payPeriod: null,
	departments: [],
	department: null,
	shifts: [],
	supervisedDepartments: [],
	setEmployee: () => {},
	setPayPeriods: () => {},
	setPayPeriod: () => {},
	setDepartments: () => {},
	setDepartment: () => {},
	setShifts: () => {},
	fetchShifts: () => {},
});
