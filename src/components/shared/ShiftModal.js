import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { parse } from 'date-fns';
import { useMutation } from 'react-apollo-hooks';

import Modal from '../../styled/layouts/Modal';
import DepartmentSelect from './DepartmentSelect';
import Button from '../../styled/elements/Button';
import { Form, Input } from '../../styled/elements/Form';
import GraphQlErrors from './GraphQLErrors';
import {
	CREATE_SHIFT,
	DELETE_SHIFT,
	UPDATE_SHIFT,
} from '../../apollo/mutations/shift';

const ShiftModal = ({ employee, shift, close }) => {
	const [timeIn, setTimeIn] = useState(
		shift ? parse(shift.timeIn) : new Date()
	);
	const [timeOut, setTimeOut] = useState(
		shift ? parse(shift.timeOut) : Date.now()
	);
	const [department, setDepartment] = useState(shift && shift.department);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	const emp = shift ? shift.user : employee;
	const editing = !!shift;

	const allowSubmit = department && timeIn && timeOut;

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
	const mutate = useMutation(shiftMutation, {
		variables,
	});
	const destroy = useMutation(DELETE_SHIFT, {
		variables: { id: editing && shift.id },
	});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			setLoading(true);
			await mutate({ refetchQueries: () => ['UserShifts'] });
			close();
		} catch (err) {
			setError(err);
			console.log(err);
		}
		setLoading(false);
	};

	const handleDeleteShift = async e => {
		e.preventDefault();
		try {
			setLoading(true);
			await destroy({ refetchQueries: () => ['UserShifts'] });
			close();
		} catch (err) {
			setError(err);
			console.log(err);
		}
		setLoading(false);
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
				{!shift && (
					<DepartmentSelect
						departments={emp.departments}
						handleChange={handleDepartmentSelect}
						value={department && department.id}
					/>
				)}
				<div style={{ display: 'flex' }}>
					<div>
						<label htmlFor="timein">Time In</label>
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
							shouldCloseOnSelect={false}
							autoComplete="off"
						/>
					</div>

					<div>
						<label htmlFor="timeout">Time Out</label>
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
							shouldCloseOnSelect={false}
							autoComplete="off"
						/>
					</div>
				</div>

				<ModalActions>
					<Button
						disabled={!allowSubmit}
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
