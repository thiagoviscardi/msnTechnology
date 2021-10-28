import React from 'react';
import Select from 'react-select';
import { FormHelperText } from '@material-ui/core';
import { ErrorMessage } from 'formik';

const CustomSelect = ({
  name,
  field,
  options,
  loading,
  placeholder,
  handleChange,
  value,
  menuList,
  searchItem,
  pagination,
  toTopPagination,
  errors,
  isSlim = false,
  isProf = true,
  isMulti = false,
  isClearable = false,
  isDisabled,
}) => {
  const customStyles = {
    control: () => ({
      display: 'flex',
      width: '100%',
      minHeight: !isProf ? 39 : 56,
      border: isProf ? '1px solid #A2A5A8' : '',
      borderRadius: 4,
      fontSize: isSlim ? 12 : 14,
    }),
    menuList,
    menu: (props) => ({ ...props, zIndex: 10 }),
  };
  return (
    <>
      <Select
        isDisabled={isDisabled}
        placeholder={placeholder}
        isLoading={loading}
        loadingMessage={() => 'Carregando'}
        styles={customStyles}
        name={name}
        options={options}
        onInputChange={searchItem}
        onMenuScrollToBottom={() => pagination && pagination()}
        onMenuScrollToTop={() => toTopPagination && toTopPagination()}
        onChange={handleChange}
        value={value}
        noOptionsMessage={() => 'Nenhum resultado encontrado'}
        isMulti={isMulti}
        isProf={isProf}
        isClearable={isClearable}
      />
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
export default CustomSelect;
