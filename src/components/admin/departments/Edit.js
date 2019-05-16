import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Formik } from 'formik';
import { navigate } from '@reach/router';

import DepartmentForm from './DepartmentForm';
import SpinnerWrapper from '../../../styled/elements/Spinner';
import { DEPARTMENT } from '../../../apollo/queries/department';
import { UPDATE_DEPARTMENT } from '../../../apollo/mutations/department';

const Edit = ({ departmentId }) => {
  const handleSubmit = async (e, { values, mutate }) => {
    e.preventDefault();

    try {
      const result = await mutate();
      console.log('result:', result);
      navigate(`/admin/departments/${result.data.updateDepartment.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ width: 500 }}>
      <h1 className="title">Edit Department</h1>

      <Query query={DEPARTMENT} variables={{ id: departmentId }}>
        {({ data, loading }) => {
          console.log('data:', data);
          if (loading) {
            return <SpinnerWrapper size="60px" />;
          }

          if (data && data.department) {
            return (
              <Formik initialValues={data.department}>
                {({ values, handleChange }) => {
                  const variables = {
                    name: values.name,
                  };

                  return (
                    <Mutation
                      mutation={UPDATE_DEPARTMENT}
                      variables={{
                        deptId: data.department.id,
                        data: variables,
                      }}
                    >
                      {(edit, { loading, error }) => {
                        console.log(error);
                        return (
                          <DepartmentForm
                            values={values}
                            handleChange={handleChange}
                            handleSubmit={e =>
                              handleSubmit(e, { values, mutate: edit })
                            }
                            error={error}
                            loading={loading}
                            buttonText="Edit Department"
                          />
                        );
                      }}
                    </Mutation>
                  );
                }}
              </Formik>
            );
          }

          return null;
        }}
      </Query>
    </div>
  );
};

export default Edit;
