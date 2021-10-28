import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { FormHelperText } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import { useProfessional } from 'hook/professional/index';
import { customStyles } from './styles';

const CustomSelectProfessionals = ({
  name,
  field,
  placeholder,
  handleChange,
  value,
  menuList,
  errors,
  unit_id = null,
  group_id = null,
  group_type = null,
  isMulti = false,
  isClearable = true,
}) => {
  const { data, total, loading, getProfessionals } = useProfessional();

  const page_ref = useRef(1);

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 30,
    search: '',
    unit_id,
    group_id,
    group_type,
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
    getProfessionals({ ...filter, unit_id });
  }, [filter, unit_id]);

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
export default CustomSelectProfessionals;
