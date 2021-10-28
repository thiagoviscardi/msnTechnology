import React, { useContext } from 'react';
import TableCards from '../TableCards';
import { useStyles, TableContent } from './styles';
import { Grid } from '@material-ui/core';
import ScheduleInfo from '../ScheduleInfo';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';

const ScheduleTable = ({ schedule, permissions }) => {
  const classes = useStyles();

  const {
    selectedSchedule = null,
    weeksInMonth = 0,
    completedDaysCalendar = [],
  } = useContext(ProfessionalSchedulePageContext);

  const filterBySelectedSchedule = (item) =>
    `${item[0].hour_start} - ${item[0].hour_end}` === selectedSchedule?.label;

  return (
    <div className={classes.root}>
      <TableContent>
        {schedule &&
          schedule?.schedules.length > 0 &&
          schedule?.schedules
            .filter(filterBySelectedSchedule)
            .map((sched, index) => (
              <div key={index} style={{ margin: 0, padding: 0 }}>
                {Array(weeksInMonth)
                  .fill()
                  .map((_, i) => (
                    <Grid key={index + i} container spacing={0}>
                      <div style={{ width: '100%' }}>
                        {completedDaysCalendar &&
                          completedDaysCalendar.length > 0 && (
                            <>
                              <ScheduleInfo
                                index={i}
                                completedDaysCalendar={completedDaysCalendar[i]}
                              />
                              <TableCards
                                permissions={permissions}
                                scaleData={schedule}
                                schedule={sched}
                                completedDaysCalendar={completedDaysCalendar[i]}
                              />
                            </>
                          )}
                      </div>
                    </Grid>
                  ))}
              </div>
            ))}
      </TableContent>
    </div>
  );
};

export default ScheduleTable;
