import React from 'react';
import { Button, Modal } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';

export function ModalResponseAlert({
  openSendFinish = false,
  messageTitleAlert = '',
  subtitle = '',
  handleCloseSendFinish = () => {},
  error,
  alert,
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
          minHeight: '296px',
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
        {!alert && error && (
          <HighlightOffIcon
            alt="alert completed"
            style={{
              width: '118px',
              height: '118px',
              marginBottom: '19px',
              color: 'red',
            }}
          />
        )}

        {!error && alert && (
          <WarningOutlinedIcon
            alt="alert warning"
            style={{
              width: '118px',
              height: '118px',
              marginBottom: '19px',
              color: 'orange',
            }}
          />
        )}

        {!error && !alert && (
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
            fontFamily: 'Open Sans',
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
