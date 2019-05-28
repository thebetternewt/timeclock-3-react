import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { Query } from 'react-apollo';

import { PAY_PERIODS } from '../../../apollo/queries/payPeriod';
import {
  Form,
  FormControl,
  Select,
  Input,
} from '../../../styled/elements/Form';
import Button from '../../../styled/elements/Button';
import { client } from '../../../apollo/client';
import { USERS } from '../../../apollo/queries/user';
import EmployeeSelect from '../../shared/EmployeeSelect';
import searchContext from './searchContext';

const SearchForm = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [shifts, setShifts] = useState([]);
  const context = useContext(searchContext);

  const allowSubmit =
    context.employee && year && context.payPeriod && context.department;

  const handleSubmit = e => {
    e.preventDefault();
    // console.log('contextShifts:', context.shifts);
    // context.setShifts(handleFilterShifts());
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'employee':
        context.setEmployee(value);
        return;
      case 'year':
        setYear(value);
        return;
      case 'department':
        context.setDepartment(
          context.departments.find(dept => dept.id === value)
        );
        return;
      default:
        return;
    }
  };

  // const onShiftsFetched = newShifts => {
  //   setShifts(newShifts);

  //   const newDepts = newShifts.reduce((acc, shift) => {
  //     const dept = shift.department;
  //     if (!acc.find(d => d.id === dept.id)) {
  //       acc.push(dept);
  //     }
  //     return acc;
  //   }, []);

  //   context.setDepartments(newDepts);
  //   context.setDepartment(newDepts[0]);
  // };

  const handlePayPeriodChange = e => {
    const payPeriod = context.payPeriods.find(pp => pp.id === e.target.value);
    console.log('period:', payPeriod);
    context.setPayPeriod(payPeriod);

    if (context.employee) {
      context.fetchShifts({ payPeriod });
    }
  };

  const validYear = year =>
    year.toString().match(/\d{4}/) && // Year is 4 digits
    parseInt(year, 10) > 1987 && // Year is > 1987
    parseInt(year, 10) < 2100; // Year is > 2100

  const fetchPayPeriods = async () => {
    if (!validYear(year)) {
      context.setPayPeriods([]);
      context.setPayPeriod(null);
      return;
    }

    const { data } = await client.query({
      query: PAY_PERIODS,
      variables: { year: parseInt(year, 10) },
      fetchPolicy: 'no-cache',
    });

    context.setPayPeriods(data.payPeriods);
    context.setPayPeriod(data.payPeriods[0]);
  };

  // const handleFilterShifts = () =>
  //   shifts.filter(
  //     shift => shift.department.id === context.department.id
  //   );

  useEffect(() => {
    fetchPayPeriods();
  }, [year]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <label>Employee</label>
        <Query query={USERS}>
          {({ data }) => {
            if (data && data.users) {
            }

            return (
              <EmployeeSelect
                name="employee"
                employees={data.users}
                value={context.employee}
                handleChange={handleChange}
              />
            );
          }}
        </Query>
      </FormControl>
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
          onChange={handlePayPeriodChange}
          value={context.payPeriod ? context.payPeriod.id : ''}
          disabled={!validYear(year)}
        >
          {context.payPeriods.length ? (
            context.payPeriods.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.payPeriodId} ({moment(opt.startDate).format('MMM DD')} -{' '}
                {moment(opt.endDate).format('MMM DD')})
              </option>
            ))
          ) : (
            <option>No Pay Periods Found</option>
          )}
        </Select>
      </FormControl>

      <FormControl>
        <label>Department</label>
        <Select
          name="department"
          value={context.department ? context.department.id : ''}
          onChange={handleChange}
          disabled={!context.payPeriod || !context.employee}
        >
          {context.departments.length ? (
            context.departments.map(opt => (
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
        <Button
          type="submit"
          text="Search"
          color="success"
          disabled={!allowSubmit}
        />
      </FormControl>
    </Form>
  );
};

export default SearchForm;
