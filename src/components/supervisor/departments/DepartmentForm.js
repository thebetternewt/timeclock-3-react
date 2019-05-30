import React from 'react';
import { Form, FormControl, Input } from '../../../styled/elements/Form';
import GraphQlErrors from '../../shared/GraphQLErrors';
import Button from '../../../styled/elements/Button';

const DepartmentForm = ({
	values,
	handleChange,
	handleSubmit,
	error,
	loading,
}) => {
	// TODO: Handle Errors
	//TODO: supervisors sent to admin section after editing/cancelling

	return (
		<Form onSubmit={handleSubmit}>
			{error && <GraphQlErrors errors={error} />}
			<FormControl>
				<label>Name</label>
				<Input
					name="name"
					placeholder="Marketing"
					value={values.name}
					onChange={handleChange}
				/>
			</FormControl>

			<FormControl>
				<Button
					type="submit"
					color="success"
					text="Save"
					style={{ marginLeft: '2rem' }}
					loading={loading}
					disabled={loading}
				/>
			</FormControl>
			<FormControl>
				<Button
					color="danger"
					text="Cancel"
					style={{ marginLeft: '2rem' }}
					loading={loading}
					disabled={loading}
				/>
			</FormControl>
		</Form>
	);
};

export default DepartmentForm;
