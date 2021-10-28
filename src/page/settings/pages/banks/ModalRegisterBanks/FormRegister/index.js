import React, { useState } from 'react';
import { ContainerFormModal, InputContainer, InputItem } from './styles';
import { Field, Form, Formik } from 'formik';
import useBanks from 'hook/banks';
import * as Yup from 'yup';
import CustomTextField from 'shared/component/forms/CustomTextField';
import MessageNotification from 'shared/component/messageNotification';
import FooterButton from '../../ModalEditBanks/FormBanks/FooterButtonBanks';
const formInitialValues = {
  name: '',
  code: '',
};
function ModalRegisterBank({
  handleRegisterBanks,
  initialValues = formInitialValues,
  handleCloseModal,
}) {
  // const styles = useStyles();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const { getCreate, loading } = useBanks();
  const formSubmit = (values) => {
    getCreate({ values })
      .then(() => {
        setMessage(null);
        setError(false);
        setTimeout(() => {
          handleRegisterBanks();
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
        onSubmit={formSubmit}
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
}

export default ModalRegisterBank;
