import React, { memo, useCallback } from 'react';
import TableCards from '../TableCards';
import { useStyles, TableContent } from './styles';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import ScheduleInfo from '../ScheduleInfo';

const ScheduleTable = ({ schedule, permissions }) => {
  const classes = useStyles();

  const formatHour = (hour) => moment(hour, 'HHmmss').format('HH:mm');

  const mountShedulesPeriod = useCallback(
    (item) => {
      return `${formatHour(item?.hour_start)} - ${formatHour(item?.hour_end)}`;
    },
    [schedule]
  );

  const countTotal = (total, num) => {
    return total + num;
  };

  const countRemainingVacancies = useCallback(
    (sched) => {
      let ocupped = sched.map((item) => item.agenda.length);

      ocupped = ocupped.length > 0 ? ocupped.reduce(countTotal) : 0;

      let vacancies = sched
        .filter((item) => item?.status === 1)
        .map((item) => item?.quantity_professional);

      vacancies = vacancies.length > 0 ? vacancies.reduce(countTotal) : 0;

      const diference = vacancies - ocupped;
      return diference > 0 ? diference : 0;
    },
    [schedule]
  );

  return (
    <div className={classes.root}>
      {schedule &&
        schedule?.schedules.length > 0 &&
        schedule?.schedules.map((sched, index) => (
          <div key={index} style={{ padding: 0, margin: 0 }}>
            <ScheduleInfo schedule={schedule} />
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={2} xl={1}>
                <div>
                  <p className={classes.subtitle}>Horário</p>
                  <span className={classes.schedule}>
                    {mountShedulesPeriod(sched[0])}
                  </span>
                  <p className={classes.remaining_vacancies}>
                    {countRemainingVacancies(sched)} vagas restantes
                  </p>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={10} xl={11}>
                <TableContent>
                  <TableCards
                    permissions={permissions}
                    scaleData={schedule}
                    schedule={sched}
                  />
                </TableContent>
              </Grid>
            </Grid>
          </div>
        ))}
    </div>
  );
};

export default memo(ScheduleTable);
