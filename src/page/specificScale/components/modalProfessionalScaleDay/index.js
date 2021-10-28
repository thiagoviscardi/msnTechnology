import React, { useState, useRef } from 'react';
import { useStyles, ModalContainer } from './styles';
import {
  Modal,
  Icon,
  Typography,
  IconButton,
  Button,
  FormControl,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SendAlertModal from 'shared/component/sendAlertModal';
import { formatDateHour, formatDate2 } from 'utils/converters';
import { useTemplateNotifications } from 'hook/templateNotifications';
import { Link } from 'react-router-dom';
import CustomSelect from 'shared/component/forms/CustomSelect';

export default function ModalProfessionalScaleDay({
  openDetails,
  details,
  handleCloseDetails,
  company,
  user,
}) {
  const [state, setState] = useState({
    open: false,
    openAlert: false,
  });
  const { open, openAlert } = state;
  const [message, setMessage] = useState('');

  const handleCloseMensager = () => {
    setState({ ...state, open: false });
  };

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 5,
    search: '',
    search_type: 'text',
  });
  const { page, per_page, search, search_type } = filter;
  const {
    getList,
    sendNotification,
    data,
    total,
    status,
    setStatus,
    message: messageReturn,
  } = useTemplateNotifications();
  const [badRequestStatus, setBadRequestStatus] = useState(false);

  const handleCloseAlert = () => {
    setState({ ...state, openAlert: false, open: false });
    setStatus('');
  };
  const handleCloseBadAlert = () => {
    setBadRequestStatus(false);
    setStatus('');
  };

  React.useEffect(() => {
    getList({ page, per_page, search, search_type });
  }, [page, search]);

  React.useEffect(() => {
    !open && setMessage('');
  }, [open]);
  const [options, setOptions] = useState([]);

  React.useEffect(() => {
    if (data && data.length > 0) {
      setOptions([
        ...data.map((item) => ({
          label: item.text,
          value: item.id,
        })),
      ]);
    }
  }, [data]);

  const handleChangeMessage = (value) => {
    setMessage(value);
  };

  const handleOpen = () => {
    setState({
      ...state,
      open: true,
    });
  };
  const handleOpenAlert = () => {
    sendNotification({ notificationId: message.value, userId: user?.user.id });
  };
  React.useEffect(() => {
    if (status && status === 200) {
      setState({
        ...state,
        openAlert: true,
      });
    }
    if (message && status && status !== 200) {
      setState({ ...state, open: false });
      setBadRequestStatus(true);
    }
  }, [status]);

  const classes = useStyles();

  const getMessage = (message) => {
    if (
      message ===
      'The user does not have a device connected, ask the user to log in to the app'
    ) {
      return 'Para o usuário receber as notificações, é necessário que tenha efetuado o login no aplicativo ao menos uma vez';
    }
    if (message === 'Failed to send notification') {
      return 'Verifique sua conexão com a internet';
    }
  };
  const handleSearchMesaage = (search) => {
    setFilter((old) => ({ ...old, search }));
  };
  const page_ref = useRef(1);

  const notificationPagination = () => {
    const totalPage = Math.ceil(total / per_page);
    const nextPage = page_ref.current + 1;
    if (page < totalPage) {
      setFilter((oldState) => ({
        ...oldState,
        page: nextPage,
      }));

      page_ref.current = nextPage;
    }
  };

  const topNotificationPagination = () => {
    if (per_page > 1) {
      let prevPage = page_ref.current - 1;
      prevPage = prevPage > 0 ? prevPage : 1;
      setFilter((oldState) => ({
        ...oldState,
        page: prevPage,
      }));

      page_ref.current = prevPage;
    }
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        open={openDetails}
        onClose={handleCloseDetails}
        disableAutoFocus
        disableEnforceFocus
      >
        <ModalContainer>
          <div style={{ minWidth: '30%' }} className={classes.rowModal}>
            {details && details.situation_status === 2 && (
              <>
                <Avatar
                  className={classes.avatarEscalado}
                  src={user.user.image}
                />
                <div className={classes.rowLine}>
                  <div className={classes.ballModalClimbed} />
                  <Typography className={classes.marginScaleType}>
                    Escalado
                  </Typography>
                </div>
              </>
            )}
            {details && details.situation_status === 4 && (
              <>
                <Avatar
                  className={classes.realizadoAvatar}
                  src={user.user.image}
                />
                <div className={classes.rowLine}>
                  <div className={classes.ballModalDone} />
                  <Typography className={classes.marginScaleType}>
                    Realizado
                  </Typography>
                </div>
              </>
            )}
            {details && details.situation_status === 3 && (
              <>
                <Avatar
                  className={classes.ocorrendoAvatar}
                  src={user.user.image}
                />
                <div className={classes.rowLine}>
                  <div className={classes.ballModalOccurring} />
                  <Typography className={classes.marginScaleType}>
                    Ocorrendo
                  </Typography>
                </div>
              </>
            )}
            {Object.keys(details).length > 0 && (
              <>
                <Typography
                  className={classes.textTitleHour}
                  style={{
                    display: 'flex',
                    alignSelf: 'center',
                  }}
                >
                  Horário previsto
                </Typography>
                <div className={classes.hourContainer}>
                  {formatDateHour(user.scale.date_start, ' HH:mm')}-
                  {formatDateHour(user.scale.date_end, ' HH:mm:')}
                  <div>{formatDate2(user.scale.date_start, 'DD/MM/YYYY')}</div>
                </div>
                <Typography className={classes.textTitleHour}>
                  Entrada registrada
                </Typography>
                <div className={classes.hourContainer}>
                  {user.check_in
                    ? formatDateHour(user.check_in, ' HH:mm')
                    : '--'}
                </div>
                <Typography className={classes.textTitleHour}>
                  Saída registrada
                </Typography>
                <div className={classes.hourContainer}>
                  {user.check_out
                    ? formatDateHour(user.check_out, ' HH:mm')
                    : '--'}
                </div>
                <Link
                  to={`/agenda/profissional/${user?.user?.id}`}
                  className={classes.professionalSchedule}
                  id="VerAgendaProf"
                >
                  Ver agenda do profissional
                </Link>
              </>
            )}
          </div>
          <div style={{ minWidth: '70%', paddingLeft: 24 }}>
            <div className={classes.closeButton}>
              <IconButton onClick={handleCloseDetails}>
                <Icon>close</Icon>
              </IconButton>
            </div>
            <div>
              {Object.keys(details).length > 0 && (
                <>
                  <Typography className={classes.textTitle}>
                    Profissional
                  </Typography>
                  <div className={classes.detailsText}>{user.user.name}</div>
                  <Typography className={classes.textTitle}>
                    Área de atuação
                  </Typography>
                  <div className={classes.detailsText}>
                    {user.user.group.name}
                  </div>
                  <Typography className={classes.textTitle}>CRM</Typography>
                  <div className={classes.detailsText}>
                    {user.user.regulation_agency?.number} -
                    {user.user.regulation_agency?.state?.uf}
                  </div>
                  <Typography className={classes.textTitle}>
                    Companhia resposável
                  </Typography>
                  <div className={classes.detailsText}>{company}</div>
                  <Typography className={classes.textTitle}>Contato</Typography>
                  <div className={classes.emailIconContainer}>
                    <Icon className={classes.emailIcon}>email</Icon>
                    <div className={classes.detailsText}>
                      {user?.user.email}
                    </div>
                  </div>
                  <div className={classes.buttonModal}>
                    <Button
                      data-cy="send_alert"
                      onClick={handleOpen}
                      variant="outlined"
                      style={{
                        borderColor: '#24B8EC',
                      }}
                    >
                      <Icon className={classes.sendIcon}>send</Icon>
                      <Typography className={classes.sendAlertText}>
                        Enviar alerta
                      </Typography>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </ModalContainer>
      </Modal>
      {open && (
        <Modal
          className={classes.modalMensager}
          open={open}
          disableAutoFocus
          disableEnforceFocus
        >
          <div
            style={{
              width: '400px',
              height: '330px',
              background: '#FFFFFF',
              borderRadius: '10px',
            }}
          >
            {' '}
            <div className={classes.iconButton}>
              <Typography className={classes.titleModal}>
                Selecionar mensagem pré-definida
              </Typography>
              <IconButton
                onClick={handleCloseMensager}
                style={{ marginTop: 5, marginRight: 11 }}
              >
                <Icon fontSize="small">close</Icon>
              </IconButton>
            </div>
            <FormControl
              data-cy="select_modal_send_notification"
              variant="outlined"
              className={classes.selectContainer}
            >
              <CustomSelect
                loading={false}
                placeholder="Pesquise a mensagem desejada!"
                handleChange={handleChangeMessage}
                value={message ? message : '0'}
                options={options}
                isClearable
                searchItem={handleSearchMesaage}
                pagination={notificationPagination}
                toTopPagination={topNotificationPagination}
              />
            </FormControl>
            <div className={classes.buttonModalAlert}>
              <Button
                data-cy="btn_modal_send_alert"
                disabled={!message}
                onClick={handleOpenAlert}
                variant="outlined"
                style={{
                  borderColor: '#24B8EC',
                }}
              >
                <Icon className={classes.sendIcon}>send</Icon>
                <Typography className={classes.sendAlertText}>
                  Enviar alerta
                </Typography>
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {openAlert && (
        <SendAlertModal
          openAlert={openAlert}
          goback={handleCloseAlert}
          title="Alerta enviado com sucesso!"
          subtitle="A notificação foi enviada para o celular do profissional"
        />
      )}
      {badRequestStatus && (
        <SendAlertModal
          error
          openAlert={badRequestStatus}
          goback={handleCloseBadAlert}
          title="Falha ao enviar."
          subtitle={getMessage(messageReturn)}
        />
      )}
    </div>
  );
}
