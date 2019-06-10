import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { REGISTER } from '../../../apollo/mutations/user';
import { navigate } from '@reach/router';
import EmployeeForm from './EmployeeForm';

const Create = () => {
	const passwordsMatch = (password, confirm) => password === confirm;

	const handleSubmit = async (e, { values, register }) => {
		e.preventDefault();

		if (!passwordsMatch(values.password, values.confirm)) {
			throw new Error('Passwords must match');
		}

		try {
			const result = await register();
			navigate(result.data.register.id);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div style={{ width: 500 }}>
			<h1 className="title">Create Employee</h1>

			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					netId: '',
					nineDigitId: '',
					email: '',
					password: '',
					confirm: '',
				}}
			>
				{({ values, handleChange }) => {
					const { confirm, nineDigitId, ...variables } = values;
					console.log('vars: ', {
						...variables,
						nineDigitId: nineDigitId.replace(/-/g, ''),
					});

					return (
						<Mutation
							mutation={REGISTER}
							variables={{
								data: {
									nineDigitId: nineDigitId.replace(/-/g, ''),
									...variables,
								},
							}}
							refetchQueries={() => ['Department']}
						>
							{(register, { loading, error }) => {
								console.log(error);
								return (
									<EmployeeForm
										values={values}
										handleChange={handleChange}
										handleSubmit={e => handleSubmit(e, { values, register })}
										error={error}
										loading={loading}
									/>
								);
							}}
						</Mutation>
					);
				}}
			</Formik>
		</div>
	);
};

export default Create;
