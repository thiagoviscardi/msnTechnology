import React from 'react';
import Select from 'react-select';
import { FormHelperText } from '@material-ui/core';
import { ErrorMessage } from 'formik';

const CustomSelect = (props) => {
  const {
    field,
    setFieldTouched,
    setFieldValue,
    options,
    loading,
    placeholder,
    state,
    setState,
    menuList,
    value,
  } = props;

  const customStyles = {
    control: () => ({
      display: 'flex',
      width: '100%',
      height: 56,
      border: '1px solid #A2A5A8',
      borderRadius: 4,
    }),
    menu: (props) => ({ ...props, zIndex: 10 }),
    menuList,
  };
  const [selectedOption, setOptionState] = React.useState({
    label: value?.name,
    value: value?.id,
  });
  const handleChange = (val) => {
    setOptionState(val);
    setFieldTouched(field.name);
    setState({ ...state, stateId: val.value });
    if (!val) {
      setFieldValue(field.name, '');
      return;
    }
    setFieldValue(field.name, val.value);
  };
  return (
    <>
      <Select
        placeholder={
          typeof selectedOption.label !== 'undefined'
            ? selectedOption.label
            : placeholder
        }
        isLoading={loading}
        loadingMessage={() => 'Carregando'}
        styles={customStyles}
        id={field.name}
        name={field.name}
        options={options}
        onChange={handleChange}
        value={selectedOption.value}
        noOptionsMessage={() => 'Nenhum resultado encontrado'}
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
export default CustomSelect;
