import React, { useState, useContext, useRef } from 'react';
import Icon from '@material-ui/core/Icon';
import {
  Avatar,
  Button,
  IconButton,
  Modal,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ModalSendAlert } from '../../ModalSendAlert';
import { ModalResponseAlert } from '../../ModalResponseAlert';
import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import { formatDate } from 'react-day-picker/moment';
import { useStyles, SituationContainer } from './styles';
import moment from 'moment';
import { formatPrice } from 'utils/formatPrice';
import SwitchSituation from '../../../../../../shared/component/SwitchSituation';
import { useTemplateNotifications } from 'hook/templateNotifications';
import ChangeHistory from '../../HistoryChange';
import HasPermission from 'utils/checkPermission';

function LeftGridInfo() {
  const [badRequestStatus, setBadRequestStatus] = useState(false);
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
    status,
    total,
    setStatus,
    message: messageReturn,
  } = useTemplateNotifications();
  React.useEffect(() => {
    getList({ page, per_page, search, search_type });
  }, [page, search]);
  const classes = useStyles();
  const permissions = {
    value: 'scheduleValue/r',
  };

  const { agendaDetails, dataValue } = useContext(ScheduleWeekPageContext);
  const [openModalSendNotification, setOpenModalSendNotification] =
    useState(false);
  const [openSendFinish, setOpenSendFinish] = useState(false);

  const dataObj = moment(new Date()).format('YYYY-MM-DD');
  const dayModal = moment(agendaDetails?.date_end).format('YYYY-MM-DD');
  const [blockButtons, setBlockButtons] = useState(false);
  React.useEffect(() => {
    if (moment(dayModal).isBefore(dataObj)) setBlockButtons(true);
  }, []);

  const sendNotificationToUser = (notificationId) => {
    sendNotification({
      notificationId,
      userId: agendaDetails?.user?.id,
    });
  };

  const handleSearchMesaage = (search) => {
    setFilter((old) => ({ ...old, search }));
  };
  const handleCloseSendFinish = () => {
    setStatus('');
    setOpenSendFinish(false);
    setOpenModalSendNotification(false);
  };

  const handleOpenSendNotification = () => {
    setOpenModalSendNotification(true);
  };

  const handleCloseSendNotification = () => {
    setOpenModalSendNotification(false);
  };

  const handleCloseBadAlert = () => {
    setStatus('');
    setBadRequestStatus(false);
  };

  React.useEffect(() => {
    if (status === 200) {
      setOpenSendFinish(true);
    }
    if (status && status !== 200) {
      setOpenModalSendNotification(false);
      setBadRequestStatus(true);
    }
  }, [status]);

  const formatedDate = (date) => {
    return `${formatDate(date, 'LL', 'pt-br')}`;
  };

  const formatHour = (hour) => moment(hour).format('HH:mm');

  const getSpecialties = (specialties) => {
    if (!specialties || !specialties.length > 0) return <span>...</span>;
    const concatedNames = specialties[0].name;
    return <span>{concatedNames}</span>;
  };

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
  const [detailValueModal, setDetailValueModal] = React.useState(false);

  const openDetailValueModal = () => setDetailValueModal(true);
  const handleClose = () => setDetailValueModal(false);
  const priceFormat = (val) =>
    new Intl.NumberFormat([], {
      style: 'currency',
      currency: 'BRL',
    }).format(val);

  return (
    <>
      <div className={classes.main_container}>
        <div className={classes.top_container}>
          <Avatar
            alt="User image"
            src={agendaDetails?.user?.image_url}
            className={classes.avatar}
          />
          <div>
            <h3
              style={{
                fontSize: '14px',
                textAlign: 'center',
                fontWeight: '500',
                margin: '0 3px',
              }}
            >
              {agendaDetails?.user?.name}
            </h3>
            <p style={{ fontSize: '12px', fontWeight: '400' }}>
              {getSpecialties(agendaDetails?.user?.specialties)}
            </p>
          </div>
          <Link
            to={`/agenda/profissional/${agendaDetails?.user?.id}`}
            className={classes.link_to_schedule}
            id="VerAgendaProf"
          >
            Ver agenda do profissional
          </Link>
        </div>
        <div className={classes.bottom_container}>
          <SituationContainer>
            {agendaDetails?.situation && (
              <SwitchSituation item={agendaDetails} />
            )}
          </SituationContainer>
          <div style={{ textAlign: 'center' }}>
            <p className={classes.previst_hour}>Horário previsto</p>
            <span className={classes.date_schedule}>
              {formatedDate(agendaDetails?.date_start)} <br />{' '}
              {formatHour(agendaDetails?.date_start)} -{' '}
              {formatHour(agendaDetails?.date_end)}
            </span>

            <div>
              {HasPermission(permissions.value) ? (
                ((<p className={classes.title_value}>Valor</p>),
                agendaDetails?.price !== agendaDetails?.price_default ? (
                  <>
                    <IconButton
                      id="Info"
                      onClick={openDetailValueModal}
                      style={{ padding: 0, marginRight: 6 }}
                    >
                      <Icon style={{ color: '#ffd700' }}>info</Icon>
                    </IconButton>
                    <span className={classes.value} id="Valor">
                      {formatPrice(
                        agendaDetails?.price <= -1 ? 0 : agendaDetails?.price
                      )}
                    </span>
                  </>
                ) : (
                  <span className={classes.value} id="Valor">
                    {formatPrice(agendaDetails?.price)}
                  </span>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <Button
            disabled={blockButtons}
            data-cy="btn_send_alert"
            className={classes.button}
            onClick={handleOpenSendNotification}
            startIcon={<Icon style={{ fontSize: 16 }}>send</Icon>}
          >
            Enviar alerta
          </Button>
        </div>
      </div>

      <ModalSendAlert
        open={openModalSendNotification}
        close={handleCloseSendNotification}
        title="Selecionar mensagem pré-definida"
        dispatchMessage={sendNotificationToUser}
        options={data}
        searchItem={handleSearchMesaage}
        notificationPagination={notificationPagination}
        topNotificationPagination={topNotificationPagination}
      />
      <ModalResponseAlert
        openSendFinish={openSendFinish}
        messageTitleAlert="Alerta enviado com sucesso!"
        subtitle="A notificação foi enviada para o celular do profissional"
        handleCloseSendFinish={handleCloseSendFinish}
      />
      {badRequestStatus && (
        <ModalResponseAlert
          error
          openSendFinish={badRequestStatus}
          handleCloseSendFinish={handleCloseBadAlert}
          messageTitleAlert="Falha ao enviar."
          subtitle={getMessage(messageReturn)}
        />
      )}
      {detailValueModal && (
        <Modal
          onClose={handleClose}
          disableAutoFocus
          disableEnforceFocus
          open={detailValueModal}
        >
          <div
            style={{
              borderRadius: 10,
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '18%',
              marginLeft: '30%',
              marginRight: '30%',
              maxHeight: 500,
              overflowY: 'auto',
              padding: 10,
            }}
          >
            <Typography
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                padding: 10,
              }}
            >
              Histórico de valores
            </Typography>
            <Typography
              style={{
                textAlign: 'right',
                marginRight: 12,
                margin: '20px 10px',
              }}
            >
              {`Valor original: ${priceFormat(agendaDetails.price_default)}`}
            </Typography>

            {dataValue &&
              dataValue.length > 0 &&
              dataValue.map((item) => (
                <ChangeHistory
                  name={item?.user?.name}
                  key={item.id}
                  lastUpdate={item.updated_at}
                  description={item.description}
                  value={item.value}
                />
              ))}
            <Typography
              style={{
                textAlign: 'right',
                marginRight: 12,
                color: '#6d9917',
                fontWeight: 600,
              }}
            >
              {`Valor Atual: ${priceFormat(agendaDetails.price)}`}
            </Typography>
          </div>
        </Modal>
      )}
    </>
  );
}

export default LeftGridInfo;
