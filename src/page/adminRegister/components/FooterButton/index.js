import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { useStyles, FormContainer } from './styles';
import { useHistory } from 'react-router-dom';

const FooterButton = ({ type }) => {
  const history = useHistory();
  const classes = useStyles();

  const goBack = () => history.goBack();
  return (
    <FormContainer style={{ justifyContent: 'flex-end', marginTop: 48 }}>
      <Button onClick={goBack} className={classes.cancelButton}>
        <Typography className={classes.cancelText}>Cancelar</Typography>
      </Button>
      <Button type={type} className={classes.registerButton}>
        <Typography className={classes.registerText}>Salvar</Typography>
      </Button>
    </FormContainer>
  );
};

export default FooterButton;
