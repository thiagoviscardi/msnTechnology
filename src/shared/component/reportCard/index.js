import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles, ContainerCard } from './styles';

const ReportCard = ({ title, quantity }) => {
  const classes = useStyles();

  return (
    <ContainerCard elevation={0}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.qtdText}>{quantity}</Typography>
    </ContainerCard>
  );
};

export default ReportCard;
