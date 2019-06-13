import React, { useState } from 'react';
import styled from 'styled-components';
import { Location } from '@reach/router';
import NumberFormat from 'react-number-format';
import { FaPlusCircle } from 'react-icons/fa';

import Button from '../../styled/elements/Button';
import { Form, FormControl, Input } from '../../styled/elements/Form';
import GraphQlErrors from '../shared/GraphQLErrors';
import DepartmentSelect from '../shared/DepartmentSelect';

const EmployeeForm = ({
	values,
	handleChange,
	handleDeptChange,
	handleSubmit,
	error,
	loading,
	passwordsMatch,
	departments,
	editing = false,
}) => {
	const [addingDept, setAddingDept] = useState(false);

	console.log('editing:', editing);

	return (
		<Form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
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
				</div>
				<div style={{ width: 250, marginRight: '2rem' }}>
					<SrOnlyLabel>Phone Number</SrOnlyLabel>
					<Input
						type="phone"
						name="phone"
						placeholder="Phone Number"
						value={values.phone}
						onChange={handleChange}
					/>

					<SrOnlyLabel>Street Address 1</SrOnlyLabel>
					<Input
						name="street1"
						placeholder="Street Address 1"
						value={values.street1}
						onChange={handleChange}
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

					{!editing &&
						(addingDept ? (
							<>
								<DepartmentSelect
									departments={departments}
									handleChange={e => handleDeptChange(e.target.value)}
									value={values.department}
								/>
								<Button
									text="Cancel"
									onClick={e => {
										e.preventDefault();
										handleDeptChange('');
										setAddingDept(!addingDept);
									}}
									color="danger"
								/>
							</>
						) : (
							<Button
								text={() => (
									<>
										<FaPlusCircle /> Add Department
									</>
								)}
								onClick={e => {
									e.preventDefault();
									setAddingDept(!addingDept);
								}}
								color="primary"
							/>
						))}
				</div>
			</div>
			<div style={{ display: 'flex', marginTop: '1rem' }}>
				<Button
					type="submit"
					color="success"
					text="Save"
					style={{ marginRight: '1rem' }}
					loading={loading}
					disabled={loading || !passwordsMatch}
				/>

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
			</div>
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
