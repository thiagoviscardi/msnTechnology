import React, { useContext } from 'react';
import { useStyles } from './style';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { ExchangesPageContext } from 'page/exchangeReport/index';

export const ContainerScheduleDetails = () => {
  const classes = useStyles();
  const { details } = useContext(ExchangesPageContext);

  const formatedPrevistHour = ({ date_start, date_end }) => {
    const splitedStart = date_start.split(' ');
    const splitedEnd = date_end.split(' ');
    return (
      <>
        <span>{`${splitedStart[1]} - ${splitedEnd[1]}`}</span>
        <br />
        <span>{splitedStart[0]}</span>
      </>
    );
  };

  return (
    <>
      <div>
        <Typography
          className={classes.textTitle}
          style={{
            display: 'flex',
            alignSelf: 'center',
          }}
        >
          Horário previsto
        </Typography>
        <div
          className={classes.primary_text}
          style={{
            fontSize: '11px',
          }}
        >
          {formatedPrevistHour(details?.scale)}
        </div>
      </div>
      <div className={classes.primary_text}>
        <Typography className={classes.textTitle}>
          Entrada registrada
        </Typography>
        {details?.user_date_start && <span>{details?.user_date_start}</span>}
      </div>
      <div className={classes.primary_text}>
        <Typography className={classes.textTitle}>Saída registrada</Typography>
        {details?.user_date_end && <span>{details?.user_date_end}</span>}
      </div>
      <Link
        to={`/agenda/profissional/${details?.user.id}`}
        style={{ textDecoration: 'none' }}
      >
        <Typography
          style={{
            fontSize: '12px',
            color: '#24B8EC',
            fontFamily: 'Poppins',
          }}
        >
          Ver agenda do profissional
        </Typography>
      </Link>
    </>
  );
};
