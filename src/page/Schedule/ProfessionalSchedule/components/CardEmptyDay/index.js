import React from 'react';
import { useStyles } from './styles';

const CardEmptyDay = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.day_cell_empty}></div>
    </div>
  );
};

export default CardEmptyDay;
