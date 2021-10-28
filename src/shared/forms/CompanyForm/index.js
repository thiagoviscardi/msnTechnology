import React, { useEffect } from 'react';
import { useStyles, InputContainer, InputItem } from './styles';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import { FastField, Field, Form, Formik } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import CustomMaskField from 'shared/component/forms/CustomMaskField';
import { stateList } from 'shared/stateList';
import { schema } from './schema';
import { initialValues } from './initialValues';
import HeaderForm from './components/HeaderForm';
import FooterButton from './components/FooterButton';
import useCities from 'hook/cities';
import CustomSelectCities from 'shared/component/forms/CustomSelectCities';
import CustomSelectStates from 'shared/component/forms/CustomSelectStates';
import CustomRichText from 'shared/customRichText';

export default function CompanyForm({
  formInitialValues = initialValues,
  loading = false,
  isEdit = false,
  formSubmit = () => {},
}) {
  const classes = useStyles();
  const { cities, getCities } = useCities();
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
  const [fileLogo, setFileLogo] = React.useState(null);

  const handleChangeState = (val) => {
    setSelectedState(val);
    setState({ ...state, stateId: val.value });
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
    if (isEdit && formInitialValues?.address?.city) {
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

  useEffect(() => {
    mountStateEdit();
  }, []);

  const handlePrint = (text) => {
    const newWindow = window.open('', '', 'width=800, height=500');

    const document = newWindow.document.open();

    const pageContent = `${
      '<!DOCTYPE html>' +
      '<html>' +
      '<head>' +
      '<meta charset="utf-8" />' +
      '<title>Termo de Privacidade</title>' +
      '</head>' +
      '<body>'
    }${text}</body></html>`;
    try {
      document.write(pageContent);
      document.close();
      newWindow.print();
      // newWindow.close();
    } catch (error) {
      newWindow.close();
    }
  };

  const handleFormSubmit = (data) => {
    formSubmit({ data, fileLogo });
  };

  return (
    <>
      <Typography className={classes.dataHospital}>
        {!isEdit ? 'Cadastrar nova companhia' : 'Editar companhia'}
      </Typography>
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
        {({
          setFieldValue,
          handleBlur,
          handleChange,
          setFieldTouched,
          touched,
          errors,
          values,
        }) => (
          <Form>
            <Typography className={classes.dataHospital}>
              Dados da companhia
            </Typography>
            <InputContainer>
              <InputItem style={{ flexGrow: 2.05 }}>
                <FastField
                  data-cy="input_nome"
                  value={values?.name}
                  label="Nome da companhia"
                  style={{ width: '100%' }}
                  name="name"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
              <InputItem>
                <FastField
                  data-cy="input_email"
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
                  data-cy="input_razao_social"
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
                  data-cy="input_cnpj"
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
                  data-cy="input_cell_phone"
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
                  value={
                    values?.address?.number === 0 ? 0 : values?.address?.number
                  }
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
              <InputItem>
                <FastField
                  data-cy="input_code_post"
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
              <InputItem data-cy="input_state">
                <Field
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
                  setFieldTouched={setFieldTouched}
                  touched={touched}
                  handleBlur={handleBlur}
                  component={CustomSelectCities}
                />
              </InputItem>
            </InputContainer>
            <InputContainer style={{ marginTop: 25, height: 128 }}>
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
                  rows={3}
                  component={CustomTextField}
                />
              </div>
            </InputContainer>
            <InputContainer
              style={{
                marginTop: 40,
                marginRight: 0,
                height: 'auto',
              }}
            >
              <InputItem style={{ margin: 0 }}>
                <FastField
                  value={values?.description}
                  style={{ width: '100%' }}
                  name="contract"
                  variant="outlined"
                  label="Termo de privacidade"
                  multiline
                  rows={3}
                  component={CustomRichText}
                />
              </InputItem>
            </InputContainer>
            <div>
              <IconButton
                style={{ padding: 0 }}
                onClick={() =>
                  values?.contract &&
                  values?.contract !== '' &&
                  handlePrint(values?.contract)
                }
                aria-label="Imprimir"
              >
                <Tooltip title="Imprimir" arrow>
                  <PrintIcon color="primary" />
                </Tooltip>
              </IconButton>
            </div>
            <div data-cy="footerButton_btns" style={{ marginRight: 15 }}>
              <FooterButton id={values?.id} type="submit" loading={loading} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
