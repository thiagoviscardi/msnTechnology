import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FooterButton from './FooterButton';
import { ContainerFormModal, InputContainer, InputItem } from './styles';
import {
  RadioInput,
  RadioInputGroup,
} from 'shared/component/maskedField/checkBox';
import { useCountries } from 'hook/countries/index';

import MessageNotification from 'shared/component/messageNotification';
import CustomTextField from 'shared/component/forms/CustomTextField';

const FormCountries = ({
  handleCloseModal,
  initialValues,
  handleGetPermissions,
}) => {
  const { loading, getUpdate, getCreate } = useCountries();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = (data) => {
    if (data?.id) {
      getUpdate({ id: data?.id, data })
        .then(() => {
          setMessage(null);
          setError(false);
          setTimeout(() => {
            handleGetPermissions();
            handleCloseModal();
          }, 500);
        })
        .catch((errorMessage) => {
          setMessage(errorMessage);
          setError(true);
        });
    } else {
      getCreate({ data })
        .then(() => {
          setMessage(null);
          setError(false);
          setTimeout(() => {
            handleGetPermissions();
            handleCloseModal();
          }, 500);
        })
        .catch((errorMessage) => {
          setMessage(errorMessage);
          setError(true);
        });
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string().typeError('Obrigatório!').required('Obrigatório!'),
    status: Yup.number(),
  });

  return (
    <ContainerFormModal>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={initialValues}
        validateOnBlur
        values
      >
        {({ setFieldValue, values }) => (
          <Form>
            <InputContainer>
              <InputItem>
                <Field
                  data-cy="input_name"
                  label="Nome"
                  style={{ width: '100%' }}
                  name="name"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <InputContainer>
              <InputItem>
                <RadioInputGroup
                  name="status"
                  row
                  handleChange={(value) => {
                    setFieldValue('status', parseInt(value.target.value));
                  }}
                  value={values?.status}
                >
                  <RadioInput value={1} label="Ativo" />
                  <RadioInput value={0} label="Inativo" />
                </RadioInputGroup>
              </InputItem>
            </InputContainer>
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
    </ContainerFormModal>
  );
};

export default FormCountries;
