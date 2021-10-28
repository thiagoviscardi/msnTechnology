import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FooterButton from './FooterButtonBanks';
import { ContainerFormModal, InputContainer, InputItem } from './styles';
import useBanks from 'hook/banks';

import MessageNotification from 'shared/component/messageNotification';
import CustomTextField from 'shared/component/forms/CustomTextField';

const FormBanks = ({ handleCloseModal, initialValues, handleUpdateList }) => {
  const { loading, getUpdate } = useBanks();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = (data) => {
    getUpdate({ id: data?.id, data })
      .then(() => {
        setMessage(null);
        setError(false);
        setTimeout(() => {
          handleUpdateList();
          handleCloseModal();
        }, 300);
      })
      .catch((errorMessage) => {
        setMessage(errorMessage);
        setError(true);
      });
  };

  const schema = Yup.object().shape({
    name: Yup.string().typeError('Obrigatório!').required('Obrigatório!'),
    code: Yup.string().typeError('Obrigatório!').required('Obrigatório!'),
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
        {() => (
          <Form>
            <InputContainer>
              <InputItem>
                <Field
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
                <Field
                  label="Código"
                  style={{ width: '100%' }}
                  name="code"
                  variant="outlined"
                  component={CustomTextField}
                />
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

export default FormBanks;
