import React from 'react';
import { useStyles, ModalSuccessScale } from './styles';
import { Modal, Typography, Button, Icon } from '@material-ui/core';

export default function ModalSuccess({
  open,
  handleSuccessScale = () => {},
  msg,
}) {
  const classes = useStyles();

  return (
    <div>
      {open && (
        <Modal
          className={classes.modal}
          open={true}
          disableAutoFocus
          disableEnforceFocus
          onClose={handleSuccessScale}
        >
          <ModalSuccessScale>
            <div className={classes.divPrincipal}>
              <div className={classes.divIcon}>
                <Icon className={classes.cancelIcon}>cancel</Icon>
              </div>
              <div data-cy="div_texto_modal">
                <Typography className={classes.textModal}>{msg}</Typography>
              </div>

              <div className={classes.buttonRoot}>
                <Button
                  data-cy="btn_fechar_janela"
                  onClick={handleSuccessScale}
                  className={classes.buttonSave}
                >
                  <Typography>Fechar janela</Typography>
                </Button>
              </div>
            </div>
          </ModalSuccessScale>
        </Modal>
      )}
    </div>
  );
}
