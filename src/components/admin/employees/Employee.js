import React, { useState } from 'react';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import { FaPlusCircle } from 'react-icons/fa';

import Box from '../../../styled/layouts/Box';
import Modal from '../../../styled/layouts/Modal';
import { Button } from '../../../styled/elements/Button';
import Tag from '../../../styled/elements/Tag';
import { List, ListHeader, Item } from '../../../styled/elements/List';
import Spinner from '../../../styled/elements/Spinner';
import { USER } from '../../../apollo/queries/user';
import { ADD_TO_DEPT, REMOVE_FROM_DEPT } from '../../../apollo/mutations/user';
import { Link } from '@reach/router';
import WorkStudyForm from './workstudy/WorkStudyForm';
import Container from '../../../styled/layouts/Container';
import { DEPARTMENTS } from '../../../apollo/queries/department';
import DepartmentSelect from '../../shared/DepartmentSelect';

const Employee = ({ employeeId }) => {
  const [workStudyModalOpen, setWorkStudyModalOpen] = useState(false);
  const [addingDepartment, setAddingDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedWorkStudy, setSelectedWorkStudy] = useState();

  const toggleAddingDepartment = () => setAddingDepartment(!addingDepartment);
  const toggleWorkStudyModal = () => setWorkStudyModalOpen(!workStudyModalOpen);

  const handleDepartmentSelect = e => setSelectedDepartment(e.target.value);
  const handleWorkStudySelect = ws => {
    console.log('selecting ws...');
    setSelectedWorkStudy(ws);
    console.log(selectedWorkStudy);
  };

  return (
    <div>
      <Query query={USER} variables={{ id: employeeId }} fetchPolicy="no-cache">
        {({ data, loading }) => {
          let user;
          if (loading) {
            return <Spinner size="100px" style={{ marginTop: '2rem' }} />;
          }
          if (data && data.user) {
            user = data.user;
          }

          if (!user) {
            return <EmployeeDetailBox>User Not Found.</EmployeeDetailBox>;
          }

          return (
            <Container direction="column">
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
                          <Mutation
                            mutation={REMOVE_FROM_DEPT}
                            variables={{ userId: user.id, deptId: dept.id }}
                            refetchQueries={() => ['User']}
                          >
                            {(remove, { loading }) => {
                              return (
                                <Button
                                  text="remove"
                                  color="danger"
                                  loading={loading}
                                  onClick={async () => {
                                    try {
                                      await remove();
                                    } catch (err) {
                                      console.log(err);
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

                {addingDepartment ? (
                  <EmployeeActionsWrapper>
                    <Query query={DEPARTMENTS}>
                      {({ data }) => {
                        let departments;

                        if (data && data.departments) {
                          departments = data.departments;
                        }

                        return (
                          <DepartmentSelect
                            departments={departments}
                            handleChange={handleDepartmentSelect}
                            value={selectedDepartment}
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
                                    userId: user.id,
                                    deptId: selectedDepartment,
                                  },
                                  refetchQueries: () => ['User'],
                                });
                                toggleAddingDepartment();
                                setSelectedDepartment('');
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
                      onClick={toggleAddingDepartment}
                      text="Cancel"
                    />
                  </EmployeeActionsWrapper>
                ) : (
                  <Button
                    color="success"
                    text={() => (
                      <>
                        <FaPlusCircle /> Add Department
                      </>
                    )}
                    style={{ marginTop: '1rem' }}
                    onClick={toggleAddingDepartment}
                  />
                )}
              </EmployeeDetailBox>

              {/* Workstudy */}
              <EmployeeDetailBox>
                <ListHeader>Workstudy</ListHeader>
                <List>
                  {user &&
                    user.workStudy.map(ws => (
                      <Item key={ws.id}>
                        <div style={{ flexGrow: 1 }}>
                          {ws.department.name} ({ws.period.name}{' '}
                          {ws.period.year})
                        </div>
                        <div>
                          <Button
                            text="view"
                            color="primary"
                            onClick={() => {
                              handleWorkStudySelect(ws);
                              toggleWorkStudyModal();
                            }}
                          />
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
                  onClick={toggleWorkStudyModal}
                />
              </EmployeeDetailBox>
              <EmployeeActionsWrapper>
                <Link to="edit">
                  <Button text="Edit Employee" color="primary" />
                </Link>
                <Button text="Deactivate Employee" color="danger" />
              </EmployeeActionsWrapper>
              {workStudyModalOpen && (
                <Modal
                  title={
                    selectedWorkStudy ? `Edit Work Study` : `Add Work Study`
                  }
                  close={toggleWorkStudyModal}
                >
                  <WorkStudyForm
                    employee={user}
                    departments={user.departments}
                    close={toggleWorkStudyModal}
                    workStudy={selectedWorkStudy}
                  />
                </Modal>
              )}
            </Container>
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

  select,
  button {
    margin-right: 1rem;
    min-width: 100px;
  }

  select {
    width: 200px;
  }
`;

export default Employee;
