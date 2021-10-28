import React from 'react';
import { Button, Modal } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useStyles } from './styles';

const ModalResponseSuccess = ({
  openModalSuccess = false,
  handleCloseModalSuccess = () => {},
}) => {
  const classes = useStyles();

  return (
    <Modal
      open={openModalSuccess}
      onClose={handleCloseModalSuccess}
      className={classes.container}
    >
      <div data-cy="modalDownload" className={classes.sub_container}>
        <CheckCircleOutlineIcon
          alt="alert completed"
          className={classes.icon}
        />
        <h3 className={classes.title}>Arquivo gerado com sucesso!</h3>
        <p className={classes.sub_title}>
          Verifique o documento salvo em sua pasta de download.
        </p>
        <Button className={classes.button} onClick={handleCloseModalSuccess}>
          Fechar janela
        </Button>
      </div>
    </Modal>
  );
};

export default ModalResponseSuccess;
