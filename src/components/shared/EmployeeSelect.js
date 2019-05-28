import React from 'react';
import { Select } from '../../styled/elements/Form';

const EmployeeSelect = ({
  employees = [],
  value,
  handleChange,
  name = 'employee',
  disabled = false,
  includeAll = false,
}) => {
  let options = [];

  if (!employees.length) {
    options = <option value="">No employees found.</option>;
  } else {
    options = employees.map(emp => (
      <option key={emp.id} value={emp.id}>
        {emp.name} ({emp.netId})
      </option>
    ));
  }

  return (
    <Select
      name={name}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    >
      <option value="">Choose Employee</option>
      {includeAll && <option value="all">All</option>}
      {options}
    </Select>
  );
};

export default EmployeeSelect;
