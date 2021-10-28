import React, { memo, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useStyles, InputContainer, InputItem } from './styles';
import HeaderForm from '../HeaderForm';
import { FastField, Field } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import { InputMaskField } from 'shared/component/forms/CustomMaskField';
import CustomSelect from 'shared/component/forms/CustomSelect';
import DocsImportComponent from '../DocsImportComponent';
import { civilStatus } from 'shared/statusCivilList';
import CustomSelectCountries from 'shared/component/forms/CustomSelectCountries';
import CustomSelectStates from 'shared/component/forms/CustomSelectStates';
import CustomSelectCities from 'shared/component/forms/CustomSelectCities';

const FirstStepForm = ({
  values,
  errors,
  isEdit,
  setFileLogo = () => {},
  setDocs = () => {},
  setFieldValue = () => {},
  setFieldTouched = () => {},
  handleChange = () => {},
}) => {
  const classes = useStyles();

  const [selectedState, setSelectedState] = React.useState('');

  const allCivilStatus = civilStatus.map((state) => ({
    label: state.name,
    value: state.id,
  }));

  const getCivilStatus = (idStatus) => {
    const initialCivilStatus = {
      value: idStatus,
      label: allCivilStatus.find((item) => item.value === parseInt(idStatus))
        ?.label,
    };
    return initialCivilStatus;
  };

  const genreOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' },
  ];

  const getGenre = (genre) => {
    const initialGenre = genreOptions.find((item) => item.value === genre);
    return initialGenre;
  };

  const getNationality = (nation) => {
    return {
      value: nation.id,
      label: nation.name,
    };
  };

  const getInitialState = (state) => {
    const initialState = {
      value: state.id,
      label: state.name,
    };
    setSelectedState(initialState);
  };

  useEffect(() => {
    isEdit && values?.address && values.address.city.state
      ? getInitialState(values.address.city.state)
      : null;
  }, []);

  const getInitialCity = (city) => {
    return {
      value: city.id,
      label: city.name,
    };
  };

  const handleChangeState = (val) => {
    setSelectedState(val);
  };

  return (
    <>
      <HeaderForm formInitialValues={values} setFileLogo={setFileLogo} />
      <Typography className={classes.title}>Dados pessoais</Typography>
      <InputContainer data-cy="inputContainer_profissionais">
        <InputItem>
          <FastField
            data-cy="input_nome"
            label="Nome"
            style={{ width: '100%' }}
            name="name"
            variant="outlined"
            component={CustomTextField}
            errors={errors}
          />
        </InputItem>
        <InputItem>
          <Field
            data-cy="select_sexo"
            label="Sexo"
            name="genre"
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            placeholder="Sexo"
            handleChange={(val) => {
              setFieldValue('genre', `${val.value}`);
            }}
            errors={errors && errors.genre}
            value={values?.genre ? getGenre(values?.genre) : null}
            options={genreOptions}
            menuList={() => ({ height: 80, overflowY: 'auto' })}
            component={CustomSelect}
          />
        </InputItem>
        <InputItem>
          <FastField
            label="E-mail"
            style={{ width: '100%' }}
            name="email"
            variant="outlined"
            component={CustomTextField}
          />
        </InputItem>
      </InputContainer>
      <InputContainer data-cy="inputContainer2_profissionais">
        <InputItem>
          <FastField
            label="CPF"
            style={{ width: '100%' }}
            name="cpf"
            format="999.999.999-99"
            variant="outlined"
            value={values?.cpf || null}
            component={InputMaskField}
            onChange={(e) => {
              setFieldValue('cpf', e.target.value);
            }}
          />
        </InputItem>
        <InputItem>
          <FastField
            label="RG"
            style={{ width: '100%' }}
            name="rg"
            variant="outlined"
            component={CustomTextField}
            onChange={handleChange}
          />
        </InputItem>
        <InputItem>
          <FastField
            name="cell_phone"
            id="cell_phone"
            style={{ width: '100%' }}
            label="Telefone"
            format="(99) 9 9999-9999"
            variant="outlined"
            component={InputMaskField}
            value={values?.cell_phone || null}
            onChange={(e) => {
              setFieldValue('cell_phone', e.target.value);
            }}
          />
        </InputItem>
      </InputContainer>
      <InputContainer data-cy="inputContainer3_profissionais">
        <InputItem>
          <FastField
            label="Data de nascimento"
            style={{ width: '100%' }}
            name="birth_date"
            format="99/99/9999"
            variant="outlined"
            component={InputMaskField}
            value={values?.birth_date || null}
            onChange={(e) => {
              setFieldValue('birth_date', e.target.value);
            }}
          />
        </InputItem>
        <InputItem>
          <Field
            name="nationality.id"
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            placeholder={'Nacionalidade'}
            menuList={() => ({ height: 116, overflowY: 'auto' })}
            value={
              values?.nationality?.id
                ? getNationality(values.nationality)
                : null
            }
            handleChange={(val) => {
              setFieldValue('nationality.id', val.value);
              setFieldValue('nationality.name', val.label);
            }}
            errors={errors.nationality && errors.nationality.id}
            component={CustomSelectCountries}
          />
        </InputItem>
        <InputItem>
          <Field
            name="civil_status"
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            placeholder={'Estado civil'}
            options={allCivilStatus}
            value={
              values?.civil_status ? getCivilStatus(values?.civil_status) : null
            }
            menuList={() => ({ height: 116, overflowY: 'auto' })}
            handleChange={(val) => {
              setFieldValue('civil_status', val.value);
            }}
            errors={errors && errors.civil_status}
            component={CustomSelect}
          />
        </InputItem>
      </InputContainer>

      <Typography style={{ marginTop: 48 }} className={classes.title}>
        Endereço
      </Typography>
      <InputContainer data-cy="inputContainer4_profissionais">
        <InputItem>
          <FastField
            label="Rua"
            style={{ width: '100%' }}
            name="address.street"
            variant="outlined"
            component={CustomTextField}
          />
        </InputItem>
        <InputItem style={{ flexGrow: 0 }}>
          <FastField
            label="Número"
            style={{ width: '100%' }}
            mask="9999"
            name="address.number"
            variant="outlined"
            component={CustomTextField}
          />
        </InputItem>
        <InputItem>
          <FastField
            label="Complemento"
            style={{ width: '100%' }}
            name="address.complement"
            variant="outlined"
            component={CustomTextField}
          />
        </InputItem>
        <InputItem>
          <FastField
            label="Setor"
            style={{ width: '100%' }}
            name="address.district"
            variant="outlined"
            component={CustomTextField}
          />
        </InputItem>
      </InputContainer>
      <InputContainer data-cy="inputContainer5_profissionais">
        <InputItem>
          <FastField
            name="address.code_post"
            mask=""
            format="99999-999"
            variant="outlined"
            label="CEP"
            style={{ width: '100%' }}
            component={InputMaskField}
            value={
              values?.address && values?.address?.code_post
                ? values?.address?.code_post
                : null
            }
            onChange={(e) => {
              setFieldValue('address.code_post', e.target.value);
            }}
          />
        </InputItem>
        <InputItem>
          <Field
            name="address.city.state.id"
            placeholder="Estados"
            value={selectedState}
            handleChange={(val) => {
              if (val?.value) {
                handleChangeState(val);
                setFieldValue('address.city.state.id', val?.value);
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
        <InputItem>
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
            value={
              values?.address &&
              values?.address?.city &&
              values?.address?.city.id !== ''
                ? getInitialCity(values.address.city)
                : null
            }
            errors={
              errors.address && errors.address.city && errors.address.city.id
            }
          />
        </InputItem>
      </InputContainer>

      <Typography style={{ marginTop: 48 }} className={classes.title}>
        Documentos
      </Typography>
      <DocsImportComponent setDocs={setDocs} setFieldValue={setFieldValue} />
    </>
  );
};

export default memo(FirstStepForm);
