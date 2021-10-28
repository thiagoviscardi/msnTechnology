import React from 'react';
import { Button, Modal } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export function ModalResponseAlert({
  openSendFinish = false,
  messageTitleAlert = '',
  subtitle = '',
  handleCloseSendFinish = () => {},
  error,
}) {
  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      open={openSendFinish}
      onClose={handleCloseSendFinish}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        data-cy="modal_success_send_alert"
        style={{
          width: '360px',
          height: '296px',
          padding: '2rem',
          background: '#FFFFFF',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {error ? (
          <HighlightOffIcon
            alt="alert completed"
            style={{
              width: '118px',
              height: '118px',
              marginBottom: '19px',
              color: 'red',
            }}
          />
        ) : (
          <CheckCircleOutlineIcon
            alt="alert completed"
            style={{
              width: '118px',
              height: '118px',
              marginBottom: '19px',
              color: 'green',
            }}
          />
        )}
        <p style={{ fontSize: '18px' }}>{messageTitleAlert}</p>
        <p
          style={{
            fontSize: 12,
            weight: 400,
            width: 280,
            height: 31,
            justifyContent: 'center',
            textAlign: 'center',
            color: '#505255',
            fontFamily: 'Poppins',
          }}
        >
          {subtitle}
        </p>
        <Button
          data-cy="btn_fechar_modal"
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
          onClick={handleCloseSendFinish}
        >
          Fechar janela
        </Button>
      </div>
    </Modal>
  );
}
