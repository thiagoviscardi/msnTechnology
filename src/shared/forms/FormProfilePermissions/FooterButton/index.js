import React from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { useStyles, FormContainer } from './styles';

const FooterButton = ({ handleCloseModal, loading = false }) => {
  const classes = useStyles();

  return (
    <FormContainer
      data-cy="container_buttons"
      style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 48 }}
    >
      <Button onClick={handleCloseModal} className={classes.cancelButton}>
        <Typography className={classes.cancelText}>Cancelar</Typography>
      </Button>
      <Button type="submit" className={classes.registerButton}>
        {loading ? (
          <CircularProgress color="primary" size={25} />
        ) : (
          <Typography className={classes.registerText}>Salvar</Typography>
        )}
      </Button>
    </FormContainer>
  );
};

export default FooterButton;
