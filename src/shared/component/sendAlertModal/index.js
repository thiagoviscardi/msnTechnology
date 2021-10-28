import React from 'react';
import { useStyles, ModalContainerAlert } from './styles';
import { Modal, Typography, Button, Icon } from '@material-ui/core';

export default function SendAlertModal({
  title,
  subtitle,
  openAlert,
  goback,
  error = false,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {openAlert && (
        <Modal
          className={classes.ModalAlert}
          open={openAlert}
          onClose={goback}
          disableAutoFocus
          disableEnforceFocus
        >
          <ModalContainerAlert>
            <div
              data-cy="modal_success_send_alert"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              {error ? (
                <Icon
                  style={{
                    alignSelf: 'center',
                    fontSize: '107px',
                    color: 'red',
                    marginTop: 43,
                    marginBottom: 10,
                  }}
                >
                  highlight_off
                </Icon>
              ) : (
                <Icon
                  style={{
                    fontSize: '107px',
                    color: '#5AC17F',
                    marginLeft: 126,
                    marginTop: 43,
                    marginBottom: 10,
                  }}
                >
                  check_circle_outline
                </Icon>
              )}
              <div>
                <Typography className={classes.textAlert}>{title}</Typography>
              </div>
              <div style={{ padding: '0px 10px 0px 10px' }}>
                <Typography className={classes.subtitleAlert}>
                  {subtitle}
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  onClick={goback}
                  style={{
                    background: '#0F83AD',
                    marginTop: 38,
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '12px',
                      color: 'white',
                      textTransform: 'none',
                    }}
                  >
                    Fechar janela
                  </Typography>
                </Button>
              </div>
            </div>
          </ModalContainerAlert>
        </Modal>
      )}
    </div>
  );
}
