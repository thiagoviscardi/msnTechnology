import React, { useState, useContext } from 'react';
import {
  Button,
  CircularProgress,
  Modal,
  TextareaAutosize,
} from '@material-ui/core';
import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import { useAgendaValidation } from 'hook/agenda/validation';

export function ModalPaymentSchedule({
  open,
  close,
  title,
  setStatusError = () => {},
  setResponseMessage = () => {},
  setOpenAlertMessage = () => {},
}) {
  const { loading, putAgendaPaymentAtSight } = useAgendaValidation();

  const { agendaDetails, handleGetAgenda = () => {} } = useContext(
    ScheduleWeekPageContext
  );

  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (comment === '') {
      setError(true);
      return;
    } else {
      setError(false);
      putAgendaPaymentAtSight({ agenda_id: agendaDetails?.id, comment })
        .then(() => {
          close();
          setComment('');
          setError(false);
          setResponseMessage('Plantão Colocado à vista!');
          setOpenAlertMessage(true);
          setTimeout(() => {
            handleGetAgenda();
          }, 300);
        })
        .catch(() => {
          setTimeout(() => {
            setResponseMessage('Falha, tente novamente em instantes!');
            setStatusError(true);
          }, 300);
        });
    }
  };

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
        data-cy="modal_pagar_agendamento"
        style={{
          width: '360px',
          height: '296px',
          padding: '2rem',
          background: '#FFFFFF',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p>{title}</p>
        <TextareaAutosize
          style={{
            width: '100%',
            height: '128px',
            borderRadius: '4px',
            marginTop: '16px',
            border: '1px solid #A2A5A8',
            padding: '1rem ',
          }}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          rowsMax={8}
          placeholder="Observação"
        />
        {error && (
          <span style={{ fontSize: 12, marginTop: 5, color: 'red' }}>
            Obrigatório!
          </span>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
              marginTop: '32px',
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
