import React from 'react';
import styled from 'styled-components';
import Box from '../../styled/layouts/Box';
import Logo from '../../styled/layouts/Logo';
import { Form, Input } from '../../styled/elements/Form';
import { Button } from '../../styled/elements/Button';
import { SUCCESS } from '../../styled/utilities';

const Login = () => {
  return (
    <LoginBox>
      <Logo />
      <Form>
        <Input name="netId" placeholder="NetID" />
        <Input type="password" name="password" placeholder="Password" />
        <Button type="submit" color={SUCCESS}>
          Login
        </Button>
      </Form>
    </LoginBox>
  );
};

const LoginBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 500px;
  max-width: 100%;
  margin: 100px auto;
  padding: 2rem 3rem;

  form {
    margin-top: 1rem;
  }

  button {
    margin-top: 1rem;
  }
`;

export default Login;
