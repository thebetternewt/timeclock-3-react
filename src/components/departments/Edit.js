import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { Formik } from 'formik';
import { navigate } from '@reach/router';

import DepartmentForm from './DepartmentForm';
import SpinnerWrapper from '../../styled/elements/Spinner';
import { DEPARTMENT } from '../../apollo/queries/department';
import {
	UPDATE_DEPARTMENT,
	CREATE_DEPARTMENT,
} from '../../apollo/mutations/department';

const Edit = ({ departmentId }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [name, setName] = useState('');

	const { data: deptData, loading: deptLoading } = useQuery(DEPARTMENT, {
		variables: { id: departmentId },
		fetchPolicy: 'no-cache',
	});
	const { department } = deptData;
	if (department && !name) setName(department.name);

	const updateDepartment = useMutation(UPDATE_DEPARTMENT, {
		variables: { deptId: department && department.id, data: { name } },
		refetchQueries: () => ['Departments', 'Me'],
	});

	const createDepartment = useMutation(CREATE_DEPARTMENT, {
		variables: { data: { name } },
		refetchQueries: () => ['Departments', 'Me'],
	});

	const handleNameChange = e => setName(e.target.value);

	const handleSubmit = async e => {
		e.preventDefault();

		setLoading(true);

		try {
			//if check goes here
			// if (department) {
			// 	await updateDepartment();

			// 	navigate('.');
			// } else {
			// 	const result = await register();

			// 	if (department) {
			// 		await addToDept({
			// 			variables: {
			// 				userId: result.data.register.id,
			// 				deptId: values.department,
			// 			},
			// 		});
			// 	}

			// 	navigate(result.data.register.id);
			// }

			const result = await updateDepartment();
			navigate(`/departments/${result.data.updateDepartment.id}`);
		} catch (err) {
			console.log(err);
			setError(err);
		}

		setLoading(false);
	};

	if (loading) {
		return <SpinnerWrapper size="60px" />;
	}

	return (
		<div style={{ width: 500 }}>
			<h1 className="title">Edit Department</h1>

			<DepartmentForm
				values={{ name }}
				handleNameChange={handleNameChange}
				handleSubmit={handleSubmit}
				error={error}
				loading={loading || deptLoading}
			/>
		</div>
	);
};

export default Edit;
