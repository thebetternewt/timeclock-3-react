import React from 'react';
import { Select } from '../../styled/elements/Form';

const DepartmentSelect = ({
  departments = [],
  value,
  handleChange,
  name = 'department',
}) => {
  let options = [
    <option key="none" value="">
      Choose Department
    </option>,
  ];

  if (!departments.length) {
    options = <option value="">No departments found.</option>;
  } else {
    options.push(
      departments.map(dept => (
        <option key={dept.id} value={dept.id}>
          {dept.name}
        </option>
      ))
    );
  }

  return (
    <Select name={name} value={value} onChange={handleChange}>
      {options}
    </Select>
  );
};

export default DepartmentSelect;
