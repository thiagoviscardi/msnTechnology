import React from 'react';
import { TextField, FormHelperText, InputAdornment } from '@material-ui/core';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: white;
    }
    & .MuiOutlinedInput-input {
      padding: 12px 12px;
    }
    & .MuiInputLabel-outlined[data-shrink='false'] {
      transform: translate(14px, 14px) scale(1);
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

function InputComponent({
  field,
  label,
  form: { touched, errors },
  endAdornment,
  ...props
}) {
  return (
    <>
      <StyledTextField
        {...field}
        {...props}
        label={label}
        error={Boolean(touched[field.name] && errors[field.name])}
        fullWidth
        variant="outlined"
        InputProps={
          endAdornment
            ? {
                endAdornment: (
                  <InputAdornment position="end">{endAdornment}</InputAdornment>
                ),
              }
            : null
        }
      />
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
}

export default InputComponent;
