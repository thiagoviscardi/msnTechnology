import React, { useEffect } from 'react';
import { useStyles, FormContainer, InputContainer, InputItem } from './styles';
import { Typography } from '@material-ui/core';
import { FastField, Field, Form, Formik } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import { InputMaskField } from 'shared/component/forms/CustomMaskField';
import { schema } from './schema';
import { initialValues } from './initialValues';
import FooterButton from './components/FooterButton';
import CustomSelectCities from 'shared/component/forms/CustomSelectCities';
import CustomSelectStates from 'shared/component/forms/CustomSelectStates';
export default function EnterprisesForm({
  formInitialValues = initialValues,
  isEdit = false,
  loading = false,
  status = true,
  formSubmit = () => {},
}) {
  const classes = useStyles();
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');

  const handleChangeState = (val) => {
    setSelectedState(val);
  };

  const mountStateEdit = () => {
    if (isEdit && formInitialValues?.address?.city) {
      const { id, name } = formInitialValues?.address?.city?.state;
      setSelectedState({ value: id, label: name });
      mountCityEdit();
    }
  };

  const mountCityEdit = () => {
    const { id, name } = formInitialValues?.address?.city;
    setSelectedCity({ value: id, label: name });
  };

  const getInitialCity = (city) => {
    return {
      value: city.id,
      label: city.name,
    };
  };

  useEffect(() => {
    mountStateEdit();
  }, []);

  return (
    <>
      <div style={{ marginTop: 30 }}>
        <Typography className={classes.registerTitle}>
          {isEdit ? 'Editar empresa' : 'Cadastrar nova empresa'}
        </Typography>
      </div>
      <Formik
        onSubmit={formSubmit}
        validationSchema={schema}
        initialValues={formInitialValues}
        validateOnBlur
        enableReinitialize
      >
        {({ setFieldValue, touched, errors, values }) => (
          <Form>
            <Typography className={classes.dataHospital}>
              Dados da empresa
            </Typography>
            <InputContainer>
              <InputItem style={{ flexGrow: 2.05 }}>
                <FastField
                  value={values.name}
                  label="Nome da empresa"
                  style={{ width: '100%' }}
                  name="name"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem data-cy="input_cnpj">
                <FastField
                  name="cnpj"
                  label="CNPJ"
                  style={{ width: '100%' }}
                  format="99.999.999/9999-99"
                  variant="outlined"
                  value={values.cnpj}
                  errors={errors && errors.cnpj}
                  touched={touched}
                  component={InputMaskField}
                  onChange={(e) => {
                    setFieldValue('cnpj', e.target.value);
                  }}
                />
              </InputItem>
            </InputContainer>
            <Typography className={classes.address}>Endereço</Typography>
            <InputContainer>
              <InputItem style={{ flexGrow: 2 }}>
                <FastField
                  data-cy="input_street"
                  value={values?.address?.street}
                  label="Rua"
                  style={{ width: '100%' }}
                  name="address.street"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem>
                <FastField
                  data-cy="input_number"
                  value={values?.address?.number}
                  label="Número"
                  style={{ width: '100%' }}
                  mask="9999"
                  name="address.number"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem style={{ flexGrow: 2 }}>
                <FastField
                  data-cy="input_complement"
                  value={values?.address?.complement}
                  label="Complemento"
                  style={{ width: '100%' }}
                  name="address.complement"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem style={{ flexGrow: 2 }}>
                <FastField
                  data-cy="input_district"
                  value={values?.address?.district}
                  label="Setor"
                  style={{ width: '100%' }}
                  name="address.district"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem data-cy="input_code_post">
                <FastField
                  name="address.code_post"
                  label="CEP"
                  style={{ width: '100%' }}
                  format="99999-999"
                  variant="outlined"
                  value={values?.address?.code_post}
                  errors={errors && errors?.address?.code_post}
                  touched={touched}
                  component={InputMaskField}
                  onChange={(e) => {
                    setFieldValue('address.code_post', e.target.value);
                  }}
                />
              </InputItem>
              <InputItem data-cy="input_state">
                <Field
                  name="address.city.state.id"
                  placeholder="Estados"
                  value={selectedState}
                  handleChange={(val) => {
                    handleChangeState(val);
                    setFieldValue('address.city.state.id', val.value);
                  }}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  errors={
                    errors.address &&
                    errors.address.city &&
                    errors.address.city.state &&
                    errors.address.city.state.id
                  }
                  component={CustomSelectStates}
                />
              </InputItem>
              <InputItem data-cy="input_city">
                <Field
                  name="address.city.id"
                  placeholder="Cidades"
                  handleChange={(val) => {
                    setFieldValue('address.city.id', val.value);
                    setFieldValue('address.city.name', val.label);
                  }}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  stateId={selectedState?.value}
                  component={CustomSelectCities}
                  data={selectedCity}
                  value={
                    values?.address &&
                    values?.address?.city &&
                    values?.address?.city.id !== ''
                      ? getInitialCity(values.address.city)
                      : null
                  }
                  errors={
                    errors.address &&
                    errors.address.city &&
                    errors.address.city.id
                  }
                />
              </InputItem>
            </InputContainer>
            <FormContainer style={{ marginTop: 30, height: 128 }}>
              <div style={{ height: 128, width: '100%' }}>
                <Typography className={classes.title_geolocation}>
                  Observações
                </Typography>
                <FastField
                  data-cy="input_description"
                  value={values?.description}
                  style={{ width: '100%' }}
                  name="description"
                  variant="outlined"
                  multiline
                  rows={2}
                  component={CustomTextField}
                />
              </div>
            </FormContainer>
            <div style={{ marginRight: 15 }}>
              <FooterButton
                id={values?.id}
                type="submit"
                status={status}
                loading={loading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
