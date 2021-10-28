import React, { useState } from 'react';
import { FastField, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FooterButton from './FooterButton';
import ModalResponseSuccess from './ModalResponseSuccess';
import {
  ContainerFormModal,
  InputContainer,
  InputItem,
  Legend,
} from './styles';
import CustomSelectUnits from 'shared/component/forms/CustomSelectUnits';
import CalendarMonthYearPicker from 'shared/component/CalendarMonthYearPicker';
import CustomSelectUnitScales from 'shared/component/forms/CustomSelectUnitScales';

import { useReports } from 'hook/reports/exportExcell';
import MessageNotification from 'shared/component/messageNotification';
import {
  RadioInput,
  RadioInputGroup,
} from 'shared/component/maskedField/checkBox';
import { InputMaskField } from 'shared/component/forms/CustomMaskField';
import CustomSelectGroups from 'shared/component/forms/CustomSelectGroups';
import datePattern from 'utils/regexPatterns';
const moment = require('moment');

export const formInitialValues = {
  type: 'operational',
  typeDate: 'mensal',
  unit: { id: '' },
  scales: '',
  monthYear: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
  date_start: '',
  date_end: '',
  group: { id: '' },
};

const FormGenerateSpreadSheets = ({ handleCloseModal }) => {
  const { loading, getExport } = useReports();
  const [error, setError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (data) => {
    const params = {
      unit_id: data?.unit?.id,
      group_id: data?.group?.id || null,
      year: data?.typeDate === 'mensal' ? data?.monthYear?.year : null,
      month: data?.typeDate === 'mensal' ? data?.monthYear?.month : null,
      date_start:
        data?.typeDate === 'period'
          ? moment(data?.date_start, 'DD-MM-YYYY').format('YYYY-MM-DD')
          : null,
      date_end:
        data?.typeDate === 'period'
          ? moment(data?.date_end, 'DD-MM-YYYY').format('YYYY-MM-DD')
          : null,
    };
    getExport(
      { type: data?.type, typeDate: data?.typeDate, scales: data?.scales },
      params
    )
      .then(() => {
        setModalSuccess(true);
        setMessage(null);
        setError(false);
      })
      .catch((errorMessage) => {
        setMessage(errorMessage);
        setError(true);
      });
  };

  const [selectedScales, setSelectedScales] = useState(null);
  const [group, setGroup] = useState(null);

  const schema = Yup.object().shape({
    type: Yup.string(),
    typeDate: Yup.string(),
    unit: Yup.object().shape({
      id: Yup.number().typeError('Obrigatório!').required('Obrigatório!'),
    }),
    scales: Yup.array().typeError('Obrigatório!').required('Obrigatório!'),
    monthYear: Yup.object().shape({
      year: Yup.number(),
      month: Yup.number(),
    }),
    date_start: Yup.string()
      .matches(datePattern, { message: 'Data inválida' })
      .test('typeDate', 'Informe uma data válida!', function (value) {
        return this.parent.typeDate !== 'period' || value;
      }),
    date_end: Yup.string()
      .matches(datePattern, { message: 'Data inválida' })
      .test('typeDate', 'Informe uma data válida!', function (value) {
        return this.parent.typeDate !== 'period' || value;
      }),
    group: Yup.object().shape({
      id: Yup.number(),
    }),
  });

  return (
    <ContainerFormModal>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={formInitialValues}
        validateOnBlur
        values
      >
        {({
          setFieldValue,
          setFieldTouched,
          errors,
          values,
          handleBlur,
          touched,
        }) => (
          <Form>
            <InputContainer data-cy="inputContainer_modal_gerar_planilhas">
              <InputItem>
                <Legend>Escolha o tipo de planilha</Legend>
                <RadioInputGroup
                  row
                  name="type"
                  handleChange={(e) => {
                    const { value } = e.target;
                    setFieldValue('type', value);
                    if (value === 'operational')
                      setFieldValue('typeDate', 'mensal');
                  }}
                  value={values?.type}
                  formControlStyle={{ height: 25 }}
                >
                  <RadioInput label="Operacional" value="operational" />
                  <RadioInput label="Operacional MP" value="operationalMP" />
                  <RadioInput label="Financeiro" value="financial" />
                </RadioInputGroup>
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem data-cy="select_hospital">
                <Field
                  name="unit"
                  style={{ width: '100%' }}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder={'Selecione o hospital'}
                  label={'Selecione o hospital'}
                  errors={errors && errors?.unit?.id}
                  handleChange={(data) => {
                    setFieldValue('scales', '');
                    setSelectedScales(null);
                    if (data?.value) setFieldValue('unit.id', data.value);
                    else setFieldValue('unit.id', '');
                  }}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  variant="outlined"
                  component={CustomSelectUnits}
                  isClearable
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem id="InputEscala">
                <Field
                  name="scales"
                  style={{ width: '100%' }}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder={'Selecione a escala'}
                  label={'Selecione a escala'}
                  value={selectedScales}
                  errors={errors && errors?.scales}
                  handleChange={(data) => {
                    setFieldValue('scales', data);
                    setSelectedScales(data);
                  }}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  variant="outlined"
                  component={CustomSelectUnitScales}
                  unit_id={values?.unit?.id && values.unit.id}
                  isMulti
                  isClearable
                />
              </InputItem>
            </InputContainer>
            {values?.type === 'financial' && (
              <InputContainer style={{ margin: '0' }}>
                <InputItem>
                  <RadioInputGroup
                    row
                    name="typeDate"
                    value={String(values?.typeDate)}
                    handleChange={(value) => {
                      setFieldValue('typeDate', value.target.value);
                    }}
                    formControlStyle={{ height: 25 }}
                  >
                    <RadioInput label="Período" value="period" />
                    <RadioInput label="Mensal" value="mensal" />
                  </RadioInputGroup>
                </InputItem>
              </InputContainer>
            )}
            {values?.typeDate === 'mensal' ? (
              <InputContainer>
                <InputItem id="calendar">
                  <Field
                    name="monthYear"
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    value={values.monthYear}
                    errors={errors && errors?.monthYear?.month}
                    touched={touched}
                    label="Mês/Ano"
                    variant="outlined"
                    component={CalendarMonthYearPicker}
                  />
                </InputItem>
              </InputContainer>
            ) : (
              <InputContainer>
                <InputItem style={{ marginRight: 20 }}>
                  <FastField
                    name="date_start"
                    value={values?.date_start}
                    label="Data inicial"
                    style={{ width: '100%' }}
                    format="99/99/9999"
                    variant="outlined"
                    errors={errors && errors.date_start}
                    touched={touched}
                    component={InputMaskField}
                    onChange={(e) => {
                      setFieldValue('date_start', e.target.value);
                    }}
                  />
                </InputItem>
                <InputItem>
                  <FastField
                    name="date_end"
                    value={values?.date_end}
                    label="Data final"
                    style={{ width: '100%' }}
                    format="99/99/9999"
                    variant="outlined"
                    errors={errors && errors.date_end}
                    touched={touched}
                    component={InputMaskField}
                    onChange={(e) => {
                      setFieldValue('date_end', e.target.value);
                    }}
                  />
                </InputItem>
              </InputContainer>
            )}

            {values?.type === 'financial' && (
              <InputContainer data-cy="inputContainer1">
                <InputItem>
                  <Field
                    name="group"
                    style={{ width: '100%' }}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    placeholder={'Selecione o cargo'}
                    errors={errors && errors.group && errors.group.id}
                    value={group}
                    handleChange={(val) => {
                      if (val) {
                        setFieldValue('group.id', val?.value);
                        setFieldValue('group.name', val?.label);
                        setGroup(val);
                      } else {
                        setFieldValue('group.id', '');
                        setFieldValue('group.name', '');
                        setGroup(null);
                      }
                    }}
                    label={'Grupo'}
                    menuList={() => ({
                      height: 116,
                      overflowY: 'auto',
                    })}
                    variant="outlined"
                    component={CustomSelectGroups}
                    touched={touched}
                    handleBlur={handleBlur}
                  />
                </InputItem>
              </InputContainer>
            )}

            <FooterButton
              loading={loading}
              handleCloseModal={handleCloseModal}
            />
          </Form>
        )}
      </Formik>
      <MessageNotification
        openNotification={error}
        closeNotification={() => setError(false)}
        type={'error'}
        message={message}
        vertical={10}
        horizontal="40vw"
      />
      <ModalResponseSuccess
        openModalSuccess={modalSuccess}
        handleCloseModalSuccess={() => setModalSuccess(false)}
      />
    </ContainerFormModal>
  );
};

export default FormGenerateSpreadSheets;
