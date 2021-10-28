import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { FormHelperText } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { useGroups } from 'hook/groups/index';
import { customStyles } from './styles';

const CustomSelectGroups = ({
  name,
  field,
  placeholder,
  handleChange,
  value,
  menuList,
  errors,
  isMulti = false,
  isClearable = true,
  touched,
  handleBlur,
  setFieldTouched,
}) => {
  const { data, total, loading, getList } = useGroups();

  const page_ref = useRef(1);

  const [filter, setFilter] = useState({
    type: 2,
    page: 1,
    per_page: 30,
    search: '',
  });
  const { page, per_page } = filter;

  const [formatedLabels, setFormatedLabels] = useState([]);

  const searchItem = (unitValue) => {
    setFilter((oldState) => ({
      ...oldState,
      page: 1,
      search: unitValue,
    }));
  };

  const pagination = () => {
    const totalPage = Math.ceil(total / per_page);
    const nextPage = page_ref.current + 1;
    if (page < totalPage) {
      setFilter((oldState) => ({
        ...oldState,
        page: nextPage,
      }));

      page_ref.current = nextPage;
    }
  };

  const toTopPagination = () => {
    if (per_page > 1) {
      let prevPage = page_ref.current - 1;
      prevPage = prevPage > 0 ? prevPage : 1;
      setFilter((oldState) => ({
        ...oldState,
        page: prevPage,
      }));

      page_ref.current = prevPage;
    }
  };

  useEffect(() => {
    getList(filter);
  }, [filter]);

  useEffect(() => {
    if (data && data.length > 0) {
      const labelCountry = data.map((country) => ({
        label: country.name,
        value: country.id,
      }));
      setFormatedLabels(labelCountry);
    }
  }, [data]);

  return (
    <>
      <Select
        placeholder={placeholder}
        isLoading={loading}
        loadingMessage={() => 'Carregando'}
        styles={customStyles(menuList)}
        name={name}
        options={formatedLabels}
        onInputChange={searchItem}
        onMenuScrollToBottom={pagination}
        onMenuScrollToTop={toTopPagination}
        onChange={handleChange}
        value={value}
        noOptionsMessage={() => 'Nenhum resultado encontrado'}
        isMulti={isMulti}
        isClearable={isClearable}
        textFieldProps={{
          error: errors && errors[name] && touched[name],
          // label,
          InputLabelProps: {
            shrink: true,
          },
          style: {
            backgroundColor: '#fff',
          },
        }}
        onBlur={handleBlur}
        onFocus={() => setFieldTouched(name, true, false)}
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
export default CustomSelectGroups;
