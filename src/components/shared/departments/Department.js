import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Match } from '@reach/router';
import { Query, Mutation } from 'react-apollo';
import { FaPlusCircle } from 'react-icons/fa';

import Box from '../../../styled/layouts/Box';
import Container from '../../../styled/layouts/Container';
import Button from '../../../styled/elements/Button';
import { List, ListHeader, Item } from '../../../styled/elements/List';
import Spinner from '../../../styled/elements/Spinner';
import { DEPARTMENT } from '../../../apollo/queries/department';
import EmployeeSelect from '../../shared/EmployeeSelect';
import { USERS, ME } from '../../../apollo/queries/user';
import {
  ADD_SUPERVISOR_TO_DEPT,
  REMOVE_SUPERVISOR_FROM_DEPT,
  REMOVE_FROM_DEPT,
  ADD_TO_DEPT,
} from '../../../apollo/mutations/user';
import {sortUsers} from '../../../util/arrays' 
import { useQuery } from 'react-apollo-hooks';

const Department = ({ departmentId }) => {
  const [addingSupervisor, setAddingSupervisor] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [addingEmployee, setAddingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');


  const toggleAddingSupervisor = () => setAddingSupervisor(!addingSupervisor);
  const toggleAddingEmployee = () => setAddingEmployee(!addingEmployee);

  const handleSupervisorSelect = e => setSelectedSupervisor(e.target.value);
  const handleEmployeeSelect = e => setSelectedEmployee(e.target.value);

  const {data: meData} = useQuery(ME);
  const {me = {}} = meData;
  const {admin, supervisor} = me;

  return (
    
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
            <Container direction="column">
              <h1 className="title">{department && department.name}</h1>
              {/* Supervisors */}
              {admin && <DepartmentDetailBox>
                <ListHeader>Supervisors</ListHeader>
                <List>
                  {department &&
                    sortUsers(department.supervisors, 'lastName').map(sup => (
                      <Item key={sup.id}>
                        <div>
                          {sup.lastName}, {sup.firstName} ({sup.netId})
                        </div>
                        <div>
                          <Mutation mutation={REMOVE_SUPERVISOR_FROM_DEPT}>
                            {(remove, { loading }) => {
                              return (
                                <Button
                                  text="remove"
                                  color="danger"
                                  loading={loading}
                                  onClick={async () => {
                                    if (window.confirm(`Are you sure you want to remove ${sup.name} from supervising ${department.name}?`)) { 
                                    try {
                                        await remove({
                                          variables: {
                                            userId: sup.id,
                                            deptId: departmentId,
                                          },
                                          refetchQueries: () => ['Department'],
                                        });
                                      } catch (err) {
                                        console.log(err);
                                      }
                                    }
                                    }}
                                />
                              );
                            }}
                          </Mutation>
                        </div>
                      </Item>
                    ))}
                </List>

                {addingSupervisor ? (
                  <DepartmentActionsWrapper>
                    <Query query={USERS}>
                      {({ data }) => {
                        let users;

                        if (data && data.users) {
                          users = data.users;
                        }

                        return (
                          <EmployeeSelect
                            employees={users}
                            handleChange={handleSupervisorSelect}
                            value={selectedSupervisor}
                          />
                        );
                      }}
                    </Query>
                    <Mutation mutation={ADD_SUPERVISOR_TO_DEPT}>
                      {(addToDepartment, { loading }) => {
                        return (
                          <Button
                            color="success"
                            onClick={async () => {
                              try {
                                await addToDepartment({
                                  variables: {
                                    userId: selectedSupervisor,
                                    deptId: departmentId,
                                  },
                                  refetchQueries: () => ['Department'],
                                });
                                toggleAddingSupervisor();
                                setSelectedSupervisor('');
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                            text="Add"
                          />
                        );
                      }}
                    </Mutation>
                    <Button
                      color="danger"
                      onClick={toggleAddingSupervisor}
                      text="Cancel"
                    />
                    
                  </DepartmentActionsWrapper>
                ) : (
                  <Button
                    color="success"
                    text={() => (
                      <>
                        <FaPlusCircle /> Add Supervisor
                      </>
                    )}
                    style={{ marginTop: '1rem' }}
                    onClick={toggleAddingSupervisor}
                  />
                )}
              </DepartmentDetailBox>}

              {/* Employees */}
              <DepartmentDetailBox>
                <ListHeader>Employees</ListHeader>
                <List>
                  {department &&
                    sortUsers(department.users, 'lastName')
                    .map(user => (
                      <Item key={user.id}>
                        <div>
                        {user.lastName}, {user.firstName} ({user.netId})
                        </div>
                        <div>
                          <Mutation mutation={REMOVE_FROM_DEPT}>
                            {(remove, { loading }) => {
                              return (
                                <Button
                                  text="remove"
                                  color="danger"
                                  loading={loading}
                                  onClick={async () => {
                                    if (window.confirm(`Are you sure you want to remove ${user.name} from ${department.name}?`)) { 
                                    try {

                                      await remove({
                                        variables: {
                                          userId: user.id,
                                          deptId: departmentId,
                                        },
                                        refetchQueries: () => ['Department'],
                                      });
                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }
                                  }}
                                />
                              );
                            }}
                          </Mutation>
                          
                          <Link to={`../../employees/${user.id}`}>
                          <Button 
                          text="view"
                          color="primary"
                          loading={loading}
                          style={{marginRight: '1rem'}}
                          />
                          </Link>


                        </div>
                      </Item>
                    ))}
                </List>

                {addingEmployee ? (
                  <DepartmentActionsWrapper>
                    <Query query={USERS}>
                      {({ data }) => {
                        let users;

                        if (data && data.users) {
                          users = data.users;
                        }

                        return (
                          <EmployeeSelect
                            employees={users}
                            handleChange={handleEmployeeSelect}
                            value={selectedEmployee}
                          />
                        );
                      }}
                    </Query>
                    <Mutation mutation={ADD_TO_DEPT}>
                      {(addToDepartment, { loading }) => {
                        return (
                          <Button
                            color="success"
                            onClick={async () => {
                              try {
                                await addToDepartment({
                                  variables: {
                                    userId: selectedEmployee,
                                    deptId: departmentId,
                                  },
                                  refetchQueries: () => ['Department'],
                                });
                                toggleAddingEmployee();
                                setSelectedEmployee('');
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                            text="Add"
                          />
                        );
                      }}
                    </Mutation>
                    <Button
                      color="danger"
                      onClick={toggleAddingEmployee}
                      text="Cancel"
                    />
                    <Link to="../../employees/new">
                    <Button
                    color="primary"
                    text="Create New Employee" 
                    /></Link>
                  </DepartmentActionsWrapper>
                ) : (
                  <Button
                    color="success"
                    text={() => (
                      <>
                        <FaPlusCircle /> Add Employee
                      </>
                    )}
                    style={{ marginTop: '1rem' }}
                    onClick={toggleAddingEmployee}
                  />
                )}
              </DepartmentDetailBox>

              {admin && <DepartmentActionsWrapper>
                <Link to="edit">
                  <Button text="Edit Department" color="primary" />
                </Link>
              </DepartmentActionsWrapper>}
            </Container>
          );
        }}
      </Query>
  );
};

const DepartmentDetailBox = styled(Box)`
  margin-bottom: 2rem;
`;

const DepartmentActionsWrapper = styled.div`
  display: flex;

  select,
  button {
    margin-right: 1rem;
    min-width: 100px;
  }
`;

export default Department;
