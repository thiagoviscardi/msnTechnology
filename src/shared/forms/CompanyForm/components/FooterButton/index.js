import React from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { useStyles, FormContainer } from './styles';
import { useHistory } from 'react-router-dom';

const FooterButton = ({ type, id, loading }) => {
  const history = useHistory();
  const classes = useStyles();

  const goBack = () => history.goBack();
  return (
    <FormContainer style={{ justifyContent: 'flex-end', marginTop: 48 }}>
      <Button onClick={goBack} className={classes.cancelButton}>
        <Typography className={classes.cancelText}>Cancelar</Typography>
      </Button>
      {id ? (
        <Button
          disabled={loading}
          type={type}
          className={classes.registerButton}
        >
          {loading ? (
            <CircularProgress size={12} style={{ marginRight: 3 }} />
          ) : (
            <Typography className={classes.registerText}>Salvar</Typography>
          )}
        </Button>
      ) : (
        <Button
          disabled={loading}
          type={type}
          className={classes.registerButton}
        >
          {loading ? (
            <CircularProgress size={12} style={{ marginRight: 3 }} />
          ) : (
            <Typography className={classes.registerText}>Cadastrar</Typography>
          )}
        </Button>
      )}
    </FormContainer>
  );
};

export default FooterButton;
