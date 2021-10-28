import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from './styles';
import { Field, Form, Formik } from 'formik';
import useBanks from 'hook/banks';
import * as Yup from 'yup';
import appColors from 'utils/appColors';
import CustomTextField from 'shared/component/forms/CustomTextField';

function ModalRegisterBank({ handleUpdateList }) {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const { getCreate, loading } = useBanks();

  const formSubmit = (data) => {
    getCreate({ data })
      .then(() => {
        handleUpdateList();
        setTimeout(() => {
          setOpen((m) => !m);
        }, 300);
      })
      .catch(() => {});
  };
  if (loading) {
    <div
      style={{
        textAlign: 'center',
        marginTop: 130,
        marginBottom: 3,
      }}
    >
      <CircularProgress
        style={{
          color: appColors.PRIMARY_COLOR,
        }}
        size={90}
      />
    </div>;
  }
  const [initialValues] = React.useState({
    name: '',
    code: '',
  });

  const schema = Yup.object().shape({
    name: Yup.string().typeError('Obrigatório!').required('Obrigatório!'),
    code: Yup.string().typeError('Obrigatório!').required('Obrigatório!'),
  });

  return (
    <div>
      <Button
        data-cy="btn_register_bank"
        className={styles.buttonRegister}
        onClick={() => setOpen((m) => !m)}
      >
        Cadastrar banco
      </Button>

      <Dialog onClose={() => setOpen((m) => !m)} open={open}>
        <Box className={styles.boxModal}>
          <Grid
            className={styles.modal_header}
            container
            justify="space-between"
            alignItems="center"
          >
            <Typography className={styles.modal_title}>
              Cadastrar banco
            </Typography>
            <IconButton onClick={() => setOpen((m) => !m)}>
              <Icon>close</Icon>
            </IconButton>
          </Grid>
          <Divider />

          <Box>
            <Formik
              onSubmit={formSubmit}
              validationSchema={schema}
              initialValues={initialValues}
              validateOnBlur
              enableReinitialize
            >
              {({ values }) => (
                <Form>
                  <div className={styles.modal_content}>
                    <div className={styles.input}>
                      <Field
                        label="Nome do banco"
                        value={values.name && values.name}
                        style={{ width: '100%' }}
                        name="name"
                        variant="outlined"
                        component={CustomTextField}
                      />
                    </div>
                    <div>
                      <div className={styles.input}>
                        <Field
                          label="Código"
                          value={values.code && values.code}
                          style={{ width: '20%' }}
                          name="code"
                          variant="outlined"
                          component={CustomTextField}
                        />
                      </div>
                    </div>

                    <Grid
                      className={styles.buttons}
                      container
                      justify="flex-end"
                    >
                      <Button
                        className={styles.button_outlined}
                        variant="outlined"
                        onClick={() => setOpen((m) => !m)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        data-cy="contained_btn_register"
                        className={styles.button_contained}
                        variant="contained"
                        color="primary"
                        loading={loading}
                        type="submit"
                      >
                        Cadastrar
                      </Button>
                    </Grid>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}

export default ModalRegisterBank;
