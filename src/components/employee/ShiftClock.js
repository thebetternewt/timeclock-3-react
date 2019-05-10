import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import moment from 'moment';

import Timer from './Timer';
import Box from '../../styled/layouts/Box';
import { Form, Select } from '../../styled/elements/Form';
import { Button } from '../../styled/elements/Button';
import { SUCCESS, DANGER } from '../../styled/utilities';
import { Query, Mutation } from 'react-apollo';
import { ME } from '../../apollo/queries/user';
import { CLOCK_IN, CLOCK_OUT } from '../../apollo/mutations/user';

const ShiftClock = () => {
  return (
    <ShiftClockContainer>
      <Query query={ME}>
        {({ data, loading }) => {
          if (data && data.me) {
            const { me } = data;
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
                  <Mutation mutation={CLOCK_OUT}>
                    {(clockOut, { data, loading }) => {
                      return (
                        <>
                          <Button
                            key="clockOut"
                            onClick={async () => {
                              try {
                                await clockOut({
                                  refetchQueries: () => ['Me'],
                                });
                              } catch (e) {
                                console.log(e);
                              }
                            }}
                            loading={loading}
                            text="Clock Out"
                            color={DANGER}
                          />
                        </>
                      );
                    }}
                  </Mutation>
                </>
              );
            }
            console.log(me);

            return (
              <Mutation mutation={CLOCK_IN}>
                {(clockIn, { data, loading, error }) => {
                  return (
                    <Formik
                      onSubmit={async values => {
                        try {
                          console.log(values);
                          await clockIn({
                            variables: values,
                            refetchQueries: () => ['Me'],
                          });
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      {({ handleSubmit, handleChange, values }) => {
                        return (
                          <Form onSubmit={handleSubmit}>
                            <Select
                              name="deptId"
                              value={values.deptId}
                              onChange={handleChange}
                            >
                              <option value="">Choose Department</option>
                              {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>
                                  {dept.name}
                                </option>
                              ))}
                            </Select>

                            <Button
                              type="submit"
                              color={SUCCESS}
                              text="Clock in"
                              loading={loading}
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
    color: #fff;
    font-weight: 600;
  }

  .title {
    opacity: 0.6;
    margin-bottom; 0.3em;
  }

  .department {
    font-size: 1.5rem;
  }
`;

export default ShiftClock;
