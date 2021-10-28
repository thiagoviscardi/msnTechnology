import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles, StyledReportCard } from './styles';

const ReportNumberCard = ({ title, quantity }) => {
  const classes = useStyles();

  return (
    <StyledReportCard elevation={0}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.qtdText}>{quantity}</Typography>
    </StyledReportCard>
  );
};

export default ReportNumberCard;
