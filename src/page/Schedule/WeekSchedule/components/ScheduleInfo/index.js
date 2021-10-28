import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { eachDayOfInterval } from 'date-fns';
import HeaderDays from '../HeaderDays';
import { useStyles } from './styles';
import moment from 'moment';

const ScheduleInfo = ({ schedule }) => {
  const classes = useStyles();

  const result = eachDayOfInterval({
    start: moment(schedule?.date_start).toDate(),
    end: moment(schedule?.date_end).toDate(),
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={2} xl={1}>
          <h3 className={classes.scale_name}>{schedule?.name}</h3>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={10} xl={11}>
          <HeaderDays result={result} />
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(ScheduleInfo);
