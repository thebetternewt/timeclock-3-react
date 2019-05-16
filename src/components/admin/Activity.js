import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import Box from '../../styled/layouts/Box';
import DepartmentSelect from '../shared/DepartmentSelect';
import EmployeesTable from './EmployeesTable';
import {
  DEPARTMENTS,
  USERS_BY_DEPARTMENT,
} from '../../apollo/queries/department';

const ActivityWrapper = () => {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState();

  const handleDeptChange = e =>
    setDepartment(departments.find(dept => dept.id === e.target.value));

  return (
    <Activity>
      <h1 className="title">Activity</h1>
      <Query query={DEPARTMENTS}>
        {({ data, loading }) => {
          if (data && data.departments) {
            console.log(data.departments);

            if (!department) {
              setDepartments(data.departments);
            }
          }

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
                    Clocked in employees: {clockedInEmployees.length}
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
