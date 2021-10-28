import React from 'react';
import { format } from 'date-fns';
import ptBRLocale from 'date-fns/locale/pt-BR';

import { useStyles } from './styles';

const HeaderDays = ({ result }) => {
  const classes = useStyles();

  return (
    <div className={classes.header_days}>
      {result.map((date, index) => (
        <div key={index} className={classes.header_day_cell}>
          <span className={classes.header_day_title}>
            {format(date, 'dd', { locale: ptBRLocale })}
          </span>
          <span className={classes.header_day_title}>
            {format(date, 'EEEE', { locale: ptBRLocale })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HeaderDays;
