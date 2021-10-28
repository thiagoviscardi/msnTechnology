import React from 'react';
import { TextField, FormHelperText } from '@material-ui/core';
import { ErrorMessage } from 'formik';

const CustomTextField = ({ field, label, variant, rows, ...props }) => {
  const { multiline } = props;
  return (
    <div>
      <TextField
        {...field}
        {...props}
        value={field.value}
        name={field?.name}
        // onBlur={onBlur}
        multiline={multiline}
        rows={rows}
        label={label}
        variant={variant}
      />
      <ErrorMessage name={field?.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </div>
  );
};
export default CustomTextField;
