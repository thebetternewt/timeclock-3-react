import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { parse } from 'date-fns';
import { Mutation } from 'react-apollo';

import Modal from '../../styled/layouts/Modal';
import { Button } from '../../styled/elements/Button';
import { Form, Input } from '../../styled/elements/Form';
import GraphQlErrors from './GraphQLErrors';
import {
  CREATE_SHIFT,
  DELETE_SHIFT,
  UPDATE_SHIFT,
} from '../../apollo/mutations/shift';

const ShiftModal = ({ shift, close }) => {
  const [timeIn, setTimeIn] = useState(shift && parse(shift.timeIn));
  const [timeOut, setTimeOut] = useState(shift && parse(shift.timeOut));
  const [error, setError] = useState();

  const editing = !!shift;
  const mutation = editing ? UPDATE_SHIFT : CREATE_SHIFT;

  const handleTimeInChange = date => setTimeIn(date);
  const handleTimeOutChange = date => setTimeOut(date);

  console.log('shift:', shift);

  return (
    <Modal title={shift ? `Edit Shift` : `Add Shift`} close={close}>
      <h3>{shift.user.name}</h3>
      <h4>{shift.department.name}</h4>
      <Form>
        {error && <GraphQlErrors error={error} />}
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
          <Mutation mutation={mutation} refetchQueries={() => ['UserShifts']}>
            {(submit, { loading, error: shiftError }) => {
              if (shiftError) {
                setError(shiftError);
              }

              const variables = {
                data: {
                  userId: shift.user.id,
                  deptId: shift.department.id,
                  timeIn,
                  timeOut,
                },
              };

              if (editing) {
                variables.id = shift.id;
              }

              return (
                <Button
                  type="submit"
                  text="Save"
                  color="success"
                  onClick={async e => {
                    e.preventDefault();
                    console.log(variables);
                    try {
                      await submit({
                        variables,
                      });
                      close();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  loading={loading}
                />
              );
            }}
          </Mutation>

          {editing && (
            <Mutation
              mutation={DELETE_SHIFT}
              variables={{ id: shift.id }}
              refetchQueries={() => ['UserShifts']}
            >
              {(destroy, { loading }) => (
                <Button
                  text="Remove"
                  color="danger"
                  loading={loading}
                  onClick={async e => {
                    e.preventDefault();
                    try {
                      await destroy();
                      close();
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              )}
            </Mutation>
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
