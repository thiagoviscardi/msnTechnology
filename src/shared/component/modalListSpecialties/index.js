import React from 'react';
import { useStyles, ModalContainer } from './styles';
import {
  Modal,
  Icon,
  Typography,
  Divider,
  IconButton,
  Button,
  CircularProgress,
} from '@material-ui/core';
import appColors from 'utils/appColors';
import CustomSimpleCheckbox from 'shared/component/forms/CustomSimpleCheckBox';
import { Formik, Field, Form, FieldArray } from 'formik';
import SearchInput from 'shared/component/forms/SearchInput';

export default function ModalListSpecialties({
  openModal,
  handleClose,
  especialidades,
  loading,
  searchFunction,
  onScrollBottom,
  adicionarSpecialties,
}) {
  const classes = useStyles();
  const initialValues = {
    search: '',
    specialties: [],
  };

  const onSubmit = (values) => {
    adicionarSpecialties(
      especialidades.filter((h) => values.specialties.includes(`${h.id}`))
    );
  };

  return (
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
              Adicionar especialidade
            </Typography>
            <div>
              <IconButton
                onClick={handleClose}
                style={{
                  padding: 0,
                  marginTop: 10,
                }}
              >
                <Icon>close</Icon>
              </IconButton>
            </div>
          </div>
          <Divider
            style={{ height: 1, width: 456, marginTop: 15, marginBottom: 30 }}
          />
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values }) => (
              <Form>
                <div>
                  <div
                    style={{
                      width: 392,
                      marginBottom: 12,
                      paddingLeft: '32px',
                    }}
                  >
                    <Field
                      component={SearchInput}
                      dividerOn
                      style={{ marginTop: 16, width: '50%' }}
                      name="search"
                      onChange={searchFunction}
                      placeholder="Buscar especialidades"
                    />
                    {especialidades && especialidades.length > 0 && (
                      <div
                        onScroll={onScrollBottom}
                        className={classes.scrollContainer}
                      >
                        <FieldArray
                          name="specialties"
                          render={(arrayHelp) => (
                            <div style={{ margin: 10 }}>
                              {especialidades.length > 0 &&
                                especialidades.map((item) => (
                                  <div key={item.id} style={{ width: '100%' }}>
                                    <Field
                                      especialidades={values.specialties}
                                      arrayhelp={arrayHelp}
                                      name="specialties.id"
                                      id={item.id.toString()}
                                      label={item.name.toUpperCase()}
                                      component={CustomSimpleCheckbox}
                                    />
                                  </div>
                                ))}

                              <div style={{ minHeight: 50 }}>
                                {especialidades.length === 0 &&
                                  searchFunction !== '' && (
                                    <div className={classes.loadingContainer}>
                                      <Typography>
                                        Nenhum resultado encontrado
                                      </Typography>
                                    </div>
                                  )}
                                {loading && (
                                  <div className={classes.loadingContainer}>
                                    <CircularProgress
                                      style={{
                                        color: appColors.PRIMARY_COLOR,
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 50,
                  }}
                >
                  <Button className={classes.buttonClear}>Limpar</Button>
                  <Button
                    type="submit"
                    // onClick={goBack}
                    className={classes.buttonAdd}
                  >
                    Adicionar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ModalContainer>
    </Modal>
  );
}
