import React, { useEffect, memo } from 'react';
import { useStyles, InputContainer, InputItem } from './styles';
import { Typography } from '@material-ui/core';
import { FastField, Field } from 'formik';
import {
  RadioInput,
  RadioInputGroup,
} from 'shared/component/maskedField/checkBox';
import CustomTextField from 'shared/component/forms/CustomTextField';
import { InputMaskField } from 'shared/component/forms/CustomMaskField';
import CustomSelectEnterprises from 'shared/component/forms/CustomSelectEnterprises';
import CustomSelectCompanies from 'shared/component/forms/CustomSelectCompanies';
import CustomSelectSpecialties from 'shared/component/forms/CustomSelectSpecialties';
import CustomSelectUnits from 'shared/component/forms/CustomSelectUnits';
import CustomSelectStates from 'shared/component/forms/CustomSelectStates';
import CustomSelectGroups from 'shared/component/forms/CustomSelectGroups';
import SpecialGroups from '../SpecialGroups';

function SecondStepForm({
  values,
  errors,
  handleBlur,
  touched,
  isEdit,
  handleChange = () => {},
  setFieldValue = () => {},
  setFieldTouched = () => {},
}) {
  const classes = useStyles();

  const [selectedState, setSelectedState] = React.useState('');

  const getFormatedLabel = (item) => {
    return {
      value: item.id,
      label: item.name,
    };
  };

  const getInitialState = (state) => {
    const initialState = {
      value: state.id,
      label: state.name,
    };
    setFieldValue('crm.state', initialState.value);
    setSelectedState(initialState);
  };

  useEffect(() => {
    isEdit && values?.crm && values?.crm?.state
      ? getInitialState(values.crm.state)
      : setFieldValue('crm.state', '');
  }, []);

  const getInitialProfessionalType = () => {
    if (
      (isEdit && values.group && values.group.id === 3) ||
      values.group.id === ''
    ) {
      setFieldValue('professional_type', 'doctor');
      setFieldValue('crm.professional_type', 'doctor');
    } else {
      setFieldValue('professional_type', 'multiprofissional');
      setFieldValue('crm.professional_type', 'multiprofissional');
    }
  };

  const getInitialSpecialties = (specialties) => {
    return specialties.map((item) => getFormatedLabel(item));
  };

  const getInitialUnits = (units) => {
    return units.map((item) => getFormatedLabel(item));
  };

  useEffect(getInitialProfessionalType, []);

  return (
    <>
      <Typography className={classes.textHeader}>
        Dados Profissionais
      </Typography>

      <InputContainer>
        <InputItem id="crm">
          <RadioInputGroup
            row
            name="crm.professional_type"
            handleChange={(value) => {
              setFieldValue(
                'crm.regulation_agency',
                value.target.value === 'doctor' ? 'crm' : '...'
              );

              setFieldValue('crm.professional_type', value.target.value);
              setFieldValue('professional_type', value.target.value);
            }}
            value={values?.professional_type || 'doctor'}
          >
            <RadioInput value="doctor" label="Médico" />
            <RadioInput value="multiprofissional" label="Multiprofissional" />
          </RadioInputGroup>
        </InputItem>
      </InputContainer>

      {values?.professional_type === 'doctor' && (
        <>
          <InputContainer data-cy="inputContainer1_informacoes_profissionais">
            <InputItem>
              <FastField
                name="crm.number"
                value={values?.crm?.number}
                errors={errors}
                label="Numero do conselho"
                touched={touched}
                style={{ width: '100%' }}
                variant="outlined"
                component={CustomTextField}
              />
            </InputItem>
            <InputItem>
              <Field
                name="crm.state"
                placeholder={'CRM - UF'}
                value={selectedState}
                handleChange={(val) => {
                  if (val?.value) {
                    setSelectedState(val);
                    setFieldValue('crm.state', val.value);
                  } else {
                    setSelectedState(null);
                    setFieldValue('crm.state', '');
                  }
                }}
                menuList={() => ({ height: 116, overflowY: 'auto' })}
                errors={errors && errors?.crm && errors?.crm?.state}
                component={CustomSelectStates}
              />
            </InputItem>
            <InputItem>
              <FastField
                name="crm.validate"
                label="Validade do CRM"
                style={{ width: '100%' }}
                format="99/99/9999"
                variant="outlined"
                value={values?.crm.validate}
                errors={errors && errors.crm && errors.crm.validate}
                touched={touched}
                component={InputMaskField}
                onChange={(e) => {
                  setFieldValue('crm.validate', e.target.value);
                }}
              />
            </InputItem>
          </InputContainer>

          <InputContainer>
            <InputItem style={{ flexGrow: 0.5 }}>
              <Typography className={classes.text}>Recebimento</Typography>
              <InputContainer style={{ marginTop: 0 }}>
                <InputItem>
                  <RadioInputGroup
                    name="profile_receiving"
                    row
                    handleChange={(value) => {
                      setFieldValue(
                        'profile_receiving',
                        parseInt(value.target.value)
                      );
                    }}
                    value={values?.profile_receiving || 1}
                  >
                    <RadioInput value={1} label="Nota Fiscal" />
                    <RadioInput value={2} label="Sócio" />
                  </RadioInputGroup>
                </InputItem>
              </InputContainer>
            </InputItem>

            {values?.profile_receiving === 2 && (
              <InputItem>
                <Typography className={classes.text}>Sócio</Typography>
                <InputContainer style={{ marginTop: 0 }}>
                  <InputItem>
                    <RadioInputGroup
                      name="profile_receiving_type"
                      row
                      handleChange={(value) => {
                        setFieldValue(
                          'profile_receiving_type',
                          parseInt(value.target.value)
                        );
                      }}
                      value={values?.profile_receiving_type || 1}
                    >
                      <RadioInput value={1} label="PJ" />
                      <RadioInput value={2} label="PF" />
                    </RadioInputGroup>
                  </InputItem>
                </InputContainer>
              </InputItem>
            )}
          </InputContainer>
        </>
      )}

      <InputContainer data-cy="inputContainer2_informacoes_profissionais">
        <InputItem>
          <Field
            name="enterprise.id"
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            errors={errors && errors.enterprise && errors.enterprise.id}
            style={{ width: '100%' }}
            placeholder="Empresa"
            label="Empresa"
            value={
              values &&
              values.enterprise &&
              !!values.enterprise?.id &&
              values.enterprise?.id !== ''
                ? getFormatedLabel(values.enterprise)
                : null
            }
            handleChange={(e) => {
              setTimeout(() => {
                if (e === null) {
                  setFieldValue('enterprise.id', null);
                  setFieldValue('enterprise.name', null);
                } else {
                  setFieldValue('enterprise.id', e.value);
                  setFieldValue('enterprise.name', e.label);
                }
              }, 100);
            }}
            menuList={() => ({ height: 116, overflowY: 'auto' })}
            variant="outlined"
            component={CustomSelectEnterprises}
          />
        </InputItem>
        <InputItem>
          <Field
            name="company.id"
            style={{ width: '100%' }}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            placeholder={'Companhia'}
            errors={errors && errors.company && errors.company.id}
            label={'Companhia'}
            value={
              values && values.company && values.company.id !== ''
                ? getFormatedLabel(values.company)
                : null
            }
            handleChange={(e) => {
              if (e === null) {
                setFieldValue('company.id', null);
                setFieldValue('company.name', null);
              } else {
                setFieldValue('company.id', e.value);
                setFieldValue('company.name', e.label);
              }
            }}
            menuList={() => ({ height: 116, overflowY: 'auto' })}
            variant="outlined"
            component={CustomSelectCompanies}
          />
        </InputItem>
      </InputContainer>

      <InputContainer data-cy="inputContainer3_informacoes_profissionais">
        <InputItem>
          {values?.professional_type === 'doctor' ? (
            <Field
              name="specialties"
              style={{ width: '100%' }}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              placeholder={'Especialidades'}
              errors={errors && errors.specialties}
              value={
                values && values?.specialties && values?.specialties.length > 0
                  ? getInitialSpecialties(values.specialties)
                  : null
              }
              handleChange={(data) => {
                setFieldValue(
                  'specialties',
                  data.map((item) => ({ id: item.value, name: item.label }))
                );
              }}
              label={'Especialidades'}
              menuList={() => ({ height: 116, overflowY: 'auto' })}
              variant="outlined"
              component={CustomSelectSpecialties}
              isMulti
            />
          ) : (
            <Field
              name="group"
              style={{ width: '100%' }}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              placeholder={'Selecione o grupo'}
              errors={errors && errors.group}
              value={
                values && values.group && values.group.id !== ''
                  ? getFormatedLabel(values.group)
                  : null
              }
              handleChange={(val) => {
                if (val === null) {
                  setFieldValue('group.id', null);
                  setFieldValue('group.name', null);
                } else {
                  setFieldValue('group.id', val.value);
                  setFieldValue('group.name', val.label);
                }
              }}
              label={'Grupo'}
              menuList={() => ({
                height: 116,
                overflowY: 'auto',
              })}
              variant="outlined"
              component={CustomSelectGroups}
            />
          )}
        </InputItem>
      </InputContainer>
      {values?.professional_type !== 'doctor' && (
        <SpecialGroups
          currentGroup={values?.group}
          values={values}
          errors={errors}
          handleBlur={handleBlur}
          touched={touched}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          isEdit={isEdit}
        />
      )}
      <InputContainer data-cy="inputContainer4_informacoes_profissionais">
        <InputItem>
          <Field
            name="units"
            style={{ width: '100%' }}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            placeholder={'Hospitais permitidos'}
            label={'Hospitais permitidos'}
            errors={errors && errors.units}
            value={
              values && values?.units && values?.units.length > 0
                ? getInitialUnits(values.units)
                : null
            }
            handleChange={(data) => {
              setFieldValue(
                'units',
                data.map((item) => ({ id: item.value, name: item.label }))
              );
            }}
            menuList={() => ({ height: 116, overflowY: 'auto' })}
            variant="outlined"
            component={CustomSelectUnits}
            isMulti
          />
        </InputItem>
      </InputContainer>
    </>
  );
}

export default memo(SecondStepForm);
