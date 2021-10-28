import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles, TableLegendItem, ErrorMessage } from './styles';
import ScheduleForm from './ScheduleFormCreate';
import CalendarFormCreate from './CalendarFormCreate';
import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import { useAgendaStatus } from 'hook/agenda/status';
import moment from 'moment';
import { useAgendaDetails } from 'hook/agenda/details';
import { useAgenda } from 'hook/agenda';
import { ModalCardDaysDetails } from '../../ModalCardDaysDetails';
import { ModalResponseAlert } from '../../ModalResponseAlert';
import { ModalConfirmSchedule } from './ModalConfirmSchedule';

function GridModalCalendarCombo() {
  const classes = useStyles();
  const { loading: loadingAgenda, createAgenda } = useAgenda();
  const { data: agendaDetails, loading: loadingAgendaDetails } =
    useAgendaDetails();
  const { data: agendaStatus, getAgendaStatus } = useAgendaStatus();

  const {
    selectedUnit,
    detailsSchedule = {},
    mainFilter = {},
    handleGetAgenda = () => {},
    handleCloseModalScheduleCall = () => {},
  } = useContext(ScheduleWeekPageContext);

  const [openModalDayDetails, setModalDayDetails] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);
  const [blockedDays, setBlockedDays] = useState();
  const [disabledDays, setDisabledDays] = useState([]);
  const [repeatType, setRepeatType] = useState(null);
  const [errorDate, setErrorDate] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [yearMonth, setYearMonth] = useState(null);
  const [alreadyScaled, setAlreadyScaled] = useState({
    ALREADY_SCALED_THIS_HISPITAL: false,
    ALREADY_SCALED_OTHER_HISPITAL: false,
    SAME_HOSPITAL_OTHER_SCALE: false,
    SAME_HOSPITAL_OTHER_SCALE_CREATED: false,
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
    ({ schedule, professional }) => {
      const payload = {
        hour_start: schedule?.hour_start,
        hour_end: schedule?.hour_end,
        user_id: professional?.value,
        year: yearMonth?.year || new Date().getFullYear(),
        month: yearMonth?.month || new Date().getMonth() + 1,
        date_start:
          selectedDays && selectedDays.length > 0
            ? moment(selectedDays[0]).startOf('month').format('YYYY-MM-DD')
            : moment().startOf('month').format('YYYY-MM-DD'),
        date_end:
          selectedDays && selectedDays.length > 0
            ? moment(selectedDays[0]).endOf('month').format('YYYY-MM-DD')
            : moment().startOf('month').format('YYYY-MM-DD'),
        scale_id: detailsSchedule?.scaleData.id,
      };

      getAgendaStatus(payload);
    },
    [selectedDays, yearMonth, detailsSchedule]
  );
  const [formData, setFormData] = React.useState('');

  const onSubmit = (form) => {
    setErrorDate(!selectedDays.length > 0);
    if (selectedDays.length > 0) {
      const formData = {
        price: detailsSchedule?.selected_schedule?.price,
        hour_start: form?.schedule.hour_start,
        hour_end: form?.schedule.hour_end,
        user: {
          id: form?.professional.id,
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
        confirm: form?.confirm ? form.confirm : null,
      };
      setFormData(form);

      createAgenda(formData)
        .then(() => {
          handleCloseModalScheduleCall(false);
          setTimeout(() => {
            handleGetAgenda({ ...mainFilter, scale_name: null });
          }, 200);
        })
        .catch((err) => {
          err === 'error' && setStatusError(true);

          if (Object.keys(alreadyScaled).includes(err)) {
            setAlreadyScaled({
              ...alreadyScaled,
              [err]: true,
            });
            handleGetAgenda({ ...mainFilter, scale_name: null });
          }
        });
    }
  };
  useEffect(() => {
    alreadyScaled['SAME_HOSPITAL_OTHER_SCALE_CREATED'] &&
      setAlreadyScaled({
        ...alreadyScaled,
        SAME_HOSPITAL_OTHER_SCALE: false,
      });
  }, [alreadyScaled['SAME_HOSPITAL_OTHER_SCALE_CREATED']]);

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
          />
        </Grid>
      </Grid>
      <ModalCardDaysDetails
        agendaDetails={agendaDetails}
        loading={loadingAgendaDetails}
        openModalDayDetails={openModalDayDetails}
        handleCloseDayDetails={() => setModalDayDetails(false)}
      />
      <ModalResponseAlert
        openSendFinish={statusError}
        messageTitleAlert={
          'Falha ao Cadastrar! Recarregue a página ou verifique sua conexão com a internet'
        }
        handleCloseSendFinish={() => setStatusError(false)}
        error
      />
      <ModalResponseAlert
        openSendFinish={alreadyScaled['ALREADY_SCALED_THIS_HISPITAL']}
        messageTitleAlert={
          'Profissional agendado na mesma escala desse hospital'
        }
        handleCloseSendFinish={() =>
          setAlreadyScaled({
            ...alreadyScaled,
            ALREADY_SCALED_THIS_HISPITAL: false,
          })
        }
        error
      />
      <ModalResponseAlert
        openSendFinish={alreadyScaled['ALREADY_SCALED_OTHER_HISPITAL']}
        messageTitleAlert={
          'Profissional escalado no mesmo horário em outro hospital'
        }
        handleCloseSendFinish={() =>
          setAlreadyScaled({
            ...alreadyScaled,
            ALREADY_SCALED_OTHER_HISPITAL: false,
          })
        }
        error
      />
      <ModalResponseAlert
        openSendFinish={alreadyScaled['SAME_HOSPITAL_OTHER_SCALE_CREATED']}
        messageTitleAlert={
          'Profissional cadastrado com sucesso, porém já está agendado em outra escala do mesmo horário.'
        }
        handleCloseSendFinish={() =>
          setAlreadyScaled({
            ...alreadyScaled,
            SAME_HOSPITAL_OTHER_SCALE_CREATED: false,
          })
        }
        alert
      />
      <ModalConfirmSchedule
        openSendFinish={alreadyScaled['SAME_HOSPITAL_OTHER_SCALE']}
        messageTitleAlert={
          'Profissional já cadastrado em outra escala no mesmo horário. Deseja prosseguir?'
        }
        onSubmit={() => onSubmit({ ...formData, confirm: true })}
        handleCloseSendFinish={() =>
          setAlreadyScaled({
            ...alreadyScaled,
            SAME_HOSPITAL_OTHER_SCALE: false,
          })
        }
      />
    </div>
  );
}

export default GridModalCalendarCombo;
