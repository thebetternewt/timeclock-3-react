import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import Box from '../../styled/layouts/Box';
import DepartmentSelect from '../shared/DepartmentSelect';
import EmployeesTable from './EmployeesTable';
import { FormControl } from '../../styled/elements/Form';
import {
  DEPARTMENTS,
  USERS_BY_DEPARTMENT,
} from '../../apollo/queries/department';

const ActivityWrapper = () => {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState();

  const handleDeptChange = e =>
    setDepartment(departments.find(dept => dept.id === e.target.value));
  console.log(department);

  return (
    <Activity>
      <div className="title">Activity</div>
      <Query query={DEPARTMENTS}>
        {({ data, loading }) => {
          if (data && data.departments) {
            console.log(data.departments);

            if (!department) {
              setDepartments(data.departments);
            }
          }

          console.log('depts:', departments);

          return (
            <div className="department-select">
              <label>Department</label>
              <DepartmentSelect
                departments={departments}
                value={department ? department.id : ''}
                handleChange={handleDeptChange}
              />
            </div>
          );
        }}
      </Query>
      {department && (
        <Query
          query={USERS_BY_DEPARTMENT}
          variables={{ deptId: department.id }}
        >
          {({ data }) => {
            let employees = [];
            let clockedInEmployees = [];

            if (data && data.usersByDepartment) {
              console.log(data);

              employees = data.usersByDepartment;

              // Filter for employees who are clocked into the currently selected
              // department.
              clockedInEmployees = employees.filter(
                emp =>
                  emp.isClockedIn &&
                  emp.lastShift.department.id === department.id
              );
            }
            return (
              <>
                <div className="employee-count">
                  Employee Count: {employees.length}
                </div>
                <Box>
                  <div className="heading">
                    Active Employees: {clockedInEmployees.length}
                  </div>
                  <EmployeesTable employees={clockedInEmployees} />
                </Box>
              </>
            );
          }}
        </Query>
      )}
    </Activity>
  );
};

const Activity = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;

  .title {
    text-transform: uppercase;
    opacity: 0.6;
    margin-bottom: 1em;
  }

  .department-select {
    display: flex;
    flex-direction: column;
    width: 400px;
  }

  .employee-count {
    opacity: 0.7;
    margin-bottom: 0.3em;
    font-weight: 400;
    font-size: 1rem;
    margin: 1rem 0 2rem;
  }

  .heading {
    text-transform: uppercase;
    opacity: 0.7;
    margin-bottom: 0.3em;
    font-weight: 400;
    font-size: 1rem;
    margin: 0;
  }
`;

export default ActivityWrapper;
