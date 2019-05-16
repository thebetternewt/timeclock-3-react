import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import moment from 'moment';

import Timer from './Timer';
import Box from '../../styled/layouts/Box';
import { Form } from '../../styled/elements/Form';
import { Button } from '../../styled/elements/Button';
import { Query, Mutation } from 'react-apollo';
import { ME } from '../../apollo/queries/user';
import { CLOCK_IN, CLOCK_OUT } from '../../apollo/mutations/user';
import DepartmentSelect from '../shared/DepartmentSelect';

const ShiftClock = () => {
  return (
    <ShiftClockContainer>
      <Query query={ME}>
        {({ data }) => {
          if (data && data.me) {
            const { me } = data;
            console.log(me);

            const { departments } = me;
            if (me.isClockedIn) {
              const { lastShift } = me;
              const secondsElapsed =
                moment().diff(moment(lastShift.timeIn)) / 1000;

              return (
                <>
                  <div className="title">Currently clocked into</div>
                  <div className="department">{lastShift.department.name}</div>
                  <Timer secondsElapsed={secondsElapsed} />
                  <Mutation
                    mutation={CLOCK_OUT}
                    refetchQueries={() => ['Me', 'MyShifts']}
                  >
                    {(clockOut, { loading: clockOutLoading }) => {
                      return (
                        <>
                          <Button
                            onClick={async () => {
                              try {
                                await clockOut();
                              } catch (e) {
                                console.log(e);
                              }
                            }}
                            loading={clockOutLoading}
                            text="Clock Out"
                            color="danger"
                            disabled={clockOutLoading}
                          />
                        </>
                      );
                    }}
                  </Mutation>
                </>
              );
            }

            return (
              <Mutation mutation={CLOCK_IN} refetchQueries={() => ['Me']}>
                {(clockIn, { loading }) => {
                  // TODO: Handle error.
                  return (
                    <Formik
                      initialValues={{ deptId: '' }}
                      onSubmit={async values => {
                        try {
                          await clockIn({
                            variables: values,
                          });
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      {({ handleSubmit, handleChange, values }) => {
                        return (
                          <Form onSubmit={handleSubmit}>
                            <DepartmentSelect
                              departments={departments}
                              value={values.deptId}
                              handleChange={handleChange}
                              name="deptId"
                            />

                            <Button
                              type="submit"
                              color="success"
                              text="Clock in"
                              loading={loading}
                              disabled={loading || !values.deptId}
                            />
                          </Form>
                        );
                      }}
                    </Formik>
                  );
                }}
              </Mutation>
            );
          }

          return null;
        }}
      </Query>
    </ShiftClockContainer>
  );
};

const ShiftClockContainer = styled(Box)`
  flex-basis: 50%;
  padding: 2rem;
  flex-grow: 0;

  button {
    display: block;
    width: 100%;
    margin-top: 2rem;
    max-width: 200px;
  }

  .title {
    opacity: 0.6;
    margin-bottom: 0.3em;
  }

  .department {
    font-size: 1.5rem;
  }
`;

export default ShiftClock;
