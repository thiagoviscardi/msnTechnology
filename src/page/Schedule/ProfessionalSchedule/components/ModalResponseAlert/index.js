import React from 'react';
import { Button, Modal } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export function ModalResponseAlert({
  error = false,
  openSendFinish = false,
  messageTitleAlert = '',
  handleCloseSendFinish = () => {},
}) {
  return (
    <Modal
      open={openSendFinish}
      onClose={handleCloseSendFinish}
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
        <p style={{ fontSize: '18px', textAlign: 'center' }}>
          {messageTitleAlert}
        </p>
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
          onClick={handleCloseSendFinish}
        >
          Fechar janela
        </Button>
      </div>
    </Modal>
  );
}
