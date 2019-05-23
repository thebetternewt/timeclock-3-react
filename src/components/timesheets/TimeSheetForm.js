import React, { useState } from 'react';
import moment from 'moment';
import { Query } from 'react-apollo';

import { PAY_PERIODS } from '../../apollo/queries/payPeriod';
import { Form, FormControl, Select, Input } from '../../styled/elements/Form';
import { Button } from '../../styled/elements/Button';
import { arraysEqual } from '../../util/arrays';
import { ME, MY_SHIFTS } from '../../apollo/queries/user';
import Container from '../../styled/layouts/Container';
import TimeSheet from './TimeSheet';

const TimeSheetForm = () => {
  const [year, setYear] = useState(moment().year());
  const [payPeriod, setPayPeriod] = useState();
  const [payPeriodOptions, setPayPeriodOptions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState();
  const [shifts, setShifts] = useState([]);
  const [printing, setPrinting] = useState(false);

  console.log('search form state:', {
    year,
    payPeriodOptions,
    payPeriod,
    departments,
    department,
    shifts,
  });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Print timesheet...');
    setPrinting(true);
    // setShiftsInHistory(handleFilterShifts());
  };

  const handleChange = ({ target: { name, value } }) => {
    setPrinting(false);
    switch (name) {
      case 'year':
        setYear(value);
        setPayPeriodOptions([]);
        return;
      case 'payPeriod':
        setPayPeriod(payPeriodOptions.find(pp => pp.id === value));
        return;
      case 'department':
        setDepartment(departments.find(dept => dept.id === value));
        return;
      default:
        return;
    }
  };

  const validateYear = year =>
    year.toString().match(/\d{4}/) && // Year is 4 digits
    parseInt(year, 10) > 1987 && // Year is > 1987
    parseInt(year, 10) < 2100; // Year is > 2100

  const shiftQueryVariables = () => {
    const vars = {
      startDate: moment(payPeriod.startDate)
        .startOf('Day')
        .toISOString(),
      endDate: moment(payPeriod.endDate)
        .endOf('Day')
        .toISOString(),
    };

    console.log('vars:', vars);

    return vars;
  };

  const handleFilterShifts = () =>
    shifts.filter(shift => shift.department.id === department.id);

  return (
    <Container direction="column">
      <div style={{ maxWidth: 400 }}>
        <Form onSubmit={handleSubmit}>
          <FormControl>
            <label>Calendar Year</label>
            <Input
              name="year"
              value={year}
              placeholder={new Date().getFullYear()}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <label>Pay Period</label>
            <Select
              name="payPeriod"
              key="payPeriod"
              onChange={handleChange}
              value={payPeriod ? payPeriod.id : ''}
              disabled={!validateYear(year)}
            >
              {payPeriodOptions.length ? (
                payPeriodOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.payPeriodId} ({moment(opt.startDate).format('MMM DD')}{' '}
                    - {moment(opt.endDate).format('MMM DD')})
                  </option>
                ))
              ) : (
                <option>No Pay Periods Found</option>
              )}

              {/* Only Query pay periods if year is valid */}
              {validateYear(year) && (
                <Query
                  query={PAY_PERIODS}
                  variables={{ year: parseInt(year, 10) }}
                  fetchPolicy="no-cache"
                >
                  {({ data }) => {
                    if (data && data.payPeriods && data.payPeriods.length) {
                      // Compare newly queried pay periods with current state
                      // and only update if different.
                      const newPpIds = data.payPeriods.map(opt => opt.id);
                      const oldPpIds = payPeriodOptions.map(opt => opt.id);

                      if (!arraysEqual(newPpIds, oldPpIds)) {
                        setPayPeriodOptions(data.payPeriods);
                        setPayPeriod(data.payPeriods[0]);
                      }
                    }

                    return null;
                  }}
                </Query>
              )}
            </Select>
          </FormControl>

          <FormControl>
            <label>Department</label>
            <Select
              name="department"
              value={department ? department.id : ''}
              onChange={handleChange}
              disabled={!payPeriod}
            >
              {departments.length ? (
                departments.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))
              ) : (
                <option>No Departments Found</option>
              )}
            </Select>
          </FormControl>

          <FormControl>
            <Button type="submit" text="Print" color="success" />
          </FormControl>

          {/* Shifts Query wraps department select and search button */}
          {payPeriod && (
            <Query
              query={MY_SHIFTS}
              variables={shiftQueryVariables()}
              fetchPolicy="no-cache"
            >
              {({ data, loading, error }) => {
                let shifts;

                if (data && data.myShifts) {
                  shifts = data.myShifts;

                  const depts = shifts.reduce((acc, shift) => {
                    const dept = shift.department;
                    if (!acc.find(d => d.id === dept.id)) {
                      acc.push(dept);
                    }
                    return acc;
                  }, []);

                  // Compare newly queried departments with current state
                  // and only update if different.
                  const newDeptIds = depts.map(dept => dept.id);
                  const oldDeptIds = departments.map(dept => dept.id);

                  // Compare newly queried shifts with current state
                  // and only update if different.
                  const newShiftIds = shifts.map(shift => shift.id);
                  const oldShiftIds = shifts.map(shift => shift.id);

                  if (
                    !arraysEqual(newDeptIds, oldDeptIds) ||
                    !arraysEqual(newShiftIds, oldShiftIds)
                  ) {
                    setShifts(shifts);
                    setDepartments(depts);
                    setDepartment(depts[0]);
                  }
                }

                return null;
              }}
            </Query>
          )}
        </Form>
        {printing && (
          <Query query={ME}>
            {({ data }) => {
              if (data && data.me) {
                return (
                  <TimeSheet
                    employee={data.me}
                    payPeriod={payPeriod}
                    department={department}
                    shifts={handleFilterShifts()}
                  />
                );
              }

              return null;
            }}
          </Query>
        )}
      </div>
    </Container>
  );
};

export default TimeSheetForm;
