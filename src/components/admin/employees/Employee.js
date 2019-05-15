import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { FaPlusCircle } from 'react-icons/fa';

import Box from '../../../styled/layouts/Box';
import { Button } from '../../../styled/elements/Button';
import Tag from '../../../styled/elements/Tag';
import { List, ListHeader, Item } from '../../../styled/elements/List';
import Spinner from '../../../styled/elements/Spinner';
import { USER } from '../../../apollo/queries/user';
import { Link } from '@reach/router';

const Employee = ({ employeeId }) => {
  return (
    <div>
      <Query query={USER} variables={{ id: employeeId }} fetchPolicy="no-cache">
        {({ data, loading }) => {
          let user;
          if (loading) {
            return <Spinner size="100px" style={{ marginTop: '2rem' }} />;
          }
          if (data && data.user) {
            console.log(data.user);
            user = data.user;
          }

          if (!user) {
            return <EmployeeDetailBox>User Not Found.</EmployeeDetailBox>;
          }

          return (
            <>
              <EmployeeDetail>
                <DetailColumn>
                  <div>First Name: {user.firstName}</div>
                  <div>Last Name: {user.lastName}</div>
                  <div>NetID: {user.netId}</div>
                  <div>Student ID: {user.nineDigitId}</div>
                  <div>email: {user.email}</div>
                </DetailColumn>
                <DetailColumn>
                  {user.admin && <Tag color="danger">Admin</Tag>}
                  {user.active && <Tag color="success">Active</Tag>}
                </DetailColumn>
              </EmployeeDetail>
              {/* Departments */}
              <EmployeeDetailBox>
                <ListHeader>Departments</ListHeader>
                <List>
                  {user &&
                    user.departments.map(dept => (
                      <Item key={dept.id}>
                        <div>{dept.name}</div>
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
                      <FaPlusCircle /> Add Department
                    </>
                  )}
                  style={{ marginTop: '1rem' }}
                />
              </EmployeeDetailBox>

              {/* Workstudy */}
              <EmployeeDetailBox>
                <ListHeader>Workstudy</ListHeader>
                <List>
                  {user &&
                    user.departments.map(dept => (
                      <Item key={dept.id}>
                        <div>{dept.name}</div>
                        <div>
                          <Button text="edit" color="primary" />
                        </div>
                      </Item>
                    ))}
                </List>
                <Button
                  color="success"
                  text={() => (
                    <>
                      <FaPlusCircle /> Add Workstudy
                    </>
                  )}
                  style={{ marginTop: '1rem' }}
                />
              </EmployeeDetailBox>
              <EmployeeActionsWrapper>
                <Link to="edit">
                  <Button text="Edit Employee" color="primary" />
                </Link>
                <Button text="Deactivate Employee" color="danger" />
              </EmployeeActionsWrapper>
            </>
          );
        }}
      </Query>
    </div>
  );
};

const EmployeeDetail = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const DetailColumn = styled.div`
  padding: 0 1rem;

  > * {
    margin: 0.3rem 0;
  }
`;

const EmployeeDetailBox = styled(Box)`
  margin-bottom: 2rem;
`;

const EmployeeActionsWrapper = styled.div`
  display: flex;

  button {
    margin-right: 1rem;
  }
`;

export default Employee;
