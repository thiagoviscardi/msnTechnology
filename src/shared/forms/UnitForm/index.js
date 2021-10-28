import React, { useEffect } from 'react';
import { useStyles, FormContainer, InputContainer, InputItem } from './styles';
import { Typography } from '@material-ui/core';
import { FastField, Field, Form, Formik } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import CustomMaskField from 'shared/component/forms/CustomMaskField';
import SwitchComponent from 'shared/component/switchComponent';
import { stateList } from 'shared/stateList';
import { schema } from './schema';
import { initialValues } from './initialValues';
import HeaderForm from './components/HeaderForm';
import FooterButton from './components/FooterButton';
import CustomSelect from 'shared/component/forms/CustomSelect';
import useCities from 'hook/cities';
import DocsImportComponent from './components/DocsImportComponent';
import { useTimezones } from 'hook/timezones';
import CustomSelectCities from 'shared/component/forms/CustomSelectCities';
import CustomSelectStates from 'shared/component/forms/CustomSelectStates';

export default function UnitForm({
  formInitialValues = initialValues,
  isLoading = false,
  isEdit = false,
  status = true,
  formSubmit = () => {},
}) {
  const classes = useStyles();
  const { cities, getCities } = useCities();
  const { data: timezonesList, getList: getListTimezones } = useTimezones();
  const { data } = cities;

  const [state, setState] = React.useState({
    previewUrl: '',
    doc: [],
    citiesByState: [],
    stateId: 0,
    statusNotification: false,
  });
  const { stateId } = state;

  const [selectedState, setSelectedState] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedTimezone, setSelectedTimezone] = React.useState('');
  const [fileLogo, setFileLogo] = React.useState(null);
  const [docs, setDocs] = React.useState(null);

  const handleChangeState = (val) => {
    setSelectedState(val);
    if (val?.value) setState({ ...state, stateId: val.value });
  };

  const allStates = stateList.map((state) => ({
    label: state.name,
    value: state.id,
  }));

  useEffect(() => {
    getCities(stateId, { per_page: 100 });
  }, [stateId]);

  useEffect(() => {
    if (data && data.length > 0) {
      const labelCities = data.map((city) => ({
        label: city.name,
        value: city.id,
      }));
      setState({ ...state, citiesByState: labelCities });
    }
  }, [data]);

  const mountStateEdit = () => {
    if (isEdit) {
      const { id, name } = formInitialValues?.address?.city?.state;
      setSelectedState({ value: id, label: name });
      setState((oldState) => ({
        ...oldState,
        stateId: formInitialValues?.address?.city.state?.id,
      }));
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

  const mountTimezoneEdit = () => {
    if (isEdit) {
      const { id, name } = formInitialValues?.setting_timezone;
      setSelectedTimezone({ value: id, label: name });
    }
  };

  useEffect(() => {
    getListTimezones({ page: 1, per_page: 24 });
    mountStateEdit();
    mountTimezoneEdit();
  }, []);

  const handleFormSubmit = (data) => {
    data.file = fileLogo;
    data.docs = docs;

    formSubmit(data);
  };

  return (
    <>
      <HeaderForm
        formInitialValues={formInitialValues}
        setFileLogo={setFileLogo}
      />
      <Formik
        onSubmit={handleFormSubmit}
        validationSchema={schema}
        initialValues={formInitialValues}
        validateOnBlur
        enableReinitialize
      >
        {({ setFieldValue, handleChange, errors, values }) => (
          <Form>
            <Typography className={classes.dataHospital}>
              Dados do hospital
            </Typography>
            <InputContainer>
              <InputItem style={{ flexGrow: 2.05 }}>
                <FastField
                  data-cy="input_nome_hospital"
                  value={values?.name}
                  label="Nome do hospital"
                  style={{ width: '100%' }}
                  name="name"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem>
                <FastField
                  data-cy="input_email_hospital"
                  value={values?.email}
                  label="E-mail"
                  style={{ width: '100%' }}
                  name="email"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <FastField
                  data-cy="input_razao_social_hospital"
                  value={values?.social_name}
                  label="Razão Social"
                  style={{ width: '100%' }}
                  name="social_name"
                  variant="outlined"
                  component={CustomTextField}
                  marginTop={0}
                />
              </InputItem>
              <InputItem>
                <FastField
                  data-cy="input_cnpj_hospital"
                  value={values?.cnpj}
                  label="CNPJ"
                  style={{ width: '100%' }}
                  mask=""
                  format="##.###.###/####-##"
                  name="cnpj"
                  variant="outlined"
                  component={CustomMaskField}
                  onChange={handleChange}
                />
              </InputItem>
              <InputItem>
                <FastField
                  data-cy="input_cell_phone_hospital"
                  value={values?.cell_phone}
                  name="cell_phone"
                  id="cell_phone"
                  style={{ width: '100%' }}
                  label="Telefone"
                  mask=""
                  format="(##) ####-####"
                  variant="outlined"
                  component={CustomMaskField}
                  onChange={handleChange}
                />
              </InputItem>
            </InputContainer>
            <Typography className={classes.address}>Endereço</Typography>
            <InputContainer>
              <InputItem style={{ flexGrow: 2 }}>
                <FastField
                  data-cy="input_street_hospital"
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
                  data-cy="input_number_hospital"
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
                  data-cy="input_complement_hospital"
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
                  data-cy="input_district_hospital"
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
              <InputItem>
                <FastField
                  data-cy="input_code_post_hospital"
                  value={values?.address?.code_post}
                  name="address.code_post"
                  mask=""
                  format="#####-###"
                  variant="outlined"
                  label="CEP"
                  style={{ width: '100%' }}
                  component={CustomMaskField}
                  onChange={handleChange}
                />
              </InputItem>
              <InputItem data-cy="input_state_hospital">
                <Field
                  name="address.city.state.id"
                  placeholder="Estados"
                  options={allStates}
                  value={selectedState}
                  handleChange={(val) => {
                    if (val?.value) {
                      handleChangeState(val);
                      setFieldValue('address.city.state.id', val.value);
                    } else {
                      handleChangeState(null);
                      setFieldValue('address.city.state.id', '');
                    }
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
              <InputItem data-cy="input_city_hospital">
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
            <FormContainer style={{ marginTop: 48, height: 148 }}>
              <div className={classes.geoContainer}>
                <Typography className={classes.title_geolocation}>
                  Geolocalização (* distância mínima em metros para marcar
                  checkin)
                </Typography>
                <div style={{ height: 20 }} />
                <div className={classes.geo_inputs}>
                  <FastField
                    value={values?.address.geolocation}
                    name="address.geolocation"
                    setFieldValue={setFieldValue}
                    active="Geolocalização ativa"
                    inactive="Geolocalização inativa"
                    component={SwitchComponent}
                  />
                  <div style={{ display: 'flex' }}>
                    <FastField
                      id="Latitude"
                      value={values?.address.latitude}
                      name="address.latitude"
                      style={{ width: 200 }}
                      label="Latitude"
                      variant="outlined"
                      component={CustomTextField}
                    />
                    <div style={{ width: 20 }} />
                    <FastField
                      id="longitude"
                      value={values?.address.longitude}
                      name="address.longitude"
                      label="Longitude"
                      variant="outlined"
                      component={CustomTextField}
                    />
                    <div style={{ width: 20 }} />
                    <FastField
                      value={values?.address.distance}
                      style={{ width: 150 }}
                      type="number"
                      inputProps={{ min: 0 }}
                      name="address.distance"
                      label="Distância"
                      variant="outlined"
                      component={CustomTextField}
                    />
                  </div>
                </div>
              </div>
            </FormContainer>
            <InputContainer>
              <InputItem data-cy="input_timezone_hospital">
                <Field
                  name="setting_timezone.id"
                  placeholder="Fuso horário"
                  options={timezonesList}
                  value={selectedTimezone}
                  setFieldValue={setFieldValue}
                  handleChange={(val) => {
                    setSelectedTimezone(val);
                    setFieldValue('setting_timezone.id', val.value);
                  }}
                  menuList={() => ({ height: 116, overflowY: 'auto' })}
                  errors={
                    errors &&
                    errors.setting_timezone &&
                    errors.setting_timezone.id
                  }
                  component={CustomSelect}
                />
              </InputItem>
              <InputItem>
                <FastField
                  value={values?.tolerance}
                  style={{ width: '100%' }}
                  type="number"
                  inputProps={{ min: 0 }}
                  name="tolerance"
                  label="Tolerância  (*Tolerância de tempo, em minutos, para marcar checkin)"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <FormContainer style={{ marginTop: 30, height: 128 }}>
              <div style={{ height: 128, width: '100%' }}>
                <Typography className={classes.title_geolocation}>
                  Observações
                </Typography>
                <FastField
                  data-cy="input_description_hospital"
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
            <Typography
              style={{ marginTop: 48, marginBottom: 10 }}
              className={classes.dataHospital}
            >
              Documentos
            </Typography>
            <DocsImportComponent
              setDocs={setDocs}
              setFieldValue={setFieldValue}
            />
            <div data-cy="footerButton" style={{ marginRight: 15 }}>
              <FooterButton
                id={values?.id}
                type="submit"
                loading={isLoading}
                status={status}
                validate={errors}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
