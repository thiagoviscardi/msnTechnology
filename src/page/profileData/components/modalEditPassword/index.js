import React from 'react';
import { useStyles, ModalContainer, FormContainer } from './styles';
import {
  Modal,
  Icon,
  Typography,
  Divider,
  IconButton,
  Button,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CustomTextField from 'shared/component/forms/CustomTextField';
import useUser from 'hook/user';
import { useAuth } from 'hook/auth';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function ModalEditPassword({ openModal, handleClose }) {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const { editPassword } = useUser();
  const { userLogged } = useAuth();
  const handleOpenAlert = async (values) => {
    const response = await editPassword(userLogged.id, values.password);
    if (response?.status === 200) {
      setOpen(true);
      handleClose(true);
      return;
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const initialValues = {
    oldPassword: '',
    password: '',
    comfirmNewPassword: '',
  };
  const schema = Yup.object().shape({
    oldPassword: Yup.string().test(
      'oldPassword',
      'precisa ser igual',
      (value) => value === userLogged.code
    ),
    password: Yup.string()
      .min(8, 'Precisa ter de 8 a 20 caracteres')
      .max(20, 'Precisa ter de 8 a 20 caracteres')
      .required('Precisa ter de 8 a 20 caracteres'),
    comfirmNewPassword: Yup.string()
      .when('password', {
        is: (a) => a?.length > 0,
        then: Yup.string().required('A confirmação de senha não confere'),
      })
      .oneOf([Yup.ref('password'), null], 'As senhas não são idênticas'),
  });

  return (
    <div>
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        disableAutoFocus
        disableEnforceFocus
      >
        <ModalContainer>
          <div>
            <div className={classes.rootz}>
              <Typography className={classes.textModal}>
                Alterar senha
              </Typography>
              <div>
                <IconButton
                  onClick={handleClose}
                  style={{
                    padding: 0,
                    marginTop: 5,
                  }}
                >
                  <Icon>close</Icon>
                </IconButton>
              </div>
            </div>
            <Divider
              style={{ height: 1, width: 456, marginTop: 15, marginBottom: 30 }}
            />
            <Typography className={classes.subTitleModal}>
              Crie uma senha entre 8 a 20 caracteres.
            </Typography>
            <Typography className={classes.subTitleModal}>
              Adicione também números e símbolos para que sua senha fique mais
              segura.
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={handleOpenAlert}
              validationSchema={schema}
            >
              {({ handleSubmit }) => (
                <Form>
                  <div>
                    <FormContainer style={{ justifyContent: 'flex-start' }}>
                      <div
                        style={{ width: '100%', marginLeft: 32, marginTop: 30 }}
                      >
                        <Field
                          type="Password"
                          label="Senha atual"
                          placeholder="Digite sua senha atual"
                          style={{ width: '100%' }}
                          name="oldPassword"
                          variant="outlined"
                          component={CustomTextField}
                        />
                      </div>
                    </FormContainer>
                    <FormContainer>
                      <div style={{ width: '100%', marginLeft: 32 }}>
                        <Field
                          type="Password"
                          label="Nova senha"
                          placeholder="Escreva sua nova senha"
                          style={{ width: '100%' }}
                          name="password"
                          variant="outlined"
                          component={CustomTextField}
                        />
                      </div>
                    </FormContainer>
                    <FormContainer>
                      <div style={{ width: '100%', marginLeft: 32 }}>
                        <Field
                          type="Password"
                          label="Confirmar senha"
                          placeholder="Confirme a senha"
                          style={{ width: '100%' }}
                          name="comfirmNewPassword"
                          variant="outlined"
                          component={CustomTextField}
                        />
                      </div>
                    </FormContainer>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      marginTop: 20,
                      marginLeft: 32,
                    }}
                  >
                    <Button
                      type="submit"
                      className={classes.buttonAdd}
                      onClick={handleSubmit}
                    >
                      Alterar senha
                    </Button>
                  </div>
                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleCloseAlert}
                  >
                    <Alert onClose={handleCloseAlert} severity="success">
                      Senha alterada com sucesso!
                    </Alert>
                  </Snackbar>
                </Form>
              )}
            </Formik>
          </div>
        </ModalContainer>
      </Modal>
    </div>
  );
}
