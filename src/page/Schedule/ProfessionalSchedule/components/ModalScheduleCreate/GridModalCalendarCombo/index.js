import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles, TableLegendItem, ErrorMessage } from './styles';
import ScheduleForm from './ScheduleFormCreate';
import CalendarFormCreate from './CalendarFormCreate';
import { useAgendaStatus } from 'hook/agenda/status';
import MessageNotification from 'shared/component/messageNotification';
import moment from 'moment';
import { useAgendaDetails } from 'hook/agenda/details';
import { useAgenda } from 'hook/agenda';
import { ModalCardDaysDetails } from '../../ModalCardDaysDetails';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';
import { ModalResponseAlert } from '../../ModalResponseAlert';

function GridModalCalendarCombo() {
  const classes = useStyles();
  const { loading: loadingAgenda, createAgenda } = useAgenda();
  const {
    data: agendaCardDetails,
    loading: loadingAgendaDetails,
    getDetailsSimpleCard,
  } = useAgendaDetails();
  const { data: agendaStatus, getAgendaStatus } = useAgendaStatus();

  const {
    selectedUnit,
    detailsSchedule = {},
    mainFilter = {},
    handleGetAgenda = () => {},
    handleCloseModalScheduleCall = () => {},
  } = useContext(ProfessionalSchedulePageContext);

  const [openModalDayDetails, setModalDayDetails] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);
  const [blockedDays, setBlockedDays] = useState();
  const [disabledDays, setDisabledDays] = useState([]);
  const [repeatType, setRepeatType] = useState(null);
  const [errorDate, setErrorDate] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const [openAlertMessage, setOpenAlertMessage] = useState(false);

  const [yearMonth, setYearMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  useEffect(() => {
    if (detailsSchedule?.daySelected)
      setSelectedDays([detailsSchedule?.daySelected]);
  }, [detailsSchedule]);

  useEffect(() => {
    const { week_day, blocked_days } = agendaStatus;
    if (!!blocked_days && blocked_days.length > 0)
      handleMarkBlockedDays(blocked_days);
    if (!!week_day && week_day.length > 0) handleDisableWeekDays(week_day);
  }, [agendaStatus]);

  const handleUpScheduleDetails = useCallback(
    (day) => {
      const { blocked_days } = agendaStatus;
      const agendaProps =
        blocked_days &&
        blocked_days.find(
          (item) =>
            moment(item.day).format('YYYY-MM-DD') ===
            moment(day).format('YYYY-MM-DD')
        );

      if (agendaProps?.agenda_id) {
        setModalDayDetails(true);
        getDetailsSimpleCard({ agenda_id: agendaProps?.agenda_id });
      }
    },
    [agendaStatus]
  );

  const handleMarkBlockedDays = (blocked_days) => {
    const result = blocked_days.map((item) =>
      moment(item.day, 'YYYY-MM-DD').toDate()
    );
    setBlockedDays(result);
  };

  const handleRemoveBlockedDays = () => {
    if (!!blockedDays && blockedDays.length > 0)
      setSelectedDays((old) => [...old.filter((item) => !isDayBloqued(item))]);
  };

  const handleRemoveBlockedWeekDays = () => {
    if (!!disabledDays && disabledDays.length > 0)
      setSelectedDays((old) => [
        ...old.filter((item) => {
          const weekDay = moment(item).day();
          return !disabledDays.includes(weekDay);
        }),
      ]);
  };

  useEffect(handleRemoveBlockedDays, [blockedDays]);
  useEffect(handleRemoveBlockedWeekDays, [disabledDays]);

  const isDayBloqued = (day) => {
    return !!blockedDays.find(
      (element) =>
        moment(element, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
        moment(day).format('YYYY-MM-DD')
    );
  };

  const handleDisableWeekDays = (weekDays) => {
    const result = weekDays
      .filter((item) => item.status === 0)
      .map((item) => (item.day < 6 ? item.day + 1 : 0));
    setDisabledDays(result);
  };

  const handleCheckAgendaStatus = useCallback(
    ({ schedule }) => {
      const payload = {
        hour_start: schedule?.hour_start,
        hour_end: schedule?.hour_end,
        user_id: mainFilter?.user_id,
        year: yearMonth?.year,
        month: yearMonth?.month,
        scale_id: detailsSchedule?.scaleData?.id,
      };
      getAgendaStatus(payload);
    },
    [yearMonth, detailsSchedule]
  );

  const onSubmit = (form) => {
    setErrorDate(!selectedDays.length > 0);
    if (selectedDays.length > 0) {
      const formData = {
        price: detailsSchedule?.selected_schedule?.price,
        hour_start: form?.schedule.hour_start,
        hour_end: form?.schedule.hour_end,
        user: {
          id: mainFilter?.user_id,
        },
        unit: {
          id: selectedUnit?.id,
        },
        scale: {
          id: detailsSchedule?.scaleData.id,
        },
        schedule: {
          id: detailsSchedule?.selected_schedule.id,
        },
        selectedDays: [
          ...selectedDays.map((item, index) => ({
            id: index,
            date_start: moment(item).format('YYYY-MM-DD'),
            date_end: moment(item).format('YYYY-MM-DD'),
          })),
        ],
      };
      createAgenda(formData)
        .then(() => {
          setOpenAlertMessage(true);
          setTimeout(() => {
            handleGetAgenda({ ...mainFilter, scale_name: null });
          }, 200);
          setTimeout(() => {
            handleCloseModalScheduleCall(false);
          }, 2000);
        })
        .catch((err) => {
          err === 'error' && setStatusError(true);
        });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="flex-start" spacing={0}>
        <Grid item xs>
          <CalendarFormCreate
            repeatType={repeatType}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            setYearMonth={setYearMonth}
            blockedDays={blockedDays}
            disabledDays={disabledDays}
            detailsSchedule={detailsSchedule}
            handleUpScheduleDetails={handleUpScheduleDetails}
          />
          {!errorDate || selectedDays.length > 0 ? (
            <>
              <TableLegendItem color="#1F437F">
                <div />
                Dias em que o profissional já está escalado
              </TableLegendItem>
              <TableLegendItem color="#646464">
                <div />
                Não há um horário para este dia
              </TableLegendItem>
            </>
          ) : (
            <ErrorMessage>
              <div />
              Selecione pelo menos um dia!
            </ErrorMessage>
          )}
        </Grid>
        <Grid item xs>
          <ScheduleForm
            onSubmit={onSubmit}
            handleCheckAgendaStatus={handleCheckAgendaStatus}
            yearMonth={yearMonth}
            setRepeatType={setRepeatType}
            loading={loadingAgenda}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            blockedDays={blockedDays}
            disabledDays={disabledDays}
          />
        </Grid>
      </Grid>
      <ModalCardDaysDetails
        agendaDetails={agendaCardDetails}
        loading={loadingAgendaDetails}
        openModalDayDetails={openModalDayDetails}
        handleCloseDayDetails={() => setModalDayDetails(false)}
      />
      <ModalResponseAlert
        openSendFinish={openAlertMessage}
        messageTitleAlert={'Plantão agendado com sucesso!'}
        handleCloseSendFinish={() => setOpenAlertMessage(false)}
      />
      <MessageNotification
        openNotification={statusError}
        closeNotification={() => setStatusError(false)}
        type={'error'}
        message={'Falha ao Cadastrar!'}
        vertical={10}
        horizontal="40vw"
      />
    </div>
  );
}

export default GridModalCalendarCombo;
