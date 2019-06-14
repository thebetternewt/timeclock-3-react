import React from 'react';
import { Form, FormControl, Input } from '../../styled/elements/Form';
import GraphQlErrors from '../shared/GraphQLErrors';
import Button from '../../styled/elements/Button';

const DepartmentForm = ({
	values,
	handleNameChange,
	handleSubmit,
	error,
	loading,
}) => {
	// TODO: Handle Errors

	return (
		<Form onSubmit={handleSubmit}>
			{error && <GraphQlErrors errors={error} />}
			<FormControl>
				<label>Name</label>
				<Input
					name="name"
					placeholder="Marketing"
					value={values.name}
					onChange={handleNameChange}
				/>
				<Button
					type="submit"
					color="success"
					text="Save"
					loading={loading}
					disabled={loading}
				/>
			</FormControl>
		</Form>
	);
};

export default DepartmentForm;
