import React, { useState } from 'react';
import { useStyles, InputContainer, InputItem } from './styles';
import { Divider, Typography } from '@material-ui/core';
import { FastField, Field, Form, Formik } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import { InputMaskField } from 'shared/component/forms/CustomMaskField';
import { schema } from './schema';
import { useAuth } from 'hook/auth';
import { initialValues } from './initialValues';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import HeaderForm from './components/HeaderForm';
import FooterButton from './components/FooterButton';
import CustomSelectProfilePermissions from 'shared/component/forms/CustomSelectProfilePermissions';
import CustomSelectUnits from 'shared/component/forms/CustomSelectUnits';
import TablePermissionsList from './TablePermissionsList';
import CustomSelectCompanies from 'shared/component/forms/CustomSelectCompanies';

export default function AdminForm({
  formInitialValues = initialValues,
  loading = false,
  isEdit = false,
  status = true,
  formSubmit = () => {},
}) {
  const classes = useStyles();
  const { userLogged } = useAuth();

  const [currentTab, setCurrentTab] = useState(0);
  const [fileLogo, setFileLogo] = React.useState(null);

  const abas = [
    { id: 0, name: 'Informações pessoais' },
    { id: 1, name: 'Permissões' },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFormSubmit = (data) => {
    data.file = fileLogo;
    formSubmit({ data });
  };

  const getFormatedLabel = (item) => {
    return {
      value: item.id,
      label: item.name,
    };
  };

  const getInitialUnits = (units) => {
    return units.map((item) => getFormatedLabel(item));
  };

  return (
    <>
      <AntTabs
        value={currentTab}
        onChange={handleChangeTab}
        aria-label="ant example"
      >
        {abas
          .filter((item) => (!isEdit && item.id === 0) || isEdit)
          .map((option, i) => (
            <AntTab key={i} label={option.name} />
          ))}
      </AntTabs>
      <Divider style={{ marginBottom: 24, paddingTop: 2 }} />
      <Formik
        onSubmit={handleFormSubmit}
        validationSchema={schema}
        initialValues={formInitialValues}
        validateOnBlur
        enableReinitialize
      >
        {({
          setFieldValue,
          setFieldTouched,
          handleBlur,
          touched,
          values,
          errors,
        }) => (
          <Form>
            <div style={{ display: currentTab === 0 ? 'block' : 'none' }}>
              <HeaderForm
                formInitialValues={formInitialValues}
                setFileLogo={setFileLogo}
              />
              <Typography className={classes.dataHospital}>
                {!isEdit
                  ? 'Cadastrar novo administrador'
                  : 'Editar Administrador'}
              </Typography>
              <InputContainer>
                <InputItem style={{ flexGrow: 1.02 }}>
                  <FastField
                    data-cy=""
                    label="Nome"
                    style={{ width: '100%' }}
                    name="name"
                    variant="outlined"
                    component={CustomTextField}
                  />
                </InputItem>
              </InputContainer>
              <InputContainer data-cy="inputContainer">
                <InputItem style={{ flexGrow: 1 }}>
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
                <InputItem style={{ flexGrow: 1 }}>
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
                <InputItem style={{ flexGrow: 2 }}>
                  <FastField
                    label="E-mail"
                    style={{ width: '100%' }}
                    name="email"
                    variant="outlined"
                    component={CustomTextField}
                  />
                </InputItem>
              </InputContainer>
              <Typography className={classes.address}>
                Informações administrativas
              </Typography>
              <InputContainer data-cy="inputContainer2">
                <InputItem style={{ flexGrow: 1 }}>
                  {userLogged?.group?.id === 1 ? (
                    <Field
                      name="company.id"
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      errors={errors && errors?.company && errors?.company?.id}
                      style={{ width: '100%' }}
                      placeholder="Empresa responsável"
                      label="Empresa responsável"
                      value={
                        values &&
                        values.company &&
                        !!values.company?.id &&
                        values.company?.id !== ''
                          ? getFormatedLabel(values.company)
                          : null
                      }
                      handleChange={(e) => {
                        if (e?.value) {
                          setFieldValue('company.id', e.value);
                          setFieldValue('company.name', e.label);
                        } else {
                          setFieldValue('company.id', '');
                          setFieldValue('company.name', '');
                        }
                      }}
                      menuList={() => ({ height: 116, overflowY: 'auto' })}
                      variant="outlined"
                      touched={touched}
                      handleBlur={handleBlur}
                      component={CustomSelectCompanies}
                    />
                  ) : (
                    <Field
                      name="company.id"
                      style={{ width: '100%' }}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      placeholder={'Companhia responsável'}
                      errors={errors && errors.company && errors.company.id}
                      label={'Companhia'}
                      value={
                        values && values.company && values.company.id !== ''
                          ? getFormatedLabel(values.company)
                          : null
                      }
                      handleChange={(e) => {
                        setFieldValue('company.id', e.value);
                        setFieldValue('company.name', e.label);
                      }}
                      menuList={() => ({ height: 116, overflowY: 'auto' })}
                      variant="outlined"
                      component={CustomSelectCompanies}
                    />
                  )}
                </InputItem>
                <InputItem style={{ flexGrow: 1 }}>
                  <Field
                    name="group.id"
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    errors={errors && errors.enterprise && errors.enterprise.id}
                    style={{ width: '100%' }}
                    placeholder="Grupo de permissões"
                    label="Grupo de permissões"
                    value={
                      values &&
                      values.group &&
                      !!values.group?.id &&
                      values.group?.id !== ''
                        ? getFormatedLabel(values.group)
                        : null
                    }
                    handleChange={(e) => {
                      if (e?.value) {
                        setFieldValue('group.id', e.value);
                        setFieldValue('group.name', e.label);
                      } else {
                        setFieldValue('group.id', '');
                        setFieldValue('group.name', '');
                      }
                    }}
                    menuList={() => ({ height: 116, overflowY: 'auto' })}
                    variant="outlined"
                    component={CustomSelectProfilePermissions}
                    touched={touched}
                    handleBlur={handleBlur}
                  />
                </InputItem>
              </InputContainer>
              <InputContainer data-cy="inputContainer3">
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
                        data.map((item) => ({
                          id: item.value,
                          name: item.label,
                        }))
                      );
                    }}
                    menuList={() => ({ height: 116, overflowY: 'auto' })}
                    variant="outlined"
                    component={CustomSelectUnits}
                    isMulti
                  />
                </InputItem>
              </InputContainer>
            </div>
            <div style={{ display: currentTab === 1 ? 'block' : 'none' }}>
              <TablePermissionsList
                setFieldValue={setFieldValue}
                values={values}
                isEdit={isEdit}
              />
            </div>

            <div data-cy="footerButton" style={{ marginRight: 5 }}>
              <FooterButton
                id={values?.id}
                type="submit"
                loading={loading}
                status={status}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
