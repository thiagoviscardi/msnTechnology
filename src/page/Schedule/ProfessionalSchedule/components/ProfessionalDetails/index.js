import React, { useContext, useMemo, memo, useState, useRef } from 'react';
import {
  Button,
  CircularProgress,
  Divider,
  Icon,
  Paper,
} from '@material-ui/core';
import {
  styles,
  TitleDate,
  AvatarProfessional,
  ProfessionalName,
  SpecialtiesNames,
  CompanyName,
  UnitName,
  ScaleName,
  TitleCheckin,
  Time,
  TitleCheckout,
  PrevistTime,
  WorkedHours,
} from './styles';
import appColors from 'utils/appColors';
import SwitchSituation from 'shared/component/SwitchSituation';
import { formatDate } from 'react-day-picker/moment';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';
import moment from 'moment';
import { ModalResponseAlert } from 'page/Schedule/WeekSchedule/components/ModalResponseAlert';
import { ModalSendAlert } from 'page/Schedule/WeekSchedule/components/ModalSendAlert';
import { useTemplateNotifications } from 'hook/templateNotifications';

function ProfessionalDetails() {
  const classes = styles();
  const [badRequestStatus, setBadRequestStatus] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    per_page: 5,
    search: '',
    search_type: 'text',
  });
  const { page, per_page, search, search_type } = filter;
  const [openSendFinish, setOpenSendFinish] = useState(false);

  const { selectedUnit, agendaDetails, dataUnitAgenda, loadingAgendaDetails } =
    useContext(ProfessionalSchedulePageContext);
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
  const formatedDate = (date) => {
    return `${formatDate(date, 'LL', 'pt-br')}`;
  };

  const formatedSpecialties = (specialties) => {
    if (specialties && specialties.length > 0) {
      const joinedSpecialites = specialties.map((item) => item.name).join(', ');
      return joinedSpecialites;
    } else {
      return '...';
    }
  };

  const formatedHours = (date) => {
    return moment(date).format('HH:mm:ss');
  };

  const getAllAgendas = () => {
    try {
      const agendas = dataUnitAgenda[0][0].agendas;
      return agendas;
    } catch (e) {
      return [];
    }
  };
  const countedPrevistHours = useMemo(() => {
    let countedHours = 0;
    getAllAgendas().map((item) => {
      countedHours += moment(item?.date_end).diff(item?.date_start, 'hours');
    });
    return countedHours;
  }, [dataUnitAgenda]);

  const countedWorkedHours = useMemo(() => {
    let countedHours = 0;
    getAllAgendas()
      .filter((item) => item?.check_in && item?.check_out)
      .map((item) => {
        countedHours += moment(item?.check_out).diff(item?.check_in, 'hours');
      });
    return countedHours;
  }, [dataUnitAgenda]);

  const GROUP_MEDICO = 3;
  const [openModalSendNotification, setOpenModalSendNotification] =
    React.useState(false);
  const handleOpenSendNotification = () => {
    setOpenModalSendNotification(true);
  };

  const handleCloseSendNotification = () => {
    setOpenModalSendNotification(false);
  };

  const sendNotificationToUser = (notificationId) => {
    sendNotification({
      notificationId,
      userId: agendaDetails?.user?.id,
    });
  };
  const handleCloseSendFinish = () => {
    setStatus('');
    setOpenSendFinish(false);
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
    <Paper
      data-cy="professional_schedule_details"
      elevation={0}
      className={classes.paper}
    >
      {!loadingAgendaDetails ? (
        <>
          <TitleDate>{formatedDate(agendaDetails?.date_start)}</TitleDate>
          <AvatarProfessional
            alt="image-professional"
            src={agendaDetails?.user?.image_url}
            color={appColors.PRIMARY_COLOR}
            className={classes.large}
          />
          <ProfessionalName>{agendaDetails?.user?.name}</ProfessionalName>
          <SpecialtiesNames>
            {agendaDetails?.user?.group?.id === GROUP_MEDICO
              ? formatedSpecialties(agendaDetails?.user?.specialties)
              : agendaDetails?.user?.group?.name}
          </SpecialtiesNames>
          <CompanyName>
            {agendaDetails?.company?.name ||
              agendaDetails?.user?.company?.name ||
              '---'}
          </CompanyName>
          <UnitName>{agendaDetails?.unit?.name || selectedUnit?.name}</UnitName>
          <ScaleName>{agendaDetails?.scale?.name}</ScaleName>
          <div style={{ marginTop: 8 }}>
            <SwitchSituation
              item={{
                situation: agendaDetails?.situation,
                situation_status: agendaDetails?.situation_status,
              }}
            />
          </div>
          {agendaDetails?.signature && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                alt="signature"
                style={{ width: 160, height: 85 }}
                src={agendaDetails?.signature}
              />
            </div>
          )}
          <div>
            <TitleCheckin id="titleEntrada">Entrada registrada</TitleCheckin>
            <Time>
              {agendaDetails?.user_date_start
                ? formatedHours(agendaDetails?.user_date_start)
                : '--'}
            </Time>
            <TitleCheckout id="titleSaida">Saída registrada</TitleCheckout>
            <Time>
              {agendaDetails?.user_date_end
                ? formatedHours(agendaDetails?.user_date_end)
                : '--'}
            </Time>
          </div>
          <Divider className={classes.divider} />
          <PrevistTime>{`${countedPrevistHours}`} Horas Previstas</PrevistTime>
          <WorkedHours>{`${countedWorkedHours}`} Horas Trabalhadas</WorkedHours>
          <Button
            className={classes.button}
            onClick={handleOpenSendNotification}
            startIcon={<Icon style={{ fontSize: 16 }}>send</Icon>}
          >
            Enviar alerta
          </Button>
        </>
      ) : (
        <div className={classes.loading_container}>
          <CircularProgress color="primary" size={50} />
        </div>
      )}
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
    </Paper>
  );
}

export default memo(ProfessionalDetails);
