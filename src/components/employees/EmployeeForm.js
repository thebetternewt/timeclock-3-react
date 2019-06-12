import React from 'react';
import styled from 'styled-components';
import { Location } from '@reach/router';
import { Form, FormControl, Input } from '../../../styled/elements/Form';
import GraphQlErrors from '../GraphQLErrors';
import Button from '../../../styled/elements/Button';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

const EmployeeForm = ({
	values,
	handleChange,
	handleSubmit,
	error,
	loading,
	buttonText = 'Create Employee',
}) => {
	return (
		<Form onSubmit={handleSubmit}>
			{error && <GraphQlErrors errors={error} />}
			<FormControl>
				<SrOnlyLabel>First Name</SrOnlyLabel>
				<Input
					name="firstName"
					placeholder="First Name"
					value={values.firstName}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<SrOnlyLabel>Last Name</SrOnlyLabel>
				<Input
					name="lastName"
					placeholder="Last Name"
					value={values.lastName}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<SrOnlyLabel>NetID</SrOnlyLabel>
				<Input
					name="netId"
					placeholder="NetID"
					value={values.netId}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
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
			</FormControl>
			<FormControl>
				<SrOnlyLabel>Email</SrOnlyLabel>
				<Input
					type="email"
					name="email"
					placeholder="Email Address"
					value={values.email}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<SrOnlyLabel>Password</SrOnlyLabel>
				<Input
					type="password"
					name="password"
					placeholder="Password"
					value={values.password}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl>
				<SrOnlyLabel>Password Confirm</SrOnlyLabel>
				<Input
					type="password"
					name="confirm"
					placeholder="Confirm Password"
					value={values.confirm}
					onChange={handleChange}
				/>
			</FormControl>

			<FormControl>
				<label>
					<Input
						type="checkbox"
						checked={values.dsf}
						onChange={handleChange}
						name="dsf"
					/>
					DSF
				</label>
			</FormControl>

			<FormControl>
				<label>
					<Input
						type="checkbox"
						checked={values.admin}
						onChange={handleChange}
						name="admin"
					/>
					Admin
				</label>
			</FormControl>

			<FormControl>
				<Button
					type="submit"
					color="success"
					text={buttonText}
					style={{ marginTop: '1rem' }}
					loading={loading}
					disabled={loading}
				/>
			</FormControl>
			<FormControl>
				<Location>
					{({ navigate }) => {
						return (
							<Button
								text="Cancel"
								onClick={e => {
									e.preventDefault();
									navigate('.');
								}}
							/>
						);
					}}
				</Location>
			</FormControl>
		</Form>
	);
};

const SrOnlyLabel = styled.label`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	border: 0;
`;

export default EmployeeForm;
