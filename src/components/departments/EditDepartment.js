import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useApolloClient } from 'react-apollo-hooks';
import { navigate } from '@reach/router';

import DepartmentForm from './DepartmentForm';
import SpinnerWrapper from '../../styled/elements/Spinner';
import { DEPARTMENT } from '../../apollo/queries/department';
import {
	UPDATE_DEPARTMENT,
	CREATE_DEPARTMENT,
} from '../../apollo/mutations/department';

const EditDepartment = ({ departmentId }) => {
	const [department, setDepartment] = useState();
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const client = useApolloClient();

	useEffect(() => {
		async function fetchDepartment() {
			const { data, loading } = await client.query({
				query: DEPARTMENT,
				variables: { id: departmentId },
				fetchPolicy: 'no-cache',
			});

			setLoading(loading);

			if (data.department) {
				setDepartment(data.department);
				setName(data.department.name);
			}
		}

		if (departmentId) fetchDepartment();
	}, []);

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
			if (department) {
				await updateDepartment();

				navigate('.');
			} else {
				const result = await createDepartment();

				navigate(`/departments/${result.data.createDepartment.id}`);
			}
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
			<h1 className="title">
				{departmentId
					? `Edit ${department ? department.name : ''}`
					: 'Create Department'}
			</h1>

			<DepartmentForm
				values={{ name }}
				handleNameChange={handleNameChange}
				handleSubmit={handleSubmit}
				error={error}
				loading={loading}
			/>
		</div>
	);
};

export default EditDepartment;
