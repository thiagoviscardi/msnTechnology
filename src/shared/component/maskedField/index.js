import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from '../MaskedInput';

const MaskedField = ({
  name,
  label,
  handleBlur,
  value,
  errors,
  touched,
  handleChange,
  mask,
  placeholder,
}) => (
  <MaskedInput
    variant="outlined"
    value={value}
    mask={mask}
    placeholder={placeholder}
    handleChange={handleChange}
    name={name}
    label={label}
    handleBlur={handleBlur}
    errors={errors}
    touched={touched}
  />
);

MaskedField.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.any]),
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

MaskedField.defaultProps = {
  value: '',
};

export default MaskedField;
