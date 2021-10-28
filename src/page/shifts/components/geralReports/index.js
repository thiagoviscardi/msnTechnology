import React from 'react';
import ReportNumberCard from '../reportNumberCard';
import { useStyles } from './styles';

const GeralReports = ({
  quantityShifts,
  quantityFinished,
  quantityNotStarted,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.rowContainer}>
      <ReportNumberCard title="Trocas no mês" quantity={quantityShifts} />
      <ReportNumberCard title="Realizadas no mês" quantity={quantityFinished} />
      <ReportNumberCard
        title="Não iniciados no mês"
        quantity={quantityNotStarted}
      />
    </div>
  );
};

export default GeralReports;
