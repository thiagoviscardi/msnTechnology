import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Icon,
  IconButton,
  Modal,
} from '@material-ui/core';
import { useAgendaValidation } from 'hook/agenda/validation';
import { ModalAddValueSchedule } from './addValueModal';
import { ModalRemoveValueSchedule } from './removeValueModal';

export function ModalTogglePriceSchedule({
  open = false,
  title = '',
  close = () => {},
  setStatusError = () => {},
  setResponseMessage = () => {},
  setOpenAlertMessage = () => {},
}) {
  const { loading } = useAgendaValidation();

  const [stateModalAdd, setStateModalAdd] = useState(false);
  const [stateModalRemove, setStateModalRemove] = useState(false);

  return (
    <Modal
      open={open}
      disableAutoFocus
      disableEnforceFocus
      onClose={close}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          width: 360,
          background: '#FFFFFF',
          borderRadius: '10px',
          padding: '1.5rem',
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            id="BtnAdicionarValor"
            style={{
              background: '#0F83AD',
              width: '136px',
              height: '42px',
              fontSize: '14px',
              borderRadius: '4px',
              color: '#ffffff',
              textTransform: 'unset',
              marginTop: 20,
            }}
            onClick={() => setStateModalAdd(true)}
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: 'white' }} />
            ) : (
              'Adicionar Valor'
            )}
          </Button>
          <Button
            id="BtnRemoverValor"
            style={{
              background: '#CF0E0E',
              width: '136px',
              height: '42px',
              fontSize: '14px',
              borderRadius: '4px',
              color: '#ffffff',
              textTransform: 'unset',
              marginTop: 20,
            }}
            onClick={() => setStateModalRemove(true)}
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: 'white' }} />
            ) : (
              'Remover Valor'
            )}
          </Button>
        </div>
        <ModalAddValueSchedule
          open={stateModalAdd}
          close={close}
          setResponseMessage={setResponseMessage}
          setOpenAlertMessage={setOpenAlertMessage}
          setStatusError={setStatusError}
          title="Adicionar valor"
        />
        <ModalRemoveValueSchedule
          open={stateModalRemove}
          close={close}
          setResponseMessage={setResponseMessage}
          setOpenAlertMessage={setOpenAlertMessage}
          setStatusError={setStatusError}
          title="Remover valor"
        />
      </div>
    </Modal>
  );
}
