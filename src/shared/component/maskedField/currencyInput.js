import React from 'react';
import { ErrorMessage } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={({ floatValue }) => {
        onChange(floatValue);
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      prefix="R$ "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CurrencyInput = ({
  name,
  label,
  handleBlur,
  value,
  errors,
  touched,
  setFieldValue,
  className,
  widthStyle,
}) => (
  <FormControl>
    <TextField
      style={{ width: widthStyle }}
      className={className}
      name={name}
      label={label}
      value={value}
      variant="outlined"
      onChange={(val) => {
        setFieldValue(name, val);
      }}
      onBlur={handleBlur}
      error={errors && errors[name] && touched[name]}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
    <ErrorMessage name={name}>
      {(msg) => (
        <FormHelperText error id="component-error-text">
          {msg}
        </FormHelperText>
      )}
    </ErrorMessage>
  </FormControl>
);

CurrencyInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  setFieldValue: PropTypes.func,
  handleblur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.any]),
  errors: PropTypes.oneOfType([PropTypes.object]),
  touched: PropTypes.oneOfType([PropTypes.object]),
};

CurrencyInput.defaultProps = {
  value: '',
};

export default CurrencyInput;
