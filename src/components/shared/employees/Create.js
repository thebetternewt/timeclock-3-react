import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { Formik } from 'formik';
import { DEPARTMENTS } from '../../../apollo/queries/department';
import { ME } from '../../../apollo/queries/user';
import { REGISTER, ADD_TO_DEPT } from '../../../apollo/mutations/user';
import { navigate } from '@reach/router';
import EmployeeForm from './EmployeeForm';
import Container from '../../../styled/layouts/Container';

const Create = ({ employeeId }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [netId, setNetId] = useState('');
	const [nineDigitId, setNineDigitId] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [dsf, setDsf] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(false);
	const [department, setDepartment] = useState('');

	const values = {
		nineDigitId,
		firstName,
		lastName,
		netId,
		email,
		password,
		confirm,
		dsf,
		admin,
		department,
	};

	const { confirm: _, department: __, ...userVariables } = values;

	const { data: meData } = useQuery(ME);
	const { me = {} } = meData;

	const { data: deptData } = useQuery(DEPARTMENTS);
	const { departments = [] } = deptData;

	const register = useMutation(REGISTER, {
		variables: {
			data: userVariables,
		},
		refetchQueries: () => ['User'],
	});
	const addToDept = useMutation(ADD_TO_DEPT, {
		refetchQueries: () => ['User'],
	});

	const checkPassword = (password, confirm) =>
		setPasswordsMatch(password === confirm);

	const handleDeptChange = deptId => setDepartment(deptId);

	const handleChange = ({ target: { name, value, checked } }) => {
		console.log(name, ':', value);
		checkPassword(password, confirm);

		switch (name) {
			case 'firstName':
				setFirstName(value);
				return;
			case 'lastName':
				setLastName(value);
				return;
			case 'netId':
				setNetId(value);
				return;
			case 'nineDigitId':
				setNineDigitId(value.replace(/-/g, ''));
				return;
			case 'email':
				setEmail(value);
				return;
			case 'password':
				setPassword(value);
				return;
			case 'confirm':
				setConfirm(value);
				return;
			case 'dsf':
				setDsf(checked);
				return;
			case 'admin':
				setAdmin(checked);
				return;
			default:
				return;
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();

		console.log('values:', values);

		try {
			const result = await register();

			if (department) {
				await addToDept({
					variables: {
						userId: result.data.register.id,
						deptId: values.department,
					},
				});
			}

			navigate(result.data.register.id);
		} catch (err) {
			setError(err);
			console.log(err);
		}
	};

	return (
		<Container direction="column">
			<h1 className="title">Create Employee</h1>
			<EmployeeForm
				values={values}
				handleChange={handleChange}
				handleDeptChange={handleDeptChange}
				handleSubmit={handleSubmit}
				error={error}
				passwordsMatch={passwordsMatch}
				loading={loading}
				departments={me.admin ? departments : me.supervisedDepartments}
			/>
		</Container>
	);
};

export default Create;
