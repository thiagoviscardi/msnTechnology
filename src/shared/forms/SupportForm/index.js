import React, { useState } from 'react';
import { useStyles, InputContainer, InputItem } from './styles';
import { Typography } from '@material-ui/core';
import { FastField, Form, Formik } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import { schema } from './schema';
import { initialValues } from './initialValues';
import FooterButton from './components/FooterButton';
import DocsImportComponent from './components/Documents/DocsImportComponent';

export default function SupportForm({
  formInitialValues = initialValues,
  loading = false,
  formSubmit = () => {},
  isEdit = false,
}) {
  const classes = useStyles();

  const [docs, setDocs] = useState(null);

  const handleFormSubmit = (data) => {
    if (!isEdit) formSubmit({ data, docs });
    else formSubmit({ data });
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        validationSchema={schema}
        initialValues={formInitialValues}
        validateOnBlur
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Typography className={classes.title}>
              Cadastrar suporte de ajuda
            </Typography>
            <InputContainer>
              <InputItem style={{ flexGrow: 2.05 }}>
                <FastField
                  data-cy="input_nome_hospital"
                  value={values?.name}
                  label="Título"
                  style={{ width: '100%' }}
                  name="name"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem style={{ flexGrow: 2.05 }}>
                <FastField
                  data-cy="input_nome_hospital"
                  value={values?.name}
                  label="Link do vídeo"
                  style={{ width: '100%' }}
                  name="link"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer style={{ height: 128 }}>
              <InputItem style={{ flexGrow: 2.05 }}>
                <FastField
                  data-cy="input_description_hospital"
                  value={values?.description}
                  style={{ width: '100%' }}
                  name="description"
                  label="Descrição"
                  placeholder="Descrição"
                  variant="outlined"
                  multiline
                  rows={3}
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <Typography
              style={{ marginTop: 20, marginBottom: 10 }}
              className={classes.dataHospital}
            >
              Documentos
            </Typography>
            <DocsImportComponent
              setDocs={setDocs}
              values={values}
              setFieldValue={setFieldValue}
              isEdit={isEdit}
            />
            <div data-cy="container_btn_form" style={{ marginRight: 15 }}>
              <FooterButton id={values?.id} type="submit" loading={loading} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
