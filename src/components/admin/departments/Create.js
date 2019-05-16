import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import { navigate } from '@reach/router';

import DepartmentForm from './DepartmentForm';
import { CREATE_DEPARTMENT } from '../../../apollo/mutations/department';

const Create = () => {
  const handleSubmit = async (e, { values, mutate }) => {
    e.preventDefault();

    try {
      const result = await mutate();
      console.log(result);
      navigate(result.data.createDepartment.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ width: 500 }}>
      <h1 className="title">Create Department</h1>

      <Formik
        initialValues={{
          name: '',
        }}
      >
        {({ values, handleChange }) => {
          const { confirm, ...variables } = values;

          return (
            <Mutation
              mutation={CREATE_DEPARTMENT}
              variables={{ data: variables }}
            >
              {(createDept, { loading, error }) => {
                console.log(error);
                return (
                  <DepartmentForm
                    values={values}
                    handleChange={handleChange}
                    handleSubmit={e =>
                      handleSubmit(e, { values, mutate: createDept })
                    }
                    error={error}
                    loading={loading}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Formik>
    </div>
  );
};

export default Create;
