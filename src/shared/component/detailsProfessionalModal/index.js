import React, { useState, useContext, useEffect } from 'react';
import { useStyles, ModalContainer } from './style';
import { Modal, Icon, IconButton } from '@material-ui/core';
import SendAlertModal from 'shared/component/sendAlertModal';
import { ContainerUserStatus } from './components/containerUserStatus';
import { ContainerScheduleDetails } from './components/containerScheduleDetails';
import { ContainerProfessionalDetails } from './components/containerProfessionalDetails';
import { ModalSendMessage } from './components/modalSendMessage';
import { ExchangesPageContext } from 'page/exchangeReport/index';
import { useSendMessage } from 'hook/sendMessage';
import { useTemplateNotifications } from 'hook/templateNotifications';

export default function DetailsProfessionalModal() {
  const classes = useStyles();
  const { details } = useContext(ExchangesPageContext);
  const { loading: loadingMessage } = useSendMessage();
  const {
    sendNotification,
    status,
    setStatus,
    message: messageReturn,
  } = useTemplateNotifications();
  const { openDetails = () => {}, handleCloseDetails = () => {} } =
    useContext(ExchangesPageContext);
  const [badRequestStatus, setBadRequestStatus] = useState(false);

  const [state, setState] = useState({
    value: 0,
    openModalSend: false,
    openAlert: false,
    valueSelect: '',
  });
  const { openModalSend, openAlert } = state;
  const handleOpen = () => {
    setState({ ...state, openModalSend: true });
  };
  const handleCloseMensager = () => {
    setState({ ...state, openModalSend: false });
  };
  const handleOpenAlert = (message) => {
    sendNotification({
      notificationId: message,
      userId: details?.user.id,
    });
  };

  useEffect(() => {
    if (!loadingMessage && status === 200) {
      setState({
        ...state,
        openAlert: true,
      });
    }
    if (status && status !== 200) {
      setState({ ...state, openModalSend: false });
      setBadRequestStatus(true);
    }
  }, [status]);

  const handleCloseAlert = () => {
    setStatus('');
    setState({ ...state, openAlert: false, openModalSend: false });
  };

  const handleCloseBadAlert = () => {
    setStatus('');
    setBadRequestStatus(false);
  };

  const getMessage = (message) => {
    if (
      message ===
      'The user does not have a device connected, ask the user to log in to the app'
    ) {
      return 'Para o usuário receber as notificações, é necessário que tenha efetuado o login no aplicativo ao menos uma vez';
    }
    if (message === 'Failed to send notification') {
      return 'Verifique sua conexão com a internet';
    }
  };
  return (
    <div>
      <Modal
        className={classes.modal}
        open={openDetails}
        disableAutoFocus
        disableEnforceFocus
        onClose={handleCloseDetails}
      >
        <ModalContainer>
          <div className={classes.left_column_modal}>
            <ContainerUserStatus />
            <ContainerScheduleDetails />
          </div>

          <div className={classes.right_column_modal}>
            <div className={classes.closeButton}>
              <IconButton onClick={handleCloseDetails}>
                <Icon data-cy="icon_close">close</Icon>
              </IconButton>
            </div>

            <ContainerProfessionalDetails handleOpen={handleOpen} />
          </div>
        </ModalContainer>
      </Modal>
      <ModalSendMessage
        open={openModalSend}
        handleCloseMensager={handleCloseMensager}
        handleOpenAlert={handleOpenAlert}
      />
      <SendAlertModal
        openAlert={openAlert}
        goback={handleCloseAlert}
        title="Alerta enviado com sucesso!"
        subtitle="A notificação foi enviada para o celular do profissional"
      />
      <SendAlertModal
        error
        openAlert={badRequestStatus}
        goback={handleCloseBadAlert}
        title="Falha ao enviar."
        subtitle={getMessage(messageReturn)}
      />
    </div>
  );
}
