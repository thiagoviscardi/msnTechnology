import React, { useState, useContext } from 'react';
import {
  Button,
  CircularProgress,
  Icon,
  IconButton,
  Modal,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import { useAgendaValuePrice } from 'hook/agenda/value_price';
import { useHistory } from 'react-router-dom';

export function ModalRemoveValueSchedule({
  open,
  close,
  title,
  setStatusError = () => {},
  setResponseMessage = () => {},
  setOpenAlertMessage = () => {},
}) {
  const { loading, putAgendaValuePrice } = useAgendaValuePrice();

  const {
    agendaDetails,
    setAgendaDetailsData = () => {},
    getAgendaDetails = () => {},
    handleGetAgenda = () => {},
  } = useContext(ScheduleWeekPageContext);

  const [description, setValidatedDescription] = useState('');
  const [valuePrice, setValuePrice] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();
  const handleSubmit = () => {
    if (description && !valuePrice) {
      setError(true);
      return;
    } else {
      setError(false);
      const params = {
        description,
        user_id: { id: agendaDetails?.user.id },
        value:
          agendaDetails?.price - valuePrice < 0
            ? -agendaDetails?.price
            : -valuePrice,
      };
      putAgendaValuePrice({ agenda_id: agendaDetails?.id }, params)
        .then((data) => {
          close(history.push(`/agenda/semana`));
          setValidatedDescription('');
          setValuePrice('');
          setError(false);
          setAgendaDetailsData(data);
          setResponseMessage('Valor alterado!');
          setOpenAlertMessage(true);
          setTimeout(() => {
            getAgendaDetails({ agenda_id: agendaDetails.id });
            handleGetAgenda();
          }, 300);
        })
        .catch(() => {
          setTimeout(() => {
            setResponseMessage('Falha ao fazer alterar valor!');
            setStatusError(true);
          }, 300);
        });
    }
  };
  return (
    <Modal
      open={open}
      onClose={close}
      disableAutoFocus
      disableEnforceFocus
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
        <p
          style={{
            marginBottom: 15,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>{title}</div>
          <div>
            <IconButton style={{ padding: 0 }} onClick={close}>
              <Icon fontSize="small">close</Icon>
            </IconButton>
          </div>
        </p>

        <TextField
          id="FildRemoverVaor"
          label="Remover valor"
          type="number"
          variant="outlined"
          placeholder="R$ 0,00"
          value={valuePrice}
          onChange={(e) => {
            setValuePrice(e.target.value);
          }}
        />
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
          placeholder="Observa????o"
        />
        {error && (
          <span style={{ fontSize: 12, marginTop: 5, color: 'red' }}>
            Obrigat??rio!
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
            id="BtnSalvar"
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
              'Salvar'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
