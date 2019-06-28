import React from 'react';
import { Location } from '@reach/router';
import { Form, Input } from '../../styled/elements/Form';
import GraphQlErrors from '../shared/GraphQLErrors';
import Button from '../../styled/elements/Button';

const DepartmentForm = ({
	values,
	handleNameChange,
	handleSubmit,
	error,
	loading,
}) => (
	<Form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
		{error && <GraphQlErrors errors={error} />}

		<label htmlFor="name">Name</label>
		<Input
			name="name"
			id="name"
			placeholder="Name (e.g. Marketing)"
			value={values.name}
			onChange={handleNameChange}
		/>

		<div style={{ display: 'flex', marginTop: '1rem' }}>
			<Button
				type="submit"
				color="success"
				text="Save"
				style={{ marginRight: '1rem' }}
				loading={loading}
				disabled={loading}
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

export default DepartmentForm;
