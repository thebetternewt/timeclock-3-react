import React from 'react';
import { Select } from '../../styled/elements/Form';

const DepartmentSelect = ({
  departments = [],
  value,
  handleChange,
  name = 'department',
}) => {
  let options = [];

  if (!departments.length) {
    options = <option value="">No departments found.</option>;
  } else {
    options = departments.map(dept => (
      <option key={dept.id} value={dept.id}>
        {dept.name}
      </option>
    ));
  }

  return (
    <Select name={name} value={value} onChange={handleChange}>
      <option value="">Choose Department</option>
      {options}
    </Select>
  );
};

export default DepartmentSelect;
