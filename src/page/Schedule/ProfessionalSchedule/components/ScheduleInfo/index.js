import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { eachDayOfInterval } from 'date-fns';
import HeaderDays from '../HeaderDays';
import { useStyles } from './styles';

const ScheduleInfo = ({ completedDaysCalendar }) => {
  const classes = useStyles();

  const [result, setResult] = useState([]);

  useEffect(() => {
    try {
      const period = eachDayOfInterval({
        start: completedDaysCalendar && completedDaysCalendar[0],
        end:
          completedDaysCalendar &&
          completedDaysCalendar[completedDaysCalendar.length - 1],
      });

      const differenceDaysWeek = 7 - period.length;

      const completedDaysWeek = Array(differenceDaysWeek)
        .fill()
        .map(() => false);

      setResult([...period, ...completedDaysWeek]);
    } catch (e) {
      setResult([]);
    }
  }, [completedDaysCalendar]);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <HeaderDays result={result} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ScheduleInfo;
