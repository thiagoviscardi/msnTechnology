import React from 'react';
import { ErrorMessage } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

const MaskedInput = ({
  name,
  label,
  handleChange,
  handleBlur,
  value,
  errors,
  touched,
  mask,
  className,
  variant,
  style,
}) => (
  <FormControl variant="outlined">
    <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
    <InputMask
      style={style}
      className={className}
      mask={mask}
      value={value}
      variant={variant}
      onChange={handleChange}
      name={name}
      onBlur={handleBlur}
      error={errors && errors[name] && touched[name]}
    >
      {(inputProps) => <Input {...inputProps} />}
    </InputMask>
    <ErrorMessage name={name}>
      {(msg) => (
        <FormHelperText error id="component-error-text">
          {msg}
        </FormHelperText>
      )}
    </ErrorMessage>
  </FormControl>
);

MaskedInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.any]),
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

MaskedInput.defaultProps = {
  value: '',
};

export default MaskedInput;
