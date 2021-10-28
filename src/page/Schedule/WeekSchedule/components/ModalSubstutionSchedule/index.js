import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  Modal,
} from '@material-ui/core';
import CustomSelectProfessionals from 'shared/component/forms/CustomSelectProfessionals';
import moment from 'moment';
import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import { useAgendaValidation } from 'hook/agenda/validation';
import axios from 'axios';
import { formatDate } from 'react-day-picker/moment';

export function ModalSubstutionSchedule({
  open = false,
  title = '',
  close = () => {},
  setStatusError = () => {},
  setResponseMessage = () => {},
  setOpenAlertMessage = () => {},
}) {
  const { loading, putAgendaSubstitution } = useAgendaValidation();

  const {
    selectedUnit = {},
    detailsSchedule = {},
    setAgendaDetailsData = () => {},
    handleGetAgenda = () => {},
  } = useContext(ScheduleWeekPageContext);

  const [professional, setProfessional] = useState(null);
  const [errorVeifyProfessional, setErrorVerifyProfessional] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => {
      setProfessional(null);
      setErrorVerifyProfessional(false);
      setError(false);
    };
  }, []);

  const handleSubmit = () => {
    if (!professional) {
      setError(true);
      return;
    }
    setError(false);
    const formData = {
      id: detailsSchedule?.id,
      substitution_date: moment().format('YYYY-MM-DD'),
      unit: { id: selectedUnit?.id },
      scale: { id: detailsSchedule?.scaleData.id },
      user: { id: professional.value },
      user_id: professional.value,
      user_old_id: detailsSchedule?.user?.id,
      substitution: 1,
      selectedWeek: {
        date_start: detailsSchedule?.scaleData?.date_start,
        date_end: detailsSchedule?.scaleData?.date_end,
      },
      scheduleId: detailsSchedule?.schedule_id,
      date_start: detailsSchedule?.scaleData?.date_start,
      date_end: detailsSchedule?.scaleData?.date_end,
    };
    putAgendaSubstitution(
      {
        agenda_id: detailsSchedule?.id,
        substitution: 1,
        date_agenda_start: detailsSchedule.date_start,
        date_agenda_end: detailsSchedule.date_end,
      },
      formData
    )
      .then((data) => {
        close();
        setProfessional(null);
        setError(false);
        setResponseMessage('Profissional Substituído com sucesso!');
        setOpenAlertMessage(true);
        setAgendaDetailsData(data);
        setTimeout(() => {
          handleGetAgenda();
        }, 300);
      })
      .catch((err) => {
        if (err === 'error') {
          setTimeout(() => {
            close();
            setResponseMessage('Falha ao fazer substituição!');
            setStatusError(true);
          }, 300);
        } else {
          setErrorVerifyProfessional(err);
        }
      });
  };

  const formatedDate = (date) => {
    return `${formatDate(date, 'M', 'pt-br')}`;
  };

  const formatedDateYear = (date) => {
    return `${formatDate(date, 'YYYY', 'pt-br')}`;
  };

  const formatHour = (hour) => moment(hour).format('HH');

  return (
    <Modal
      open={open}
      onClose={close}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        data-cy="modal_substituir_profissional_agendamento"
        style={{
          width: 360,
          height: 'auto',
          background: '#FFFFFF',
          borderRadius: '10px',
          padding: '1.5rem',
        }}
      >
        <p>{title}</p>
        <FormControl
          variant="outlined"
          style={{
            width: '100%',
            marginTop: '16px',
          }}
        >
          <CustomSelectProfessionals
            name="professional"
            id="professional"
            placeholder="Selecione o profissional"
            menuList={() => ({ height: 116, overflowY: 'auto' })}
            handleChange={async (data) => {
              setProfessional(data);
              if (data?.value) {
                setError(false);
                setErrorVerifyProfessional(false);
              }
              let month = formatedDate(detailsSchedule?.date_start);
              let year = formatedDateYear(detailsSchedule?.date_start);
              let hour_s = formatHour(detailsSchedule?.scaleData?.date_start);
              let hour_e = formatHour(detailsSchedule?.scaleData?.date_end);
              const response = await axios.post(
                'https://api.apps.plantaoextra.com/v2/admin/agendas/check_month_day/',
                {
                  params: {
                    user_id: data?.value,
                    month: month,
                    year: year,
                    hour_start: hour_s,
                    hour_end: hour_e,
                  },
                }
              );
              response;
            }}
            value={professional}
            unit_id={selectedUnit?.id}
            isClearable
          />
          {error && (
            <span style={{ fontSize: 12, marginTop: 5, color: 'red' }}>
              Obrigatório!
            </span>
          )}
          {errorVeifyProfessional && (
            <span style={{ fontSize: 12, marginTop: 5, color: 'red' }}>
              {errorVeifyProfessional}
            </span>
          )}
        </FormControl>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{
              background: '#0F83AD',
              width: '136px',
              height: '32px',
              fontSize: '12px',
              borderRadius: '4px',
              color: '#ffffff',
              textTransform: 'unset',
              marginTop: 100,
            }}
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: 'white' }} />
            ) : (
              'Confirmar'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
