import React from 'react';
import Monthpicker from '@compeon/monthpicker';
import moment from 'moment';
import { ErrorMessage } from 'formik';
import { FormHelperText } from '@material-ui/core';
import { StyledTextField } from './styles';

const CalendarMonthYearPicker = ({
  name = 'monthYear',
  setFieldValue,
  value,
  errors,
  field,
  touched,
}) => {
  const onMonthYearChange = (data) => {
    setFieldValue(name, data);
  };

  const renderValue =
    value.month === ''
      ? ''
      : `${moment(value.month, 'M').format('MMMM')} / ${value.year}`;
  const currentYear =
    value.month === '' ? new Date().getFullYear() : value.year;

  return (
    <>
      <Monthpicker
        locale="pt"
        onChange={onMonthYearChange}
        month={value.month}
        year={currentYear}
      >
        <StyledTextField
          data-cy="inputCalendar"
          style={{ width: '100%' }}
          label="Mês/Ano"
          variant="outlined"
          value={renderValue}
          error={errors && errors[name] && touched[name]}
        />
      </Monthpicker>
      {field ? (
        <ErrorMessage name={field.name}>
          {() => (
            <FormHelperText error id="component-error-text">
              {errors}
            </FormHelperText>
          )}
        </ErrorMessage>
      ) : (
        <>
          {errors && (
            <ErrorMessage name={name}>
              {() => (
                <FormHelperText error id="component-error-text">
                  {errors}
                </FormHelperText>
              )}
            </ErrorMessage>
          )}
        </>
      )}
    </>
  );
};

export default CalendarMonthYearPicker;
