import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';

const ContainerStatusExchange = ({ situationStatus, statusType }) => {
  const classes = useStyles();

  return (
    <div className={classes.status}>
      {situationStatus === statusType.RECUSADO && (
        <div className={classes.statusCancel}>
          <Typography className={classes.titleType}>Cancelada</Typography>
        </div>
      )}
      {(situationStatus === statusType.CONFIRMADO ||
        situationStatus === statusType.OCORRENDO ||
        situationStatus === statusType.REALIZADO) && (
        <div className={classes.statusConfirm}>
          <Typography className={classes.titleType}>Trocou com</Typography>
        </div>
      )}
      {situationStatus === statusType.SOLICITADO && (
        <div className={classes.statusWaiting}>
          <Typography className={classes.titleType}>Não confirmada</Typography>
        </div>
      )}
    </div>
  );
};

export default ContainerStatusExchange;
