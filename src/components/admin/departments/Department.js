import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { FaPlusCircle } from 'react-icons/fa';

import Box from '../../../styled/layouts/Box';
import { Button } from '../../../styled/elements/Button';
import { List, ListHeader, Item } from '../../../styled/elements/List';
import Spinner from '../../../styled/elements/Spinner';
import { DEPARTMENT } from '../../../apollo/queries/department';

const Department = ({ departmentId }) => {
  return (
    <div>
      <Query
        query={DEPARTMENT}
        variables={{ id: departmentId }}
        fetchPolicy="no-cache"
      >
        {({ data, loading }) => {
          let department;
          if (loading) {
            return <Spinner size="100px" style={{ marginTop: '2rem' }} />;
          }
          if (data && data.department) {
            department = data.department;
          }

          return (
            <>
              {/* Supervisors */}
              <DepartmentDetailBox>
                <ListHeader>Supervisors</ListHeader>
                <List>
                  {department &&
                    department.supervisors.map(sup => (
                      <Item key={sup.id}>
                        <div>
                          {sup.name} ({sup.netId})
                        </div>
                        <div>
                          <Button text="remove" color="danger" />
                        </div>
                      </Item>
                    ))}
                </List>

                <Button
                  color="success"
                  text={() => (
                    <>
                      <FaPlusCircle /> Add Supervisor
                    </>
                  )}
                  style={{ marginTop: '1rem' }}
                />
              </DepartmentDetailBox>

              {/* Employees */}
              <DepartmentDetailBox>
                <ListHeader>Employees</ListHeader>
                <List>
                  {department &&
                    department.users.map(user => (
                      <Item key={user.id}>
                        <div>
                          {user.name} ({user.netId})
                        </div>
                        <div>
                          <Button text="remove" color="danger" />
                        </div>
                      </Item>
                    ))}
                </List>

                <Button
                  color="success"
                  text={() => (
                    <>
                      <FaPlusCircle /> Add Employee
                    </>
                  )}
                  style={{ marginTop: '1rem' }}
                />
              </DepartmentDetailBox>

              <DepartmentActionsWrapper>
                <Button text="Edit Department" color="primary" />
                <Button text="Deactivate Department" color="danger" />
              </DepartmentActionsWrapper>
            </>
          );
        }}
      </Query>
    </div>
  );
};

const DepartmentDetailBox = styled(Box)`
  margin-bottom: 2rem;
`;

const DepartmentActionsWrapper = styled.div`
  display: flex;

  button {
    margin-right: 1rem;
  }
`;

export default Department;
