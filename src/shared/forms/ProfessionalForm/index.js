import React, { useState } from 'react';
import { Divider } from '@material-ui/core';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import { Form, Formik } from 'formik';
import FooterButton from './components/FooterButton';
import { schema } from './schema';
import { initialValues } from './initialValues';
import FirstStepForm from './components/FirstStepForm';
import ThirdStepForm from './components/ThirdStepForm';
import SecondStepForm from './components/SecondStepForm';
import FourthStepForm from './components/FourthStepForm';

export default function ProfessionalForm({
  isLoading = false,
  formInitialValues = initialValues,
  isEdit = false,
  status = true,
  formSubmit = () => {},
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const [docs, setDocs] = React.useState(null);
  const [fileLogo, setFileLogo] = React.useState(null);

  const abas = [
    { id: 0, name: 'Informações pessoais' },
    { id: 1, name: 'Informações profissionais' },
    { id: 2, name: 'Informações bancárias' },
    { id: 3, name: 'Senha' },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSubmit = (data) => {
    formSubmit({ fileLogo, docs, data });
  };

  return (
    <>
      <AntTabs
        value={currentTab}
        onChange={handleChangeTab}
        aria-label="ant example"
      >
        {abas.map((option, i) => (
          <AntTab key={i} label={option.name} />
        ))}
      </AntTabs>
      <Divider style={{ marginBottom: 24, paddingTop: 2 }} />
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
          values,
          errors,
          handleBlur,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <Form data-cy="form_cadastro_profissionais">
            <div style={{ display: currentTab === 0 ? 'block' : 'none' }}>
              <FirstStepForm
                values={values}
                errors={errors}
                setFileLogo={setFileLogo}
                setDocs={setDocs}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                handleChange={handleChange}
                isEdit={isEdit}
              />
            </div>
            <div style={{ display: currentTab === 1 ? 'block' : 'none' }}>
              <SecondStepForm
                values={values}
                errors={errors}
                setFileLogo={setFileLogo}
                setDocs={setDocs}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                handleChange={handleChange}
                isEdit={isEdit}
              />
            </div>
            <div style={{ display: currentTab === 2 ? 'block' : 'none' }}>
              <ThirdStepForm
                values={values}
                errors={errors}
                handleBlur={handleBlur}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                handleChange={handleChange}
                isEdit={isEdit}
              />
            </div>
            <div style={{ display: currentTab === 3 ? 'block' : 'none' }}>
              <FourthStepForm isEdit={isEdit} errors={errors} />
            </div>
            <div data-cy="footerButton_container" style={{ marginRight: 15 }}>
              <FooterButton
                isEdit={isEdit}
                id={values?.id}
                errors={errors}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                handleSubmit={handleSubmit}
                type="submit"
                loading={isLoading}
                status={status}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
