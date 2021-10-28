import React, { useEffect } from 'react';
import { useStyles, ModalChangeDuty } from './styles';
import {
  Modal,
  Typography,
  Divider,
  Button,
  Icon,
  IconButton,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CurrencyInput from 'shared/component/maskedField/currencyInput';
import SwitchComponent from 'shared/component/switchComponent';
import useScales from 'hook/scales';
import { ModalResponseAlert } from 'page/Schedule/WeekSchedule/components/ModalResponseAlert';

export default function ModalChange({
  open,
  handleCloseModal,
  scale,
  scaleSelected,
  seachTimesScale,
}) {
  const classes = useStyles();
  const { editTimesScalesId, setTimeScalesEdit, timeScalesEdit, loading } =
    useScales();
  const { statusTimeScales } = timeScalesEdit;

  const [openModalSendNotification, setOpenModalSendNotification] =
    React.useState(false);
  useEffect(() => {
    (statusTimeScales === 200 || statusTimeScales === 201) &&
      setOpenModalSendNotification(true);
    setTimeout(() => {
      setTimeScalesEdit('');
    }, 2000);
  }, [statusTimeScales]);
  const handleCloseModalAlert = () => {
    setOpenModalSendNotification(false);
    handleCloseModal();
  };
  var dayOfTheWeek = '';
  var horaInicio = scaleSelected.hour_start.split(':');
  var horaFinal = scaleSelected.hour_end.split(':');
  switch (scaleSelected.week_day) {
    case '0':
      dayOfTheWeek = 'Segunda';
      break;
    case '1':
      dayOfTheWeek = 'Terça';
      break;
    case '2':
      dayOfTheWeek = 'Quarta';
      break;
    case '3':
      dayOfTheWeek = 'Quinta';
      break;
    case '4':
      dayOfTheWeek = 'Sexta';
      break;
    case '5':
      dayOfTheWeek = 'Sábado';
      break;
    case '6':
      dayOfTheWeek = 'Domingo';
      break;
  }

  const handleSubmit = (values) => {
    editTimesScalesId(newItem(values)).then(() => {
      seachTimesScale(scaleSelected.scale_id);
    });
  };

  const newItem = (data) => ({
    hour_end: scaleSelected.hour_end,
    hour_start: scaleSelected.hour_start,
    id: scaleSelected.id,
    price: data.price,
    price_partner: scaleSelected.price_partner,
    quantity_professional: data.quantity_professional,
    scale_id: scaleSelected.scale_id,
    status: data.status,
    week_day: scaleSelected.week_day,
  });

  const initialValues = {
    price: scaleSelected?.price,
    quantity_professional: scaleSelected?.quantity_professional,
    status: scaleSelected?.status,
  };

  const schema = Yup.object().shape({
    price: Yup.string(),
    quantity_professional: Yup.number()
      .max(10, 'no máximo 10 vagas')
      .typeError('Apenas números'),
    status: Yup.string(),
  });
  return (
    <div>
      {open && scale.id === scaleSelected.id && (
        <Modal
          className={classes.modal}
          open={open}
          disableAutoFocus
          disableEnforceFocus
          onClose={handleCloseModal}
        >
          <ModalChangeDuty>
            <div className={classes.rootModal}>
              <Typography className={classes.textModal}>
                Alterar plantão
              </Typography>
              <div>
                <IconButton
                  className={classes.iconButton}
                  onClick={handleCloseModal}
                >
                  <Icon>close</Icon>
                </IconButton>
              </div>
            </div>
            <Typography className={classes.subTextModal}>
              {dayOfTheWeek}, {horaInicio[0] + ':' + horaInicio[1]} às{' '}
              {horaFinal[0] + ':' + horaFinal[1]}
            </Typography>
            <Divider style={{ height: 1, width: 616, marginBottom: 32 }} />
            <Typography className={classes.textValues}>Valores</Typography>
            <div>
              <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                enableReinitialize
                validationSchema={schema}
              >
                {({
                  setFieldValue,
                  setFieldTouched,
                  handleChange,
                  errors,
                  touched,
                  handleblur,
                  values,
                }) => (
                  <Form>
                    <div
                      style={{
                        display: 'flex',
                        paddingLeft: '24px',
                      }}
                    >
                      <CurrencyInput
                        className={classes.inputValues}
                        name="price"
                        value={values.price}
                        setFieldValue={setFieldValue}
                        label="Valor base"
                        handleblur={handleblur}
                        error={errors}
                        touched={touched}
                      />

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                          className={classes.inputVacacines}
                          variant="outlined"
                          placeholder="0"
                          name="quantity_professional"
                          value={values.quantity_professional}
                          label="Vagas"
                          onChange={handleChange}
                          // error={errors && errors[name] && touched[name]}
                        />
                        <ErrorMessage name="quantity_professional">
                          {errors[name]}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className={classes.subtitle}>
                      <Typography>Dia ativo?</Typography>
                    </div>
                    <div
                      className={classes.radioContainer}
                      style={{ paddingLeft: '24px' }}
                    >
                      <Field
                        name="status"
                        value={values.status}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        style={{ width: 504 }}
                        component={SwitchComponent}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={classes.buttonContainer}>
                      <div>
                        <Button type="submit" className={classes.buttonExport}>
                          {loading ? (
                            <CircularProgress size={12} />
                          ) : (
                            <Typography className={classes.textExport}>
                              Salvar alteração
                            </Typography>
                          )}
                        </Button>
                      </div>
                    </div>
                    {openModalSendNotification && (
                      <ModalResponseAlert
                        messageTitleAlert="Plantão atualizado!"
                        openSendFinish={openModalSendNotification}
                        handleCloseSendFinish={handleCloseModalAlert}
                      />
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </ModalChangeDuty>
        </Modal>
      )}
    </div>
  );
}
