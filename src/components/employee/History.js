import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { Formik } from 'formik';
import moment from 'moment';

import Box from '../../styled/layouts/Box';
import Container from '../../styled/layouts/Container';
import { Form, FormControl, Select, Input } from '../../styled/elements/Form';
import { Button } from '../../styled/elements/Button';
import { SUCCESS } from '../../styled/utilities';
import { MY_SHIFTS } from '../../apollo/queries/user';
import Spinner from '../../styled/elements/Spinner';
import PrivateRoute from '../shared/PrivateRoute';
import { PAY_PERIODS } from '../../apollo/queries/payPeriod';

const History = () => {
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [searching, setSearching] = useState(false);

  const toggleSearching = () => setSearching(!searching);

  return (
    <Query query={MY_SHIFTS}>
      {({ data, loading, error }) => {
        let shifts = [];
        let years = [];

        if (data && data.myShifts) {
          shifts = data.myShifts;

          years = shifts.reduce((acc, shift) => {
            const shiftYear = moment(shift.timeIn).year();
            console.log(shiftYear);
            if (!acc.includes(shiftYear)) {
              acc.push(shiftYear);
            }
            return acc;
          }, []);
        }

        return (
          <Container>
            <Search>
              <div className="title">History</div>
              <Formik
                initialValues={{ year: new Date().getFullYear(), payPeriod: 1 }}
              >
                {({ values, handleChange }) => {
                  console.log(values);
                  const { year, payPeriod } = values;
                  return (
                    <Form>
                      <FormControl>
                        <label>Calendar Year</label>
                        <Input
                          name="year"
                          value={year}
                          // placeholder={new Date().getFullYear()}
                          onChange={handleChange}
                        />
                      </FormControl>
                      {/* Only Query Pay Periods if year is valid */}
                      {year.toString().length === 4 && (
                        <Query
                          query={PAY_PERIODS}
                          variables={{ year: parseInt(year, 10) }}
                          fetchPolicy="no-cache"
                        >
                          {({ data, loading }) => {
                            let payPeriodOptions = (
                              <option>No Pay Periods Found</option>
                            );

                            if (
                              data &&
                              data.payPeriods &&
                              data.payPeriods.length
                            ) {
                              payPeriodOptions = data.payPeriods.map(pp => (
                                <option key={pp.id} value={pp.id}>
                                  {pp.payPeriodId} (
                                  {moment(pp.startDate).format('MMM DD')} -{' '}
                                  {moment(pp.endDate).format('MMM DD')})
                                </option>
                              ));
                            }

                            return (
                              <FormControl>
                                <label>Pay Period</label>
                                <Select name="payPeriod">
                                  {payPeriodOptions}
                                </Select>
                              </FormControl>
                            );
                          }}
                        </Query>
                      )}
                      <FormControl>
                        <label>Department</label>
                        <Select name="department">
                          {loading ? (
                            <option>Loading...</option>
                          ) : (
                            <>
                              <option value="1">1 (Jan 1 - Jan 15)</option>
                              <option value="2">2 (Jan 16 - Jan 31)</option>
                              <option value="3">3 (Feb 1 - Feb 14)</option>
                            </>
                          )}
                        </Select>
                      </FormControl>
                      <FormControl>
                        <Button text="Search" color={SUCCESS} />
                      </FormControl>
                    </Form>
                  );
                }}
              </Formik>
            </Search>
            <Summary>
              <h2 className="title">Summary</h2>
              <div className="date">May 5 - May 17</div>
              <div className="total-time">23.4 hours</div>
              <div className="department">Digital Initiatives</div>
            </Summary>
          </Container>
        );
      }}
    </Query>
  );
};

const Search = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  padding-right: 2rem;

  .title {
    text-transform: uppercase;
    opacity: 0.6;
    margin-bottom: 0.3em;
  }
  button {
    margin-top: 1rem;
  }
`;

const Summary = styled(Box)`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;

  .title {
    text-transform: uppercase;
    opacity: 0.6;
    margin-bottom: 0.3em;
    font-weight: 400;
    font-size: 1rem;
  }

  .date {
    font-size: 1.5rem;
  }

  .total-time {
    font-size: 4rem;
    font-weight: 600;
    margin: 0.7rem 0 0;
  }

  .department {
    opacity: 0.7;
    font-size: 1.2em;
  }
`;

export default () => <PrivateRoute component={History} />;
