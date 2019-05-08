import React from 'react';
import styled from 'styled-components';
import { Redirect } from '@reach/router';
import { Query, Mutation } from 'react-apollo';
import { Formik } from 'formik';

import Box from '../../styled/layouts/Box';
import Logo from '../../styled/layouts/Logo';
import { Form, Input } from '../../styled/elements/Form';
import { Button } from '../../styled/elements/Button';
import { SUCCESS } from '../../styled/utilities';
import { LOGIN } from '../../apollo/mutations/user';
import GraphQlErrors from '../shared/GraphQLErrors';
import { ME } from '../../apollo/queries/user';

const Login = () => {
  return (
    <Query query={ME}>
      {({ data }) => {
        if (data && data.me) return <Redirect to="/" noThrow />;

        return (
          <LoginBox>
            <Logo />
            <Mutation mutation={LOGIN}>
              {(login, { data, loading, error }) => {
                return (
                  <Formik
                    initialValues={{ netId: '', password: '' }}
                    onSubmit={async values => {
                      try {
                        await login({
                          variables: values,
                          refetchQueries: () => ['Me'],
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    {({ handleSubmit, handleChange, values }) => {
                      return (
                        <Form onSubmit={handleSubmit}>
                          {error && <GraphQlErrors error={error} />}
                          <Input
                            name="netId"
                            placeholder="NetID"
                            onChange={handleChange}
                            value={values.netId}
                          />
                          <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={values.password}
                          />
                          <Button
                            type="submit"
                            color={SUCCESS}
                            text="Login"
                            loading={loading}
                          />
                        </Form>
                      );
                    }}
                  </Formik>
                );
              }}
            </Mutation>
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
