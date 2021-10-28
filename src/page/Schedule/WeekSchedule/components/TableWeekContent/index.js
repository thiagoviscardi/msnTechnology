import React, { memo } from 'react';
import { useStyles } from './styles';
import ScheduleTable from '../ScheduleTable';
import { Divider } from '@material-ui/core';

function TableWeekContent({ data, permissions = null }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {data &&
        data.length > 0 &&
        data.map((schedule, index) => (
          <div id="div_container_agenda" key={index}>
            <ScheduleTable permissions={permissions} schedule={schedule} />
            <Divider style={{ margin: '20px 0' }} />
          </div>
        ))}
    </div>
  );
}

export default memo(TableWeekContent);
