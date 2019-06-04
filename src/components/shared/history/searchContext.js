import { createContext } from 'react';

export default createContext({
	employeeId: '',
	year: new Date().getFullYear(),
	payPeriods: [],
	payPeriod: null,
	departments: [],
	department: null,
	shifts: [],
	showShifts: false,
	setEmployeeId: () => {},
	setYear: () => {},
	setPayPeriods: () => {},
	setPayPeriod: () => {},
	setDepartments: () => {},
	setDepartment: () => {},
	setShifts: () => {},
	fetchShifts: () => {},
	setShowShifts: () => {},
});
