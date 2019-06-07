import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Formik } from 'formik';
import { UPDATE_USER } from '../../../apollo/mutations/user';
import { navigate } from '@reach/router';
import EmployeeForm from './EmployeeForm';
import { USER } from '../../../apollo/queries/user';
import SpinnerWrapper from '../../../styled/elements/Spinner';

const Edit = ({ employeeId }) => {
	const passwordsMatch = (password, confirm) => password === confirm;

	const handleSubmit = async (e, { values, edit }) => {
		e.preventDefault();

		if (!passwordsMatch(values.password, values.confirm)) {
			throw new Error('Passwords must match');
		}

		try {
			await edit({ refetchQueries: () => ['Department'] });
			navigate('.');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div style={{ width: 500 }}>
			<h1 className="title">Edit Employee</h1>

			<Query query={USER} variables={{ id: employeeId }} fetchPolicy="no-cache">
				{({ data, loading }) => {
					if (loading) {
						return <SpinnerWrapper size="60px" />;
					}

					if (data && data.user) {
						return (
							<Formik
								initialValues={{ ...data.user, password: '', confirm: '' }}
							>
								{({ values, handleChange }) => {
									const variables = {
										firstName: values.firstName,
										lastName: values.lastName,
										netId: values.netId,
										nineDigitId: values.nineDigitId,
										email: values.email,
									};

									if (values.password) {
										variables.password = values.password;
									}

									return (
										<Mutation
											mutation={UPDATE_USER}
											variables={{ id: data.user.id, data: variables }}
										>
											{(edit, { loading, error }) => {
												console.log(error);
												return (
													<EmployeeForm
														values={values}
														handleChange={handleChange}
														handleSubmit={e =>
															handleSubmit(e, { values, edit })
														}
														error={error}
														loading={loading}
														buttonText="Save"
													/>
												);
											}}
										</Mutation>
									);
								}}
							</Formik>
						);
					}

					return null;
				}}
			</Query>
		</div>
	);
};

export default Edit;
