import React from 'react';
import { Button, Modal } from '@material-ui/core';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';

export function ModalConfirmSchedule({
  openSendFinish = false,
  messageTitleAlert = '',
  onSubmit = () => {},
  handleCloseSendFinish = () => {},
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
        <WarningOutlinedIcon
          alt="alert warning"
          style={{
            width: '118px',
            height: '118px',
            marginBottom: '19px',
            color: 'orange',
          }}
        />
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
          {messageTitleAlert}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Button
            data-cy="btn_cancel_modal"
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
            Cancelar
          </Button>
          <Button
            data-cy="btn_confirm_modal"
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
            onClick={onSubmit}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
