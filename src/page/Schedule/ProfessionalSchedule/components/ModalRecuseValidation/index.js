import React, { useState, useContext } from 'react';
import {
  Button,
  CircularProgress,
  Modal,
  TextareaAutosize,
} from '@material-ui/core';
import { useAgendaValidation } from 'hook/agenda/validation';
import CustomSelect from 'shared/component/forms/CustomSelect';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';

export function ModalRecuseValidation({
  open,
  close,
  title,
  setStatusError = () => {},
  setResponseMessage = () => {},
  setOpenAlertMessage = () => {},
}) {
  const { loading, putAgendaValidation } = useAgendaValidation();

  const {
    agendaDetails = {},
    selectedUnit,
    setAgendaDetailsData = () => {},
  } = useContext(ProfessionalSchedulePageContext);

  const [validated_description, setValidatedDescription] = useState('');
  const [reasonType, setReasonType] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (validated_description === '') {
      setError(true);
      return;
    } else {
      setError(false);
      const formData = {
        id: agendaDetails?.id,
        validated_status: 1,
        validated_description,
        unit: { id: selectedUnit?.id },
        scale: { id: agendaDetails?.scale.id },
        validated_pendency: reasonType?.value,
      };
      putAgendaValidation({ agenda_id: agendaDetails?.id }, formData)
        .then((data) => {
          close();
          setValidatedDescription('');
          setError(false);
          setAgendaDetailsData(data);
          setResponseMessage('Plantão Invalidado com sucesso!');
          setOpenAlertMessage(true);
        })
        .catch(() => {
          setTimeout(() => {
            setResponseMessage('Falha ao Invalidado plantão!');
            setStatusError(true);
          }, 300);
        });
    }
  };

  const reasons = [
    {
      value: 0,
      label: 'Não compareceu',
    },
    {
      value: 1,
      label: 'Outros',
    },
  ];

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
          height: 'auto',
          padding: '2rem',
          background: '#FFFFFF',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p>{title}</p>
        <div style={{ marginTop: 25 }}>
          <CustomSelect
            name="validated_pendency"
            loading={false}
            placeholder="Selecione um motivo"
            handleChange={(val) => setReasonType(val)}
            value={reasonType}
            options={reasons}
            isClearable
          />
        </div>
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
