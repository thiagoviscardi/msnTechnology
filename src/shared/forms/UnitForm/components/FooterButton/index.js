import React from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { useStyles, FormContainer } from './styles';
import { useHistory } from 'react-router-dom';
import { ModalResponseAlert } from 'page/Schedule/WeekSchedule/components/ModalResponseAlert';

const FooterButton = ({ type, id, loading, status, validate }) => {
  const history = useHistory();
  const classes = useStyles();
  const [openModalSendNotification, setOpenModalSendNotification] =
    React.useState(false);

  React.useEffect(() => {
    if (status === 200 || status === 201) setOpenModalSendNotification(true);
  }, [status]);
  const handleOpenModalEdit = () => {
    if (Object.keys(validate).length === 0) {
      setOpenModalSendNotification(true);
    }
  };
  const handleCloseModal = () => {
    history.push(`/cadastros/hospitais`);
  };
  const goBack = () => history.goBack();
  return (
    <FormContainer style={{ justifyContent: 'flex-end', marginTop: 48 }}>
      <Button onClick={goBack} className={classes.cancelButton}>
        <Typography className={classes.cancelText}>Cancelar</Typography>
      </Button>
      {id ? (
        <>
          <Button
            disabled={loading}
            type={type}
            className={classes.registerButton}
            onClick={handleOpenModalEdit}
          >
            {loading ? (
              <CircularProgress size={12} style={{ marginRight: 3 }} />
            ) : (
              <Typography className={classes.registerText}>Salvar</Typography>
            )}
          </Button>
          {openModalSendNotification && (
            <ModalResponseAlert
              messageTitleAlert="Hospital editado com sucesso!"
              openSendFinish={openModalSendNotification}
              handleCloseSendFinish={handleCloseModal}
            />
          )}
        </>
      ) : (
        <>
          <Button
            disabled={loading}
            type={type}
            className={classes.registerButton}
          >
            {loading ? (
              <CircularProgress size={12} style={{ marginRight: 3 }} />
            ) : (
              <Typography className={classes.registerText}>
                Cadastrar
              </Typography>
            )}
          </Button>
          {openModalSendNotification && (
            <ModalResponseAlert
              messageTitleAlert="Hospital cadastrado com sucesso!"
              openSendFinish={openModalSendNotification}
              handleCloseSendFinish={handleCloseModal}
            />
          )}
        </>
      )}
    </FormContainer>
  );
};

export default FooterButton;
