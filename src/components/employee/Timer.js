import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

import Box from '../../styled/layouts/Box';
import { Form, Select } from '../../styled/elements/Form';
import { Button } from '../../styled/elements/Button';
import { SUCCESS } from '../../styled/utilities';
import { Query, Mutation } from 'react-apollo';
import { ME } from '../../apollo/queries/user';
import { CLOCK_IN, CLOCK_OUT } from '../../apollo/mutations/user';

const Timer = () => {
  return (
    <TimerContainer>
      <Query query={ME}>
        {({ data, loading }) => {
          if (data && data.me) {
            const { me } = data;
            const { departments } = me;
            if (me.isClockedIn)
              return (
                <>
                  <h2>Clocked In</h2>
                  <Mutation mutation={CLOCK_OUT}>
                    {(clockOut, { data, loading }) => {
                      return (
                        <Button
                          onClick={async () => {
                            try {
                              await clockOut({ refetchQueries: () => ['Me'] });
                            } catch (e) {
                              console.log(e);
                            }
                          }}
                          loading={loading}
                          text="Clock Out"
                        />
                      );
                    }}
                  </Mutation>
                </>
              );
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
    </TimerContainer>
  );
};

const TimerContainer = styled(Box)`
  flex-basis: 50%;
  padding: 2rem;
  flex-grow: 0;

  button {
    margin-top: 1rem;
    max-width: 300px;
  }
`;

export default Timer;
