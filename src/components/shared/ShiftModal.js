import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { parse } from 'date-fns';
import { useMutation } from 'react-apollo-hooks';

import searchContext from '../../components/admin/history/searchContext';
import Modal from '../../styled/layouts/Modal';
import DepartmentSelect from './DepartmentSelect';
import { Button } from '../../styled/elements/Button';
import { Form, Input } from '../../styled/elements/Form';
import GraphQlErrors from './GraphQLErrors';
import {
  CREATE_SHIFT,
  DELETE_SHIFT,
  UPDATE_SHIFT,
} from '../../apollo/mutations/shift';

const ShiftModal = ({ employee, shift, close }) => {
  const [timeIn, setTimeIn] = useState(shift && parse(shift.timeIn));
  const [timeOut, setTimeOut] = useState(shift && parse(shift.timeOut));
  const [department, setDepartment] = useState(shift && shift.department);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const context = useContext(searchContext);

  const emp = shift ? shift.user : employee;
  const editing = !!shift;

  const variables = {
    data: {
      userId: emp.id,
      deptId: department && department.id,
      timeIn,
      timeOut,
    },
  };

  if (editing) {
    variables.id = shift.id;
  }

  const shiftMutation = editing ? UPDATE_SHIFT : CREATE_SHIFT;
  const mutate = useMutation(shiftMutation, { variables });
  const destroy = useMutation(DELETE_SHIFT, { variables: { id: shift.id } });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await mutate();
      await context.fetchShifts({});
      setLoading(false);
      close();
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleDeleteShift = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await destroy();
      await context.fetchShifts({});
      setLoading(false);
      close();
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleTimeInChange = date => setTimeIn(date);
  const handleTimeOutChange = date => setTimeOut(date);
  const handleDepartmentSelect = e =>
    setDepartment(
      employee.departments.find(dept => dept.id === e.target.value)
    );

  return (
    <Modal title={shift ? `Edit Shift` : `Add Shift`} close={close}>
      <h3>{emp.name}</h3>
      {editing && <h4>{department.name}</h4>}
      <Form>
        {error && <GraphQlErrors error={error} />}
        {!department && (
          <DepartmentSelect
            departments={emp.departments}
            handleChange={handleDepartmentSelect}
            value={department}
          />
        )}
        <div style={{ display: 'flex' }}>
          <DatePicker
            customInput={<Input style={{ marginRight: '1rem' }} />}
            name="timeIn"
            selected={timeIn}
            selectsStart
            startDate={timeIn}
            endDate={timeOut}
            maxDate={timeOut}
            onChange={handleTimeInChange}
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            timeInputLabel="Time in:"
          />

          <DatePicker
            customInput={<Input />}
            name="timeOut"
            selected={timeOut}
            selectsEnd
            startDate={timeIn}
            endDate={timeOut}
            minDate={timeIn}
            onChange={handleTimeOutChange}
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            timeInputLabel="Time out:"
          />
        </div>

        <ModalActions>
          <Button
            type="submit"
            text="Save"
            color="success"
            onClick={handleSubmit}
            loading={loading}
          />

          {editing && (
            <Button
              text="Remove"
              color="danger"
              loading={loading}
              onClick={handleDeleteShift}
            />
          )}

          <Button
            text="Cancel"
            onClick={e => {
              e.preventDefault();
              close();
            }}
          />
        </ModalActions>
      </Form>
    </Modal>
  );
};

const ModalActions = styled.div`
  display: flex;

  button {
    margin-right: 1rem;
  }
`;

export default ShiftModal;
