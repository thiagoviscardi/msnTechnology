import React from 'react';
import { useStyles } from './styles';
import { Modal, Button } from '@material-ui/core';

export default function ConfirmUpdateStatusModal({
  open,
  handleClose,
  onConfirm,
  message,
  onCancel,
}) {
  const classes = useStyles();

  return (
    <Modal className={classes.root} onClose={handleClose} open={open}>
      <div className={classes.container}>
        <p className={classes.message}>{message}</p>
        <div className={classes.buttonContainer}>
          <Button className={classes.cancelButton} onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            data-cy="btn_modal_aceitar_moderacao"
            className={classes.confirmButton}
            onClick={onConfirm}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
