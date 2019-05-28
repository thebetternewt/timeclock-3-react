import React from 'react';
import { Form, FormControl, Input } from '../../../styled/elements/Form';
import GraphQlErrors from '../../shared/GraphQLErrors';
import Button from '../../../styled/elements/Button';

const EmployeeForm = ({
  values,
  handleChange,
  handleSubmit,
  error,
  loading,
  buttonText = 'Create Employee',
}) => {
  // TODO: Handle Errors

  return (
    <Form onSubmit={handleSubmit}>
      {error && <GraphQlErrors errors={error} />}
      <FormControl>
        <label>First Name</label>
        <Input
          name="firstName"
          placeholder="Frodo"
          value={values.firstName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <label>Last Name</label>
        <Input
          name="lastName"
          placeholder="Baggins"
          value={values.lastName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <label>NetID</label>
        <Input
          name="netId"
          placeholder="fb123"
          value={values.netId}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <label>Student ID</label>
        <Input
          name="nineDigitId"
          placeholder="123-456-789"
          value={values.nineDigitId}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <label>Email</label>
        <Input
          type="email"
          name="email"
          placeholder="fb123@msstate.edu"
          value={values.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <label>Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <label>Password Confirm</label>
        <Input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={values.confirm}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <Button
          type="submit"
          color="success"
          text={buttonText}
          style={{ marginLeft: '2rem' }}
          loading={loading}
          disabled={loading}
        />
      </FormControl>
    </Form>
  );
};

export default EmployeeForm;
