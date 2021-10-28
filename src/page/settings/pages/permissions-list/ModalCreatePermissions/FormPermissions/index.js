import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FooterButton from './FooterButton';
import { ContainerFormModal, InputContainer, InputItem } from './styles';
import {
  RadioInput,
  RadioInputGroup,
} from 'shared/component/maskedField/checkBox';
import { usePermissions } from 'hook/Permissions/index';

import MessageNotification from 'shared/component/messageNotification';
import CustomTextField from 'shared/component/forms/CustomTextField';
import { ModalResponseAlert } from '../../ModalResponseAlert';

const FormPermissions = ({
  handleCloseModal,
  initialValues,
  handleGetPermissions,
}) => {
  const { loading, getCreate } = usePermissions();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const [openModalSendNotification, setOpenModalSendNotification] =
    React.useState(false);

  const handleSubmit = (data) => {
    getCreate({ data })
      .then(() => {
        setMessage(null);
        setError(false);
        setOpenModalSendNotification(true);
        handleGetPermissions();
      })
      .catch((errorMessage) => {
        setMessage(errorMessage);
        setError(true);
      });
  };

  const schema = Yup.object().shape({
    name: Yup.string().typeError('Obrigatório!').required('Obrigatório!'),
    permission: Yup.string().typeError('Obrigatório!').required('Obrigatório!'),
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
                  name="permission"
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
                  <RadioInput value={1} label="Permissão ativa" />
                  <RadioInput value={0} label="Permissão inativa" />
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
      {openModalSendNotification && (
        <ModalResponseAlert
          messageTitleAlert="Permissão cadastrada com sucesso!"
          openSendFinish={openModalSendNotification}
          handleCloseSendFinish={handleCloseModal}
        />
      )}
    </ContainerFormModal>
  );
};

export default FormPermissions;
