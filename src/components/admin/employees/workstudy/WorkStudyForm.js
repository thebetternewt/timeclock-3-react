import React, { useState } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import styled from 'styled-components';
import { Formik } from 'formik';

import DepartmentSelect from '../../../shared/DepartmentSelect';
import { Form, Select } from '../../../../styled/elements/Form';
import { ALL_WORK_STUDY_PERIOD } from '../../../../apollo/queries/workStudyPeriod';
import { Button } from '../../../../styled/elements/Button';
// import DateTimePicker from './DateTimePicker';

const WorkStudyForm = ({ employee, departments = [], cancel }) => {
  const [periods, setPeriods] = useState();
  const [period, setPeriod] = useState();
  const [editingDates, setEditingDates] = useState();

  const getDepartmentName = id => departments.find(dept => dept.id === id).name;

  const getPeriod = id => periods.find(period => period.id === id);

  const toggleEditingDates = () => setEditingDates(!editingDates);

  return (
    <Formik
      initialValues={{
        deptId: '',
        year: '',
        workStudyPeriodId: '',
        startDate: '',
        endDate: '',
      }}
    >
      {({ values, handleChange, setFieldValue }) => {
        console.log('values:', values);
        return (
          <Form>
            <label htmlFor="deptId"> Department</label>
            <DepartmentSelect
              name="deptId"
              departments={departments}
              handleChange={handleChange}
            />

            <label htmlFor="year">Year</label>
            <Select
              name="year"
              onChange={e => {
                setFieldValue('workStudyPeriodId', '');
                handleChange(e);
              }}
            >
              <option value="">Choose year.</option>
              <option value={new Date().getFullYear() - 1}>
                {new Date().getFullYear() - 1}
              </option>
              <option value={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
              <option value={new Date().getFullYear() + 1}>
                {new Date().getFullYear() + 1}
              </option>
            </Select>

            <label htmlFor="workStudyPeriodId">Work study period</label>
            <Query
              query={ALL_WORK_STUDY_PERIOD}
              variables={{ year: parseInt(values.year, 10) }}
            >
              {({ data, loading, error }) => {
                let periodOptions = (
                  <option value="">No work study periods found.</option>
                );

                if (data && data.allWorkStudyPeriod) {
                  if (!periods) {
                    setPeriods(data.allWorkStudyPeriod);
                  }

                  periodOptions = data.allWorkStudyPeriod.map(period => (
                    <option key={period.id} value={period.id}>
                      {period.name}
                    </option>
                  ));
                }

                return (
                  <Select
                    name="workStudyPeriodId"
                    onChange={e => {
                      setPeriod(getPeriod(e.target.value));
                      handleChange(e);
                    }}
                  >
                    <option value="">Choose work study period.</option>
                    {periodOptions}
                  </Select>
                );
              }}
            </Query>

            {values.deptId && values.year && values.workStudyPeriodId && (
              <>
                <WorkStudyDescription>
                  <span>{employee.name}</span> is eligible for work study in{' '}
                  <span>{getDepartmentName(values.deptId)}</span> during{' '}
                  <span>
                    {period.name} {values.year} (
                    {moment(period.startDate).format('MMM DD')} -{' '}
                    {moment(period.endDate).format('MMM DD')})
                  </span>
                  .
                </WorkStudyDescription>

                <p> Is this correct?</p>
                <ModalActions>
                  <Button
                    type="submit"
                    text="Yes"
                    color="success"
                    onClick={cancel}
                  />
                  <Button
                    text="Edit Dates"
                    color="primary"
                    onClick={e => {
                      e.preventDefault();
                      toggleEditingDates();
                    }}
                  />
                  <Button text="Cancel" color="danger" onClick={cancel} />
                </ModalActions>

                {/* {editingDates && <DateTimePicker />} */}
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

const WorkStudyDescription = styled.p`
  span {
    font-weight: 600;
  }
`;

const ModalActions = styled.div`
  display: flex;

  button {
    margin-right: 1rem;
  }
`;

export default WorkStudyForm;
