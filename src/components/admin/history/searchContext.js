import { createContext } from 'react';

export default createContext({
  employee: '',
  payPeriods: [],
  payPeriod: null,
  departments: [],
  department: null,
  shifts: [],
  setEmployee: () => {},
  setPayPeriods: () => {},
  setPayPeriod: () => {},
  setDepartments: () => {},
  setDepartment: () => {},
  setShifts: () => {},
  fetchShifts: () => {},
});
