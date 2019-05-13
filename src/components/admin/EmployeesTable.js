import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Box from '../../styled/layouts/Box';
import { LIGHT_GRAY, GRAY4, DANGER } from '../../styled/utilities/Colors';
import { Button } from '../../styled/elements/Button';
import { Mutation } from 'react-apollo';

const Employees = ({ employees }) => {
  // TODO: Clock out employee on button click. Need to setup special resolver for admins only.

  return (
    <EmployeesTable>
      <EmployeeList>
        <EmployeeListHeader>
          <div>Name</div>
          <div>Hours Elapsed</div>
          <div />
        </EmployeeListHeader>
        {employees.map(emp => {
          return (
            <EmployeeItem key={emp.id}>
              <div>{emp.name}</div>
              <div>
                {/* Hours elapsed since clock in. */}
                {(
                  moment().diff(moment(emp.lastShift.timeIn)) /
                  1000 /
                  60 /
                  60
                ).toFixed(2)}
              </div>
              <div>
                <Button color="danger" text="clock out" />
              </div>
            </EmployeeItem>
          );
        })}
      </EmployeeList>
    </EmployeesTable>
  );
};

const EmployeesTable = styled(Box)`
  width: 100%;
`;

const EmployeeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const EmployeeListHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 8px 15px;
  border-bottom: 3px solid ${GRAY4};
  margin-bottom: 0.8rem;

  > div {
    flex-basis: 30%;
  }
`;

const EmployeeItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center
  background-color: ${LIGHT_GRAY};
  color: #000;

  margin: 5px 0;
  padding: 8px 15px;
  border-radius: 3px;

  > div {
    flex-basis: 30%;
  }

  button {
    float: right;
  }
`;

export default Employees;
