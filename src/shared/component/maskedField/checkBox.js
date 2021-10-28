import React from 'react';
import { ErrorMessage } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import CheckboxUI from '@material-ui/core/Checkbox';
import { FormGroup } from '@material-ui/core';

const Checkbox = ({
  field: { name, value, onChange, onBlur, style },
  id,
  label,
}) => {
  let checkboxId = id;
  let isObject = false;
  if (typeof id === 'object') {
    checkboxId = JSON.stringify(id);
    isObject = true;
  }
  return (
    <FormControlLabel
      control={
        <CheckboxUI
          size="small"
          style={style}
          name={name}
          id={checkboxId}
          checked={value}
          onChange={(event) => {
            onChange(event, isObject);
          }}
          onBlur={onBlur}
        />
      }
      label={label}
    />
  );
};

const CheckboxGroup = ({
  value,
  label,
  children,
  id,
  handleBlur,
  onChange,
  style,
}) => {
  const handleChange = (event, isObject) => {
    const target = event.currentTarget;
    const valueArray = [...value] || [];

    let targetId = target.id;

    if (isObject) {
      targetId = JSON.parse(target.id);
    }

    if (target.checked) {
      valueArray.push(targetId);
    } else {
      valueArray.splice(valueArray.indexOf(targetId), 1);
    }

    onChange(id, valueArray);
  };

  let formControlsAttr = {};

  const hasValue = (childId) => {
    if (typeof childId === 'object') {
      const valueFiltered = value.filter((childrenValue) => {
        return JSON.stringify(childrenValue) === JSON.stringify(childId);
      });
      return valueFiltered.length > 0;
    }
    return value.includes(childId);
  };

  return (
    <FormControl {...formControlsAttr}>
      <FormLabel component="legend" size="small" style={style}>
        {label}
      </FormLabel>
      <FormGroup row>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            field: {
              value: hasValue(child.props.id),
              onChange: handleChange,
              onBlur: handleBlur,
            },
          })
        )}
      </FormGroup>
      <ErrorMessage name={id}>
        {(msg) => (
          <FormHelperText error id="component-error-text">
            {msg}
          </FormHelperText>
        )}
      </ErrorMessage>
    </FormControl>
  );
};

CheckboxGroup.defaultProps = {
  hideFieldset: false,
};

const RadioInputGroup = ({
  children,
  name,
  row,
  handleChange,
  value,
  style,
  formControlStyle,
}) => (
  <FormControl style={formControlStyle}>
    <RadioGroup
      row={row}
      name={name}
      onChange={handleChange}
      value={value}
      style={style}
    >
      {children}
    </RadioGroup>
  </FormControl>
);

RadioInputGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  name: PropTypes.string.isRequired,
  row: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleChange: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]),
  formControlStyle: PropTypes.oneOfType([PropTypes.object]),
};

RadioInputGroup.defaultProps = {
  row: false,
  style: null,
  formControlStyle: {},
};

const RadioInput = ({ value, label, style, color = 'primary', ...rest }) => (
  <FormControlLabel
    control={<Radio style={style} color={color} />}
    value={value}
    label={label}
    {...rest}
  />
);

RadioInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};

const FormInput = ({
  name,
  label,
  handleChange,
  handleBlur,
  value,
  errors,
  touched,
  style,
}) => (
  <FormControl margin="normal">
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Input
      style={style}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      error={errors && errors[name] && touched[name]}
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

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.any]),
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  touched: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

FormInput.defaultProps = {
  value: '',
};

export { FormInput, RadioInput, RadioInputGroup, Checkbox, CheckboxGroup };
