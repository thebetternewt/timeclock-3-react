import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Location } from '@reach/router';
import { Query, Mutation } from 'react-apollo';
import { useMutation } from 'react-apollo-hooks';
import NumberFormat from 'react-number-format';
import { format } from 'date-fns';
import { USER } from '../../../apollo/queries/user'

import { FaPlusCircle, FaTrashAlt, FaPencilAlt, FaTimes, FaCheck } from 'react-icons/fa';


import Box from '../../../styled/layouts/Box';
import ShiftModal from '../ShiftModal';
import WorkStudyModal from './workStudy/WorkStudyModal';
import { SUCCESS, DANGER, LIGHT_GRAY } from '../../../styled/utilities';
import Button from '../../../styled/elements/Button';
import { List, ListHeader, Item } from '../../../styled/elements/List';
import Spinner from '../../../styled/elements/Spinner';
import { ADD_TO_DEPT, REMOVE_FROM_DEPT, DEACTIVATE_USER, ACTIVATE_USER } from '../../../apollo/mutations/user';
import Container from '../../../styled/layouts/Container';
import { DEPARTMENTS } from '../../../apollo/queries/department';
import DepartmentSelect from '../DepartmentSelect';
import History from '../history/History'

const Employee = ({employeeId}) => {
  const [workStudyModalOpen, setWorkStudyModalOpen] = useState(false);
  const [addingDepartment, setAddingDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedWorkStudy, setSelectedWorkStudy] = useState();
  const [addShiftModalOpen, setAddShiftModalOpen] = useState(false);
  const [activateLoading, setActivateLoading] = useState(false)

  const deactivate = useMutation(DEACTIVATE_USER, {refetchQueries: () => ['User']})
  const activate = useMutation(ACTIVATE_USER, {refetchQueries: () => ['User']})

  const toggleAddingDepartment = () => setAddingDepartment(!addingDepartment);
  const toggleWorkStudyModal = () => setWorkStudyModalOpen(!workStudyModalOpen);
  const toggleAddShiftModal = () => setAddShiftModalOpen(!addShiftModalOpen);

  const handleDepartmentSelect = e => setSelectedDepartment(e.target.value);
  const handleWorkStudySelect = ws => setSelectedWorkStudy(ws);

  return (
    <Location>
      {({location}) => {
        const admin = !!location.pathname.match("admin")
        const supervisor = !!location.pathname.match("supervisor")


        return (
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

          console.log(user);
          return (
            <Container direction="column">
                <h1 className="title">{user.name}</h1>
              <Container >
                <EmployeeDetail>
                <DetailColumn>
                  <div>NetID: {user.netId}</div>
                  <div>Student ID: {user.nineDigitId.slice(0,3)}-{user.nineDigitId.slice(3,6)}-{user.nineDigitId.slice(6,9)} </div>
                  <div>email: {user.email}</div>

                  <div className="status-indicator" style={{marginTop: '1rem'}}>
                    {user.active ? <FaCheck color={SUCCESS}/> : <FaTimes color={DANGER}/>}
                      Active
                  </div>

                  <div className="status-indicator" >
                    {user.admin ? <FaCheck color={SUCCESS}/> : <FaTimes color={DANGER}/>}
                      Admin
                  </div>

                </DetailColumn>
              </EmployeeDetail>
                <EmployeeActionsWrapper>
                <Link to="edit">
                  <Button text="Edit Employee" color="primary" />
                </Link>


                {(admin || supervisor && !user.active) && 
                <Button 
                text={user.active ? "Deactivate Employee" : 'Activate Employee'}
                color="danger"
                loading={activateLoading}
                onClick={
                  async () => {
                    const variables = {netId: user.netId}
                    setActivateLoading(true)
                    
                    if (user.active) {
                      await deactivate({variables})
                    } else {
                      await activate ({variables})
                    }
                    setActivateLoading(false)
                  }
                }
                />
              }

                <Button
                  text="Add Shift"
                  color="success"
                  onClick={toggleAddShiftModal}
                  />
              </EmployeeActionsWrapper>
              </Container>

              <div>
                <div className="divider" />
                <h2 className="section-title">History</h2>
                <History employee={user} />
              </div>

              {/* Departments */}
              {admin && 
                <div>
                  <div className="divider" />
                  <h2 className="section-title">Departments</h2>
                  <EmployeeDetailBox>
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
                                  text={() => <FaTrashAlt />}
                                  color="danger"
                                  invert
                                  naked
                                  loading={loading}
                                  onClick={async () => {
                                    try {
                                      await remove();
                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }}
                                  style={{fontSize: '1.2rem', color: DANGER}}
                                  />
                                  );
                                }}
                            </Mutation>
                          </div>
                        </Item>
                      ))}
                  </List>

                  {addingDepartment ? (
                    <ActionsWrapper>
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
                    </ActionsWrapper>
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
                </div>
              }

              {/* Workstudy */}
              <div>
                <div className="divider" />
                <h2 className="section-title">Work Study</h2>
                <EmployeeDetailBox>
                <ListHeader>Workstudy</ListHeader>
                <List>
                  {user &&
                    user.workStudy.map(ws => (
                      <WorkStudyItem key={ws.id}>
                      <div className="detail">
                    <div className="department">
                      {ws.department.name}
                    </div>
                    <div className="period">
                    <span style={{fontWeight: 'bold'}}>{ws.period.name} {ws.period.year}</span>
                      <br />
                     {format(ws.startDate, 'MMM DD')} -{' '}
                      {format(ws.endDate, 'MMM DD')}
                    </div>
                  </div>
                  <div className="amount"> <NumberFormat displayType='text' thousandSeparator prefix='$' value = {ws.amount} /> </div>
                  
                  
                        <div className="actions">
                          <Button
                            text={() => <FaPencilAlt />}
                            naked
                            small
                            onClick={() => {
                              handleWorkStudySelect(ws);
                              toggleWorkStudyModal();
                            }}
                            />
                        </div>
                            </WorkStudyItem>
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
                  onClick={() => {
                    setSelectedWorkStudy(null);
                    toggleWorkStudyModal();
                  }}
                  />
              </EmployeeDetailBox>
              </div>
              {workStudyModalOpen &&
                <WorkStudyModal
                  close={toggleWorkStudyModal}
                  employee={user}
                  departments={user.departments}
                  workStudy={selectedWorkStudy}
                />
              }

              {addShiftModalOpen && (
                <ShiftModal employee={user} close={toggleAddShiftModal} />
                )}
            </Container>
          );
        }}
      </Query>
      )}}
    </Location>
  );
};

