import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';

import { useConfig } from 'hook/config';
import useScales from 'hook/scales';
import useSpecialties from 'hook/useSpecialties';

import filterImg from '../../../asset/icons/filter_24px.svg';
import closeImg from '../../../asset/icons/close_24px.svg';

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';

const FilterModal = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [state] = useState({
    pageSpecialties: 1,
    perPageSpecialties: 20,
    searchSpecialties: '',
    pageScales: 1,
    perPageScales: 20,
    search: '',
  });
  const [optionsStatus] = useState([
    { id: 0, name: 'Realizado' },
    { id: 1, name: 'Ocorrendo' },
    { id: 2, name: 'Atrasado' },
    { id: 3, name: 'Cancelado' },
    { id: 4, name: 'Escalado' },
    { id: 5, name: 'Trocado' },
  ]);

  const { config } = useConfig();
  const { getSpecialties, specialties } = useSpecialties();
  const { getFilterScales, scalesFilter } = useScales();

  const { dataSpecialties } = specialties;
  const { dataScalesFilter } = scalesFilter;

  useEffect(() => {
    getSpecialties(pageSpecialties, perPageSpecialties, searchSpecialties);
  }, [pageSpecialties, searchSpecialties]);

  useEffect(() => {
    getFilterScales(pageScales, perPageScales, config.hospitalData[0]?.id);
  }, [config]);

  const {
    perPageSpecialties,
    pageSpecialties,
    searchSpecialties,
    pageScales,
    perPageScales,
  } = state;
  return (
    <>
      <div onClick={() => setOpenFilter(!openFilter)}>
        <img src={filterImg} alt="icon filter" />
        <span>Filtros</span>
      </div>
      {openFilter && (
        <>
          <div>Teste</div>
        </>
      )}

      {openFilter && (
        <Formik initialValues={{ name: '', status: '', scale: '' }}>
          {() => (
            <form
              style={{
                width: 536,
                height: 288,
                background: '#ffffff',
                borderRadius: '4px',
                position: 'absolute',
                top: 0,
                left: 70,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <header
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1.25rem 1rem',
                }}
              >
                <img src={filterImg} alt="filter icon" />
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    marginLeft: '12px',
                  }}
                >
                  Filtros
                </h3>
              </header>
              <div
                style={{
                  // marginTop: 12,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 140px)',
                  columnGap: 24,
                  height: 180,
                  marginBottom: 25,
                  width: '100%',
                  padding: '0 1rem',
                  justifyContent: 'center',
                  alignItems: 'baseline',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: 12 }}>Filtrar por status:</p>
                  {/* {optionsStatus.map((status) => status)} */}
                  <FormGroup style={{ height: '100%' }}>
                    {optionsStatus.map((status, i) => (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            // checked={state.checkedA}
                            // checked
                            // onChange={handleChange}
                            name="checkedA"
                            size="small"
                            style={{ width: 23, height: 23 }}
                          />
                        }
                        label={
                          <span style={{ fontSize: 11 }}>{status.name}</span>
                        }
                        style={{ minWidth: 100 }}
                      />
                    ))}
                  </FormGroup>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: 12 }}>Filtrar por área:</p>
                  <FormGroup
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      maxHeight: 160,
                      overflowY: 'auto',
                    }}
                  >
                    {dataSpecialties.map((status, i) => (
                      <FormControlLabel
                        key={i}
                        value={status.id}
                        control={
                          <Checkbox
                            // checked={state.checkedA}
                            // checked
                            // onChange={handleChange}
                            name="checkedA"
                            size="small"
                            style={{ width: 23, height: 23 }}
                          />
                        }
                        label={<p style={{ fontSize: 11 }}>{status.name}</p>}
                        style={{
                          width: '150px',
                          // paddingLeft: '5px',
                          padding: '5px 0 0 0',
                          margin: 0,
                          marginLeft: '80px',
                          lineHeight: 0,
                        }}
                      />
                    ))}
                  </FormGroup>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: 12 }}>Filtrar por escala:</p>
                  <FormGroup
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      maxHeight: 160,
                      overflowY: 'auto',
                    }}
                  >
                    {dataScalesFilter.map((status, i) => (
                      <FormControlLabel
                        key={i}
                        value={status?.id}
                        control={
                          <Checkbox
                            // checked={state.checkedA}
                            // checked
                            // onChange={handleChange}
                            name="checkedA"
                            size="small"
                            style={{ width: 23, height: 23 }}
                          />
                        }
                        label={<p style={{ fontSize: 11 }}>{status?.name}</p>}
                        style={{
                          width: '150px',
                          // paddingLeft: '5px',
                          padding: '5px 0 0 0',
                          margin: 0,
                          marginLeft: '80px',
                          lineHeight: 0,
                        }}
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: 32,
                  justifyContent: 'flex-end',
                  background: '#f5f5f5',
                }}
              >
                <Button
                  style={{
                    textTransform: 'none',
                    fontSize: 12,
                    color: '#A2A5A8',
                  }}
                >
                  <img
                    src={closeImg}
                    alt="close icon"
                    style={{ marginRight: 12 }}
                  />
                  Limpar todos
                </Button>
              </div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default FilterModal;
