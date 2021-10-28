import React, { useState, useContext } from 'react';
import {
  Button,
  CircularProgress,
  Modal,
  TextareaAutosize,
} from '@material-ui/core';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';
import { useAgendaValidation } from 'hook/agenda/validation';

export function ModalAcceptValidation({
  open,
  close,
  title,
  setStatusError = () => {},
  setResponseMessage = () => {},
  setOpenAlertMessage = () => {},
}) {
  const { loading, putAgendaValidation } = useAgendaValidation();

  const {
    agendaDetails,
    selectedUnit,
    setAgendaDetailsData = () => {},
  } = useContext(ProfessionalSchedulePageContext);

  const [validated_description, setValidatedDescription] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (validated_description === '') {
      setError(true);
      return;
    } else {
      setError(false);
      const formData = {
        id: agendaDetails?.id,
        validated_status: 2,
        validated_description,
        unit: { id: selectedUnit?.id },
        scale: { id: agendaDetails?.scale.id },
      };
      putAgendaValidation({ agenda_id: agendaDetails?.id }, formData)
        .then((data) => {
          close();
          setValidatedDescription('');
          setError(false);
          setAgendaDetailsData(data);
          setResponseMessage('Plantão Validado!');
          setOpenAlertMessage(true);
        })
        .catch(() => {
          setTimeout(() => {
            setResponseMessage('Falha ao fazer validação!');
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
            setValidatedDescription(e.target.value);
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
