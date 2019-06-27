import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import queryString from 'query-string';

import { DEPARTMENTS } from '../../apollo/queries/department';
import { ME, USER } from '../../apollo/queries/user';
import {
	REGISTER,
	ADD_TO_DEPT,
	REMOVE_FROM_DEPT,
	UPDATE_USER,
} from '../../apollo/mutations/user';
import EmployeeForm from './EmployeeForm';
import Container from '../../styled/layouts/Container';
import Spinner from '../../styled/elements/Spinner';

const EditUser = ({ employeeId = '', location, navigate }) => {
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
	const [selectedDepartments, setSelectedDepartments] = useState([]);

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
		departments: selectedDepartments,
	};

	const { data: meData } = useQuery(ME);
	const { me = {} } = meData;
	const { supervisedDepartments = [] } = me;

	const { data: deptData } = useQuery(DEPARTMENTS, {
		fetchPolicy: 'cache-and-network',
	});
	const { departments = [] } = deptData;

	const checkFixed = dept => {
		if (me.admin) return false;
		if (me.supervisor) {
			return !supervisedDepartments.find(sd => sd.id === dept.id);
		}
		return true;
	};

	let departmentOptions = departments.map(dept => ({
		value: dept.id,
		label: dept.name,
		isFixed: checkFixed(dept),
	}));

	if (!me.admin) {
		departmentOptions = departmentOptions.filter(opt =>
			me.supervisedDepartments.find(sd => sd.id === opt.value)
		);
	}

	const orderOptions = values => {
		return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
	};

	if (
		deptId &&
		departmentOptions.length > 0 &&
		selectedDepartments.length === 0
	) {
		const newDeptOpt = departmentOptions.find(opt => opt.value === deptId);
		if (newDeptOpt) setSelectedDepartments([newDeptOpt]);
	}

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
		setSelectedDepartments(
			orderOptions(
				user.departments.map(dept => ({
					value: dept.id,
					label: dept.name,
					isFixed: checkFixed(dept),
				}))
			)
		);
	}

	const {
		confirm: _,
		departments: __,
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

	const removeFromDept = useMutation(REMOVE_FROM_DEPT, {
		refetchQueries: () => ['User'],
	});

	const checkPassword = (password, confirm) =>
		setPasswordsMatch(password ? password === confirm : true);

	const handleDeptChange = (value, { action, removedValue }) => {
		switch (action) {
			case 'remove-value':
			case 'pop-value':
				if (removedValue && removedValue.isFixed) {
					return;
				}
				break;
			case 'clear':
				value = departmentOptions.filter(val => val.isFixed);
				break;
		}
		value = orderOptions(value || []);
		setSelectedDepartments(value);
	};

	const handleChange = ({ target: { name, value, checked } }) => {
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

		setLoading(true);

		try {
			if (user) {
				await updateUser();

				// Find departments that have been removed from the user's list
				// of selected departments.
				const departmentsForRemoval = user.departments.filter(
					dept => !selectedDepartments.find(sd => sd.value === dept.id)
				);

				// Remove user from each department removed from the list.
				departmentsForRemoval.forEach(async dept => {
					await removeFromDept({
						variables: {
							userId: user.id,
							deptId: dept.id,
						},
					});
				});

				// Add user to each department added to the list.
				selectedDepartments.forEach(async dept => {
					await addToDept({
						variables: {
							userId: user.id,
							deptId: dept.value,
						},
					});
				});

				navigate('..');
			} else {
				const result = await register();

				if (selectedDepartments.length > 0) {
					await Promise.all(
						selectedDepartments.map(async dept => {
							await addToDept({
								variables: {
									userId: result.data.register.id,
									deptId: dept.value,
								},
							});
						})
					);
				}

				if (deptId) {
					navigate(`/departments/${deptId}`);
				} else {
					navigate(`/employees/${result.data.register.id}`);
				}
			}
		} catch (err) {
			setError(err);
			console.log(err);
		}

		setLoading(false);
	};

	const handleCancel = e => {
		e.preventDefault();
		navigate(deptId ? `/departments/${deptId}` : '..');
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
						departments={departmentOptions}
						editing={!!employeeId}
						cancel={handleCancel}
					/>
				</>
			) : (
				<Spinner size="60px" />
			)}
		</Container>
	);
};

export default EditUser;