const EmployeeDetail = styled.div`
  display: flex;
  flex-basis: 50%;
  margin-bottom: 2rem;
`;

const Marker = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: ${({color}) => color};
  border-radius: 100px;
  margin-right: 0.6rem;
`;

const DetailColumn = styled.div`
  .status-indicator {
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.6rem;
    }
  }

  > * {
    margin: 0.3rem 0;
  }
`;

const EmployeeDetailBox = styled(Box)`
  margin: 2rem 0;
`;

const EmployeeActionsWrapper = styled.div`
  flex-basis: 50%;
  margin: 0 0 2rem;

  button {
    display: block;
    width: 200px;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  margin: 0 0 2rem;

  select,
  button {
    margin-right: 1rem;
    min-width: 100px;
  }

  select {
    width: 200px;
  }
`;

const WorkStudyItem = styled(Item)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	background-color: ${LIGHT_GRAY};
	color: #000;

	margin: 5px 0;
	padding: 8px 15px;
	border-radius: 3px;

	.detail {
		flex-basis: 220px;
	}

	.department {
		font-weight: 500;
		color: #333;
    margin-bottom: 0.2rem;
	}

	.period {
		color: #555;
		font-size: 0.8em;
	}

	.amount {
		margin-left: 1.3rem;
	}

	.actions {
		margin-left: auto;
	}
`;

export default Employee;
