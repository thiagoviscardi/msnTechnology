import React, { useState } from 'react';
import { useStyles, ModalContainer, ModalContainerMensager } from './styles';
import {
  Modal,
  Icon,
  Typography,
  IconButton,
  Button,
  Avatar,
} from '@material-ui/core';
import SelectComponent from 'shared/component/selectComponent';
import SendAlertModal from 'shared/component/sendAlertModal';

export default function ProfessionalModal({
  openDetails,
  handleCloseDetails,
  user,
}) {
  const [state, setState] = useState({
    open: false,
    openAlert: false,
    value: 0,
    valueSelect: '',
  });
  const { open, openAlert, valueSelect } = state;

  const handleCloseMensager = () => {
    setState({ ...state, open: false });
  };
  const handleOpenAlert = () => {
    setState({
      ...state,
      openAlert: true,
    });
  };
  const handleCloseAlert = () => {
    setState({ ...state, openAlert: false, open: false });
  };

  const options = [
    { value: 0, label: 'Seu Plantão começa em breve.' },
    { value: 1, label: 'Começou! Faça o checkin do Plantão.' },
    { value: 2, label: 'Ops. Você equeceu o checkout.' },
    { value: 3, label: 'Ops. Você equeceu o checkout.' },
  ];
  const label = options.map((item) => item.name);

  {
    options.map((option, i) => <div key={i} label={option.name} />);
  }
  const handleChange = (value) => {
    setState({ ...state, valueSelect: value, value: value.value });
  };

  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.modal}
        open={openDetails}
        onClose={handleCloseDetails}
        disableAutoFocus
        disableEnforceFocus
      >
        <ModalContainer>
          <div className={classes.columnModal}>
            <Avatar className={classes.userImage} src={user?.image} />
          </div>
          <div style={{ minWidth: '70%', paddingLeft: 24 }}>
            <div className={classes.closeButton}>
              <IconButton onClick={handleCloseDetails}>
                <Icon>close</Icon>
              </IconButton>
            </div>

            <div>
              <Typography className={classes.textTitle}>
                Profissional
              </Typography>
              <div className={classes.detailsText}>{user?.name}</div>
              <Typography className={classes.textTitle}>
                Área de atuação
              </Typography>
              {user?.specialties && user?.specialties.length > 0 ? (
                user?.specialties?.map((specialty) => (
                  <div key={specialty.id} className={classes.detailsText}>
                    {specialty.name}
                  </div>
                ))
              ) : (
                <div className={classes.detailsText}>{user?.group?.name}</div>
              )}
              <Typography className={classes.textTitle}>CRM</Typography>
              <div className={classes.detailsText}>
                {user?.regulation_agency?.number} -
                {user?.regulation_agency?.state}
              </div>
              <Typography className={classes.textTitle}>Contato</Typography>
              <div className={classes.marginContainer}>
                <Icon className={classes.emailIcon}>email_Outlined</Icon>
                <div className={classes.detailsText}>{user?.email}</div>
              </div>
              {/* <div className={classes.buttonModal}>
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  style={{
                    borderColor: '#24B8EC',
                  }}
                >
                  <Icon className={classes.sendIcon}>send</Icon>
                  <Typography className={classes.sendText}>
                    Enviar alerta
                  </Typography>
                </Button>
              </div> */}
            </div>
          </div>
        </ModalContainer>
      </Modal>
      {open && (
        <Modal
          className={classes.modalMensager}
          open={open}
          disableAutoFocus
          disableEnforceFocus
        >
          <ModalContainerMensager>
            <div>
              <div className={classes.iconButton}>
                <IconButton onClick={handleCloseMensager}>
                  <Icon fontSize="small">close</Icon>
                </IconButton>
              </div>
              <div className={classes.bottomContainer}>
                <Typography className={classes.titleModal}>
                  Selecionar mensagem pré-definida
                </Typography>
              </div>

              <div>
                <div className={classes.columnContainer}>
                  <SelectComponent
                    className={classes.selectStyle}
                    placeholder="Selecione a mensagem desejada..."
                    label={label}
                    options={options}
                    onChange={handleChange}
                    value={valueSelect}
                  />
                </div>
                <div className={classes.buttonModalAlert}>
                  <Button
                    data-cy="btn_modal_send_alert"
                    onClick={handleOpenAlert}
                    variant="outlined"
                    style={{
                      borderColor: '#24B8EC',
                    }}
                  >
                    <Icon className={classes.sendIcon}>send</Icon>
                    <Typography className={classes.sendText}>
                      Enviar alerta
                    </Typography>
                  </Button>
                </div>
              </div>
            </div>
          </ModalContainerMensager>
        </Modal>
      )}
      {openAlert && (
        <SendAlertModal
          openAlert={openAlert}
          goback={handleCloseAlert}
          title="Alerta enviado com sucesso!"
        />
      )}
    </div>
  );
}
