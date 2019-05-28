import React, { useState } from 'react';
import { Link } from '@reach/router';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';

import DepartmentSelect from '../../shared/DepartmentSelect';
import Container from '../../../styled/layouts/Container';
import Button from '../../../styled/elements/Button';
import { DEPARTMENTS } from '../../../apollo/queries/department';

const Departments = () => {
  //   const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState('');

  const handleDepartmentSelect = ({ target: { value } }) => {
    console.log(value);
    setDepartment(value);
  };

  return (
    <Container direction="column">
      <h1 className="title">Departments</h1>
      <Query query={DEPARTMENTS} fetchPolicy="no-cache">
        {({ data }) => {
          let departments;

          if (data && data.departments) {
            // if (!departments.length) {
            //   setDepartments(data.users);
            // }
            departments = data.departments;
          }

          return (
            <DepartmentSelectWrapper>
              <DepartmentSelect
                departments={departments}
                handleChange={handleDepartmentSelect}
                value={department}
              />
              <Link to={department || ''}>
                <Button
                  color="success"
                  text="View"
                  style={{ marginLeft: '2rem', width: 120 }}
                  disabled={!department}
                />
              </Link>
            </DepartmentSelectWrapper>
          );
        }}
      </Query>
      <Link to="new">
        <Button
          color="success"
          text={() => (
            <>
              <FaPlusCircle /> Create Department
            </>
          )}
        />
      </Link>
    </Container>
  );
};

const DepartmentSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;

  select {
    width: 400px;
  }
`;

export default Departments;
