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

	const login = useMutation(LOGIN, {
		variables: { netId, password },
		refetchQueries: () => ['Me'],
	});

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

	return (
		<Query query={ME}>
			{({ data }) => {
				if (data && data.me) return <Redirect to="/" noThrow />;

				return (
					<LoginBox>
						<Logo />
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
							<Button
								type="submit"
								color="success"
								text="Login"
								loading={loading}
							/>
						</Form>
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
