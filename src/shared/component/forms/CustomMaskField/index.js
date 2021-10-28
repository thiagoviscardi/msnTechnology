import React from 'react';
import { FormHelperText, TextField } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import NumberFormat from 'react-number-format';

import InputMask from 'react-input-mask';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
}

const CustomMaskField = (props) => {
  const { field, format, mask, label, onChange, placeholder } = props;
  return (
    <>
      <TextField
        {...field}
        {...props}
        value={field.value}
        onChange={onChange}
        name={field.name}
        label={label}
        placeholder={placeholder}
        InputProps={{
          inputComponent: NumberFormatCustom,
          inputProps: {
            mask,
            format,
          },
        }}
      />
      <ErrorMessage name={field.name}>
        {(msg) => (
          <FormHelperText error id="component-error-text">
            {msg}
          </FormHelperText>
        )}
      </ErrorMessage>
    </>
  );
};

export const InputMaskField = ({
  field,
  name,
  format,
  value,
  label,
  onChange,
  handleBlur = () => {},
  maskChar,
  errors,
  touched,
  ...props
}) => {
  const maskRef = React.createRef(null);

  return (
    <>
      <InputMask
        {...field}
        {...props}
        mask={format}
        maskChar={maskChar && maskChar}
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        onBlur={handleBlur}
        error={errors && errors[name] && touched[name]}
      >
        {(inputProps) => <TextField inputRef={maskRef} {...inputProps} />}
      </InputMask>
      <ErrorMessage name={field.name}>
        {(msg) => (
          <FormHelperText error id="component-error-text">
            {msg}
          </FormHelperText>
        )}
      </ErrorMessage>
    </>
  );
};

export default CustomMaskField;
