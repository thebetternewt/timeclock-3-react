import React from 'react';
import NumberFormat from 'react-number-format';

import Button from '../../styled/elements/Button';
import {
	Form,
	FormControl,
	Input,
	SrOnlyLabel,
} from '../../styled/elements/Form';
import GraphQlErrors from '../shared/GraphQLErrors';

import Select from 'react-select';

const selectStyles = {
	container: base => ({
		...base,
		width: '100%',
		marginTop: 5,
		marginRight: '2rem',
		color: '#555',
	}),
	multiValue: (base, state) => {
		return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
	},
	multiValueLabel: (base, state) => {
		return state.data.isFixed
			? { ...base, color: 'white', paddingRight: 6 }
			: base;
	},
	multiValueRemove: (base, state) => {
		return state.data.isFixed ? { ...base, display: 'none' } : base;
	},
};

const EmployeeForm = ({
	values,
	handleChange,
	handleDeptChange,
	handleSubmit,
	error,
	loading = false,
	departments,
	editing = false,
	cancel,
}) => (
	<Form
		autoComplete={false}
		onSubmit={handleSubmit}
		style={{ maxWidth: '100%' }}
	>
		{error && <GraphQlErrors errors={error} />}
		<div style={{ display: 'flex' }}>
			<div style={{ width: 250, marginRight: '2rem' }}>
				<SrOnlyLabel>First Name</SrOnlyLabel>
				<Input
					name="firstName"
					placeholder="First Name"
					value={values.firstName}
					onChange={handleChange}
				/>

				<SrOnlyLabel>Last Name</SrOnlyLabel>
				<Input
					name="lastName"
					placeholder="Last Name"
					value={values.lastName}
					onChange={handleChange}
				/>

				<SrOnlyLabel>NetID</SrOnlyLabel>
				<Input
					name="netId"
					placeholder="NetID"
					value={values.netId}
					onChange={handleChange}
				/>

				<SrOnlyLabel>Student ID</SrOnlyLabel>
				<NumberFormat
					name="nineDigitId"
					placeholder="9-Digit ID Number"
					value={values.nineDigitId}
					onChange={handleChange}
					customInput={Input}
					format="###-###-###"
					mask="_"
				/>

				<SrOnlyLabel>Email</SrOnlyLabel>
				<Input
					type="email"
					name="email"
					placeholder="Email Address"
					value={values.email}
					onChange={handleChange}
				/>

				{process.env.NODE_ENV !== 'production' && (
					<>
						<SrOnlyLabel>Password</SrOnlyLabel>
						<Input
							type="password"
							name="password"
							placeholder="Password"
							value={values.password}
							onChange={handleChange}
						/>

						<SrOnlyLabel>Password Confirm</SrOnlyLabel>
						<Input
							type="password"
							name="confirm"
							placeholder="Confirm Password"
							value={values.confirm}
							onChange={handleChange}
						/>
					</>
				)}
				<div style={{ display: 'flex' }}>
					<FormControl>
						<Input
							type="checkbox"
							checked={values.dsf}
							onChange={handleChange}
							name="dsf"
						/>
						<label>DSF</label>
					</FormControl>

					<FormControl>
						<Input
							type="checkbox"
							checked={values.admin}
							onChange={handleChange}
							name="admin"
						/>
						<label>Admin</label>
					</FormControl>
				</div>
			</div>
			<div style={{ width: 250, marginRight: '2rem' }}>
				<SrOnlyLabel>Phone Number</SrOnlyLabel>
				<NumberFormat
					name="phone"
					placeholder="Phone Number"
					value={values.phone}
					onChange={handleChange}
					customInput={Input}
					format="(###) ###-####"
					mask="_"
				/>

				<SrOnlyLabel>Street Address 1</SrOnlyLabel>
				<Input
					name="street1"
					placeholder="Street Address 1"
					value={values.street1}
					onChange={handleChange}
					autocomplete="off"
				/>

				<SrOnlyLabel>Street Address 2</SrOnlyLabel>
				<Input
					name="street2"
					placeholder="Street Address 2"
					value={values.street2}
					onChange={handleChange}
				/>

				<SrOnlyLabel>City</SrOnlyLabel>
				<Input
					name="city"
					placeholder="City"
					value={values.city}
					onChange={handleChange}
				/>

				<SrOnlyLabel>State</SrOnlyLabel>
				<Input
					name="state"
					placeholder="State"
					value={values.state}
					onChange={handleChange}
				/>

				<SrOnlyLabel>Zipcode</SrOnlyLabel>
				<Input
					name="zip"
					placeholder="Zipcode"
					value={values.zip}
					onChange={handleChange}
				/>
			</div>

			<div style={{ width: 250 }}>
				<label>Departments</label>
				<Select
					options={departments}
					styles={selectStyles}
					isMulti
					isClearable={false}
					onChange={handleDeptChange}
					value={values.departments}
				/>
			</div>
		</div>
		<div style={{ display: 'flex', marginTop: '1rem' }}>
			<Button
				type="submit"
				color="success"
				text="Save"
				style={{ marginRight: '1rem' }}
				loading={loading}
				disabled={loading}
			/>

			<Button text="Cancel" onClick={cancel} />
		</div>
	</Form>
);

export default EmployeeForm;
