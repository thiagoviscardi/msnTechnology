import React from 'react';
import { useStyles, InputContainer, InputItem, Subtitle } from './styles';
import { Typography } from '@material-ui/core';
import { FastField, Field, Form, Formik } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import { schema } from './schema';
import { initialValues } from './initialValues';
import FooterButton from './components/FooterButton';
import CustomSelectSpecialties from 'shared/component/forms/CustomSelectSpecialties';
import CustomSelectUnits from 'shared/component/forms/CustomSelectUnits';
import CustomSelectProfessionals from 'shared/component/forms/CustomSelectProfessionals';
import CustomSelect from 'shared/component/forms/CustomSelect';
import {
  RadioInput,
  RadioInputGroup,
} from 'shared/component/maskedField/checkBox';

export default function NotificationsForm({
  formInitialValues = initialValues,
  loading = false,
  formSubmit = () => {},
}) {
  const classes = useStyles();

  return (
    <>
      <Formik
        onSubmit={formSubmit}
        validationSchema={schema}
        initialValues={formInitialValues}
        validateOnBlur
        enableReinitialize
      >
        {({ setFieldValue, setFieldTouched, errors, values }) => (
          <Form>
            <Typography className={classes.title}>
              Cadastrar nova notificação
            </Typography>
            <InputContainer>
              <InputItem style={{ flexGrow: 2.05 }}>
                <FastField
                  data-cy="input_nome_hospital"
                  value={values?.name}
                  label="Título"
                  style={{ width: '100%' }}
                  name="title"
                  variant="outlined"
                  component={CustomTextField}
                />
                <Subtitle>
                  Escreva um título de no máximo 40 caracteres
                </Subtitle>
              </InputItem>
            </InputContainer>
            <InputContainer style={{ height: 128 }}>
              <InputItem style={{ flexGrow: 2.05 }}>
                <FastField
                  data-cy="input_description_hospital"
                  value={values?.description}
                  style={{ width: '100%' }}
                  name="text"
                  label="Conteúdo da notificação"
                  placeholder="Conteúdo da notificação"
                  variant="outlined"
                  multiline
                  rows={3}
                  component={CustomTextField}
                />
                <Subtitle>
                  Escreva um conteúdo de no máximo 120 caracteres
                </Subtitle>
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <RadioInputGroup
                  row
                  name="status"
                  handleChange={(value) => {
                    setFieldValue('status', parseInt(value.target.value));
                  }}
                  value={values?.status}
                >
                  <RadioInput value={1} label="Notificação ativa" />
                  <RadioInput value={0} label="Notificação inativa" />
                </RadioInputGroup>
              </InputItem>
            </InputContainer>
            <InputContainer style={{ display: 'none' }}>
              <InputItem>
                <Field
                  name="professiona_type"
                  value={values && values.professiona_type}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder={'Tipo de Profissional'}
                  options={[
                    {
                      value: 'all',
                      label: 'Todos',
                    },
                    {
                      value: 'doctor',
                      label: 'Profissional',
                    },
                    {
                      value: 'professional',
                      label: 'Multi-Profissional',
                    },
                  ]}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  component={CustomSelect}
                />
              </InputItem>
              <InputItem id="specialties">
                <Field
                  name="specialties"
                  style={{ width: '100%' }}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder={'Especialidades'}
                  errors={errors && errors.specialties}
                  value={values && values.specialties}
                  handleChange={(data) => {
                    setFieldValue('specialties', data);
                  }}
                  label={'Especialidades'}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  variant="outlined"
                  component={CustomSelectSpecialties}
                  isMulti
                />
              </InputItem>
            </InputContainer>
            <InputContainer style={{ display: 'none' }}>
              <InputItem>
                <Field
                  name="units"
                  style={{ width: '100%' }}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder={'Hospitais'}
                  label={'Hospitais'}
                  errors={errors && errors.units}
                  value={values && values?.units}
                  handleChange={(data) => {
                    setFieldValue('units', data);
                  }}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  variant="outlined"
                  component={CustomSelectUnits}
                  isMulti
                />
              </InputItem>
            </InputContainer>
            <InputContainer style={{ display: 'none' }}>
              <InputItem>
                <Field
                  name="users"
                  style={{ width: '100%' }}
                  setFieldTouched={setFieldTouched}
                  setFieldValue={setFieldValue}
                  placeholder={'Profissionais'}
                  label={'Profissionais'}
                  errors={errors && errors.users}
                  value={values && values?.users}
                  handleChange={(data) => {
                    setFieldValue(
                      'users',
                      data.map((item) => ({ id: item.value, name: item.label }))
                    );
                  }}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  variant="outlined"
                  component={CustomSelectProfessionals}
                  isMulti
                />
              </InputItem>
            </InputContainer>
            <div style={{ marginRight: 15 }}>
              <FooterButton id={values?.id} type="submit" loading={loading} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
