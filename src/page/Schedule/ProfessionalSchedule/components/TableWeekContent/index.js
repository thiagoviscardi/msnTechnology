import React from 'react';
import { useStyles } from './styles';
import ScheduleTable from '../ScheduleTable';
import { Divider } from '@material-ui/core';

function TableWeekContent({ data, selectedSchedule, permissions = null }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {data &&
        selectedSchedule &&
        data.length > 0 &&
        data.map((schedule, index) => (
          <div key={index}>
            <ScheduleTable schedule={schedule} permissions={permissions} />
            <Divider style={{ margin: '20px 0' }} />
          </div>
        ))}
    </div>
  );
}

export default TableWeekContent;
