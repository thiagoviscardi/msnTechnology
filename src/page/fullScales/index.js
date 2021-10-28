import React, { useEffect } from 'react';
import { useStyles, InputContainer, InputItem } from './styles';
import {
  Button,
  Typography,
  Icon,
  Modal,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Formik, Field, Form, FastField } from 'formik';
import * as Yup from 'yup';
import ScalesRegistrationPaper from 'shared/component/scalesRegistrationPaper';
import ModalSuccess from './components/visualization/modais/modalSuccess';
import useScales from 'hook/scales';
import { useHistory, useParams } from 'react-router-dom';
import Layout from 'shared/component/Layout';
import CardShiftTable from 'page/scalesPage/components/shiftTable';
import EditIcon from '@material-ui/icons/Edit';
import CustomTextField from 'shared/component/forms/CustomTextField';
import CustomSelectSpecialties from 'shared/component/forms/CustomSelectSpecialties';
import CustomSelectGroups from 'shared/component/forms/CustomSelectGroups';
import { ModalResponseAlert } from 'page/Schedule/WeekSchedule/components/ModalResponseAlert';
import { useConfig } from 'hook/config';

export default function FullScales() {
  const { id, unit_id, create } = useParams();
  const [localSpecialty, setLocalSpecialty] = React.useState(null);
  const [emptySpecialty, setEmptySpecialty] = React.useState('');
  const [openModalSendNotification, setOpenModalSendNotification] =
    React.useState(false);
  const { config } = useConfig();

  const {
    status,
    scalesTimesFilter,
    editScalesId,
    getSpecificScale,
    getTimesFilterScales,
    createScheduleId,
  } = useScales();
  const history = useHistory();

  React.useEffect(() => {
    getSpecificScale(unit_id, id).then((data) => {
      setInitialValues({
        name: data.name,
        specialty: data.specialty,
        type_remuneration: data.type_remuneration,
        scale_type: '',
        hour_start: '',
        hour_end: '',
        duration: '',
        week_day: [],
        price: '',
        quantity_Professional: '',
        budget: data.budget,
        coordinator: data.coordinator,
        date_end: data.date_end,
        date_start: data.date_start,
        group: data.group,
        id: data.id,
        signature_is_automatic: data.signature_is_automatic,
        signature_is_required: data.signature_is_required,
        status: data.status,
        technical_manager: data.technical_manager,
        unit: data.unit,
      });
      data && data.specialty && !data.group
        ? setLocalSpecialty(
            data && data.specialty
              ? {
                  label: data.specialty.name,
                  value: data.specialty.id,
                }
              : null
          )
        : setLocalSpecialty(
            data && data.group
              ? {
                  label: data.group.name,
                  value: data.group.id,
                }
              : null
          );
      if (typeof create !== 'undefined') {
        setState({ ...state, openPaper: true });
      }
    });
  }, [unit_id, id, openModalSendNotification]);

  useEffect(() => {
    getTimesFilterScales(unit_id, id);
  }, []);

  const [state, setState] = React.useState({
    open: false,
    value: 0,
    addScale: false,
    openModal: false,
    openPaper: false,
    openModalSucess: false,
  });

  const [msgModalState, setMsgModalState] = React.useState('');

  const { openPaper, successScaleModal } = state;

  const handleClosePaper = () => {
    setState({ ...state, openPaper: !openPaper });
  };
  const handleOpenAddScale = () => {
    setState({ ...state, openPaper: !openPaper });
  };
  const handleSuccessScale = () => {
    setState({ ...state, successScaleModal: !successScaleModal });
  };
  const handleCloseModalSave = () => {
    setState({ ...state, successScaleModal: !successScaleModal });
  };
  const handleMsgModalScale = (msg) => {
    setMsgModalState(msg);
  };
  const [openMenu] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleSubmit = (values) => {
    if (openPaper) {
      createScheduleId({
        schedules: newScalesItem(values),
        scaleId: values.id,
      }).then(() => {
        seachTimesScale();
        handleClosePaper();
      });
    } else {
      editScalesId(newItem(values), Number.parseInt(unit_id));
    }
    values?.specialty && !values?.group
      ? setLocalSpecialty({
          label: values?.specialty?.name,
          value: values?.specialty?.id,
        })
      : setLocalSpecialty({
          label: values?.group?.name,
          value: values?.group?.id,
        });
  };
  const newItem = (values) => ({
    budget: values.budget,
    coordinator: values.coordinator,
    date_end: values.date_end,
    date_start: values.date_start,
    group: values.group,
    id: values.id,
    name: values.name,
    signature_is_automatic: values.signature_is_automatic,
    signature_is_required: values.signature_is_required,
    specialty: values.specialty,
    status: values.status,
    technical_manager: values.technical_manager,
    type_remuneration: values.type_remuneration,
    unit: values.unit,
    specialty_id: values.specialty === null ? null : values.specialty.id,
    group_id: values.group === null ? null : values.group.id,
  });

  const newScalesItem = (data) =>
    [...Array(7).keys()].map((a, i) => ({
      hour_start: data.hour_start + '00',
      hour_end: data.hour_end + '00',
      week_day: i,
      price: data.price,
      quantity_professional: data.quantity_Professional,
      status: data.week_day.includes(`${i}`) ? 1 : 0,
    }));

  const prevOpen = React.useRef(openMenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  React.useEffect(() => {
    if (status === 200 || status === 201 || status.status == 403)
      setOpenModalSendNotification(true);
  }, [status]);

  const classes = useStyles();

  const seachTimesScale = () => {
    getTimesFilterScales(unit_id, id);
  };

  const redirectEditScale = () => {
    history.push(`/cadastros/escalas/cadastrar/${unit_id}/${initialValues.id}`);
  };

  const alertSpecialty = () => {
    setEmptySpecialty(
      'Selecione e salve a especialidade recomendada para esta escala'
    );
  };
  const [initialValues, setInitialValues] = React.useState({
    name: null,
    type_remuneration: null,
    scale_type: null,
    specialty: null,
    hour_start: null,
    hour_end: null,
    duration: null,
    week_day: null,
    price: null,
    quantity_Professional: null,
    budget: null,
    coordinator: null,
    date_end: null,
    date_start: null,
    group: null,
    id: null,
    signature_is_automatic: null,
    signature_is_required: null,
    status: null,
    technical_manager: null,
    unit: null,
  });

  const registerUnitScalesListSchema = Yup.object().shape({
    name: Yup.string().required('obrigatório'),
    quantity_Professional: Yup.number()
      .max(10, 'no máximo 10 vagas')
      .typeError('Apenas números'),
  });

  const getFormatedLabel = (item) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  };

  const handleCloseModal = () => {
    history.push(`/cadastros/escalas`);
  };
  const handleCloseModalError = () => {
    setOpenModalSendNotification(false);
  };

  return (
    <Layout title="Escalas" showToday backArrow>
      <>
        <Typography className={classes.textHospital}>
          {initialValues?.unit?.name}
        </Typography>
        {initialValues.name && (
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={registerUnitScalesListSchema}
            validateOnBlur
            enableReinitialize
          >
            {({
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              handleChange,
              handleBlur,
              values,
              errors,
            }) => (
              <Form>
                <InputContainer>
                  <InputItem style={{ flexGrow: 2 }}>
                    <FastField
                      data-cy="input_nome"
                      style={{ width: '100%' }}
                      label="Nome da escala"
                      variant="outlined"
                      value={values.name}
                      setFieldValue={setFieldValue}
                      onChange={handleChange}
                      name="name"
                      component={CustomTextField}
                    />
                  </InputItem>
                  <InputItem style={{ flexGrow: 2 }} id="Especialidade">
                    {emptySpecialty && !localSpecialty && (
                      <div style={{ marginTop: 32 }} />
                    )}
                    <Field
                      name={
                        initialValues?.specialty && !initialValues?.group
                          ? 'specialty.id'
                          : 'group.id'
                      }
                      style={{ width: '100%' }}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      placeholder={'Especialidade'}
                      errors={
                        errors && errors.specialty && !errors.group
                          ? errors.specialty.id
                          : errors.group?.id
                      }
                      value={
                        values && values?.specialty && !values.group
                          ? getFormatedLabel(values.specialty)
                          : getFormatedLabel(values.group)
                      }
                      handleChange={(data) => {
                        if (data?.value) {
                          setFieldValue(
                            initialValues?.specialty && !initialValues?.group
                              ? 'specialty.id'
                              : 'group.id',
                            data?.value
                          );
                          setFieldValue(
                            initialValues?.specialty && !initialValues?.group
                              ? 'specialty.name'
                              : 'group.name',
                            data?.label
                          );
                        } else {
                          setFieldValue(
                            initialValues?.specialty && !initialValues?.group
                              ? 'specialty.id'
                              : 'group.id',
                            ''
                          );
                          setFieldValue(
                            initialValues?.specialty && !initialValues?.group
                              ? 'specialty.name'
                              : 'group.name',
                            ''
                          );
                        }
                      }}
                      label={'Especialidade'}
                      menuList={() => ({ height: 116, overflowY: 'auto' })}
                      variant="outlined"
                      component={
                        initialValues?.specialty && !initialValues?.group
                          ? CustomSelectSpecialties
                          : CustomSelectGroups
                      }
                    />
                    {emptySpecialty && !localSpecialty && (
                      <p style={{ color: 'red', marginTop: 12 }}>
                        {emptySpecialty}
                      </p>
                    )}
                  </InputItem>
                  <InputItem style={{ flexGrow: 0 }}>
                    <div>
                      <Tooltip title="Editar Escala">
                        <IconButton
                          id="editEscala"
                          className={classes.button}
                          onClick={
                            localSpecialty &&
                            initialValues &&
                            (initialValues?.specialty || initialValues?.group)
                              ? redirectEditScale
                              : alertSpecialty
                          }
                          aria-label="edit"
                        >
                          <EditIcon className={classes.icon} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </InputItem>
                </InputContainer>
                <div className={config.open ? classes.root : classes.rootClose}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TableHead
                        style={{
                          height: 50,
                        }}
                      >
                        <TableRow className={classes.textRow}>
                          <Typography className={classes.textWeek}>
                            Segunda
                          </Typography>
                          <Typography className={classes.textWeek}>
                            Terça
                          </Typography>
                          <Typography className={classes.textWeek}>
                            Quarta
                          </Typography>
                          <Typography className={classes.textWeek}>
                            Quinta
                          </Typography>
                          <Typography className={classes.textWeek}>
                            Sexta
                          </Typography>
                          <Typography className={classes.textWeek}>
                            Sábado
                          </Typography>
                          <Typography className={classes.textWeek}>
                            Domingo
                          </Typography>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {scalesTimesFilter.dataTimesScalesFilter.map(
                          (scales) => (
                            <CardShiftTable
                              key={scales[0].id}
                              scales={scales}
                              options="show"
                              hourStart={scales[0].hour_start}
                              hourEnd={scales[0].hour_end}
                              seachTimesScale={seachTimesScale}
                              handleModalSuccess={handleSuccessScale}
                              handleMsgModalScale={handleMsgModalScale}
                            />
                          )
                        )}
                      </TableBody>
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Button
                    data-cy="btn_adicionar_horario"
                    className={classes.tableAddScales}
                    onClick={handleOpenAddScale}
                  >
                    <Icon className={classes.iconAdd}>add_circle_outline</Icon>
                    <Typography className={classes.textAddTable}>
                      Adicionar horário
                    </Typography>
                  </Button>
                  {openPaper && (
                    <Modal
                      open={true}
                      disableAutoFocus
                      disableEnforceFocus
                      onClose={handleClosePaper}
                    >
                      <div className={classes.modal}>
                        <ScalesRegistrationPaper
                          type="addHour"
                          handleChange={handleChange}
                          values={values}
                          handleClosePaper={handleClosePaper}
                          handleSubmit={handleSubmit}
                          setFieldValue={setFieldValue}
                          handleBlur={handleBlur}
                          errors={errors}
                        />
                      </div>
                    </Modal>
                  )}
                  <div className={classes.rootButton}>
                    <Button
                      data-cy="btn_cancelar"
                      className={classes.buttonCancel}
                      style={{ padding: 0, marginRight: 21 }}
                      onClick={history.goBack}
                    >
                      CANCELAR
                    </Button>
                    {successScaleModal && (
                      <ModalSuccess
                        open={successScaleModal}
                        msg={msgModalState}
                        handleSuccessScale={handleCloseModalSave}
                      />
                    )}
                    <Button
                      data-cy="btn_cadastrar_escala"
                      type="submit"
                      className={classes.buttonSave}
                    >
                      SALVAR
                    </Button>
                    {status.status == 403 ? (
                      <ModalResponseAlert
                        messageTitleAlert="Horário de escala ja cadastrado"
                        openSendFinish={openModalSendNotification}
                        handleCloseSendFinish={handleCloseModalError}
                        error
                      />
                    ) : (
                      <ModalResponseAlert
                        messageTitleAlert="Escala salva com sucesso!"
                        openSendFinish={openModalSendNotification}
                        handleCloseSendFinish={handleCloseModal}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </>
    </Layout>
  );
}
