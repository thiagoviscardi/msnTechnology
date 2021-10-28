import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { useStyles, FormContainer } from './styles';
import { useHistory } from 'react-router-dom';

const FooterButton = ({ type, id, onSubmit }) => {
  const history = useHistory();
  const classes = useStyles();
  const handleClose = () => {
    // history.push('/cadastros/empresas');
  };
  const goBack = () => history.goBack();
  return (
    <FormContainer style={{ justifyContent: 'flex-end', marginTop: 48 }}>
      <Button onClick={goBack} className={classes.cancelButton}>
        <Typography className={classes.cancelText}>Cancelar</Typography>
      </Button>
      {id === ':id' ? (
        <Button
          type={type}
          onClick={handleClose}
          className={classes.registerButton}
        >
          <Typography className={classes.registerText}>Cadastrar</Typography>
        </Button>
      ) : (
        <Button
          type={type}
          onSubmit={onSubmit}
          onClick={handleClose}
          className={classes.saveButton}
        >
          <Typography className={classes.saveText}>Salvar</Typography>
        </Button>
      )}
    </FormContainer>
  );
};

export default FooterButton;
