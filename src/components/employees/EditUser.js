import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { useMutation, useQuery } from 'react-apollo-hooks';
import queryString from 'query-string';

import { DEPARTMENTS } from '../../apollo/queries/department';
import { ME, USER } from '../../apollo/queries/user';
import {
	REGISTER,
	ADD_TO_DEPT,
	UPDATE_USER,
} from '../../apollo/mutations/user';
import EmployeeForm from './EmployeeForm';
import Container from '../../styled/layouts/Container';
import Spinner from '../../styled/elements/Spinner';

const EditUser = ({ employeeId = '', location }) => {
	const { deptId } = queryString.parse(location.search);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [netId, setNetId] = useState('');
	const [nineDigitId, setNineDigitId] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [street1, setStreet1] = useState('');
	const [street2, setStreet2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [dsf, setDsf] = useState(false);
	const [admin, setAdmin] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [department, setDepartment] = useState(deptId || '');

	const values = {
		nineDigitId,
		firstName,
		lastName,
		netId,
		email,
		phone,
		street1,
		street2,
		city,
		state,
		zip,
		password,
		confirm,
		dsf,
		admin,
		department,
	};

	const { data: meData } = useQuery(ME);
	const { me = {} } = meData;

	const { data: deptData } = useQuery(DEPARTMENTS);
	const { departments = [] } = deptData;

	const { data: userData, loading: userLoading } = useQuery(USER, {
		variables: { id: employeeId },
		fetchPolicy: 'no-cache',
	});
	const { user } = userData;

	// Only initilize state from user on initial load
	if (user && !netId) {
		setFirstName(user.firstName);
		setLastName(user.lastName);
		setNetId(user.netId);
		setNineDigitId(user.nineDigitId);
		setEmail(user.email);
		setPhone(user.phone || '');
		setStreet1(user.street1 || '');
		setStreet2(user.street2 || '');
		setCity(user.city || '');
		setState(user.state || '');
		setZip(user.zip || '');
		setDsf(user.dsf);
		setAdmin(user.admin);
	}

	const {
		confirm: _,
		department: __,
		phone: phoneValue,
		password: passwordValue,
		...userVariables
	} = values;
	if (phoneValue) {
		userVariables.phone = phoneValue;
	}
	if (passwordValue) {
		userVariables.password = passwordValue;
	}

	const register = useMutation(REGISTER, {
		variables: {
			data: userVariables,
		},
		refetchQueries: () => ['User'],
	});

	const updateUser = useMutation(UPDATE_USER, {
		variables: {
			id: employeeId,
			data: userVariables,
		},
		refetchQueries: () => ['User'],
	});

	const addToDept = useMutation(ADD_TO_DEPT, {
		refetchQueries: () => ['User'],
	});

	const checkPassword = (password, confirm) =>
		setPasswordsMatch(password ? password === confirm : true);

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
			case 'phone':
				setPhone(value);
				return;
			case 'street1':
				setStreet1(value);
				return;
			case 'street2':
				setStreet2(value);
				return;
			case 'city':
				setCity(value);
				return;
			case 'state':
				setState(value);
				return;
			case 'zip':
				setZip(value);
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

		setLoading(true);

		try {
			if (user) {
				await updateUser();

				navigate('.');
			} else {
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
			}
		} catch (err) {
			setError(err);
			console.log(err);
		}

		setLoading(false);
	};

	return (
		<Container direction="column">
			{!(loading || userLoading) ? (
				<>
					<h1 className="title">
						{employeeId ? `Edit ${user ? user.name : ''}` : 'Create Employee'}
					</h1>
					<EmployeeForm
						values={values}
						handleChange={handleChange}
						handleDeptChange={handleDeptChange}
						handleSubmit={handleSubmit}
						error={error}
						passwordsMatch={passwordsMatch}
						loading={loading}
						departments={me.admin ? departments : me.supervisedDepartments}
						editing={!!employeeId}
					/>
				</>
			) : (
				<Spinner size="60px" />
			)}
		</Container>
	);
};

export default EditUser;
