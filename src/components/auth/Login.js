import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { useMutation } from 'react-apollo-hooks';
import { Redirect } from '@reach/router';

import Box from '../../styled/layouts/Box';
import Logo from '../../styled/layouts/Logo';
import { Form, Input } from '../../styled/elements/Form';
import Button from '../../styled/elements/Button';
import { LOGIN } from '../../apollo/mutations/user';
import GraphQlErrors from '../shared/GraphQLErrors';
import { ME } from '../../apollo/queries/user';

const Login = () => {
	const [netId, setNetId] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [showForm, setShowForm] = useState(false);

	const login = useMutation(LOGIN, {
		variables: { netId, password },
		refetchQueries: () => ['Me'],
	});

	const IN_PROD = process.env.NODE_ENV === 'production';

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);

		try {
			await login();
		} catch (error) {
			console.log(error);
			setError(error);
		}
		setLoading(false);
	};

	const handleNetIdChange = e => setNetId(e.target.value);

	const handlePasswordChange = e => setPassword(e.target.value);

	const toggleForm = () => setShowForm(!showForm);

	const form = (
		<Form onSubmit={handleSubmit}>
			{error && <GraphQlErrors error={error} />}
			<Input
				name="netId"
				placeholder="NetID"
				onChange={handleNetIdChange}
				value={netId}
			/>
			<Input
				type="password"
				name="password"
				placeholder="Password"
				onChange={handlePasswordChange}
				value={password}
			/>
			<Button type="submit" color="success" text="Login" loading={loading} />
		</Form>
	);

	return (
		<Query query={ME}>
			{({ data }) => {
				if (data && data.me) return <Redirect to="/home" noThrow />;

				return (
					<LoginBox>
						<Logo />
						{IN_PROD ? (
							<>
								{showForm ? (
									form
								) : (
									<>
										<Button
											href="https://timeclockdev.library.msstate.edu/login"
											external
											color="success"
											text="CAS Login"
											style={{ marginTop: '2rem', width: 300, height: 50 }}
										/>

										<Button
											target="_blank"
											href="https://timeclock.library.msstate.edu/"
											text="Old Timeclock"
											external
											style={{ marginTop: '0.3rem', width: 300, height: 50 }}
										/>
									</>
								)}
								<p
									onClick={toggleForm}
									style={{ opacity: 0.5, cursor: 'pointer' }}
								>
									{showForm ? 'CAS Login' : 'Admin Login'}
								</p>
							</>
						) : (
							form
						)}
					</LoginBox>
				);
			}}
		</Query>
	);
};

const LoginBox = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 500px;
	max-width: 100%;
	margin: 100px auto;
	padding: 2rem;

	form {
		margin-top: 2rem;
	}

	button {
		margin-top: 1rem;
	}
`;

export default Login;
