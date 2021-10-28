import React, { useCallback } from 'react';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ContainerFormModal, InputContainer, InputItem } from './styles';
import CustomTextField from 'shared/component/forms/CustomTextField';
import TablePermissionsList from 'page/settings/pages/profilePermissionsCreate/TablePermissionsList';
import FooterButton from './FooterButton';
import { useHistory } from 'react-router-dom';

const formInitialValues = {
  name: '',
  permissions: [],
};

const FormProfilePermissions = ({
  initialValues = formInitialValues,
  loading = false,
  isEdit = false,
  idProfile = null,
  handleSubmit = () => {},
}) => {
  const history = useHistory();

  const schema = Yup.object().shape({
    name: Yup.string().typeError('Obrigatório!').required('Obrigatório!'),
  });

  const handleBack = () => {
    history.push(`/settings/perfil-de-permissoes`);
  };

  const handleScrollTop = useCallback((errors) => {
    if (errors && Object.keys(errors).length > 0)
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <ContainerFormModal>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={initialValues}
        validateOnBlur
        values
      >
        {({ setFieldValue, errors, values }) => (
          <Form>
            {handleScrollTop(errors)}
            <InputContainer data-cy="inputContainer1">
              <InputItem style={{ flexGrow: 1 }}>
                <FastField
                  label="Nome no perfil"
                  style={{ width: '100%' }}
                  name="name"
                  variant="outlined"
                  component={CustomTextField}
                />
              </InputItem>
            </InputContainer>
            <TablePermissionsList
              setFieldValue={setFieldValue}
              values={values}
              isEdit={isEdit}
              idProfile={idProfile}
            />
            <FooterButton loading={loading} handleCloseModal={handleBack} />
          </Form>
        )}
      </Formik>
    </ContainerFormModal>
  );
};

export default FormProfilePermissions;
