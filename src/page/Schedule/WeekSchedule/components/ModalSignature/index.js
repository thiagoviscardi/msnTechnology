import React from 'react';
import { Button, Modal } from '@material-ui/core';

export function ModalSignature({ open, close, title, image }) {
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
          padding: '1rem',
          background: '#FFFFFF',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p>{title}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <img
            src={image}
            style={{
              width: 240,
              height: 190,
            }}
          />
        </div>
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
              marginTop: '3px',
            }}
            onClick={close}
          >
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
