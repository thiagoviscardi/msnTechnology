import React, { useContext, useState, useEffect, memo } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useStyles } from './styles';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';
import { eachDayOfInterval } from 'date-fns';
import { Button } from '@material-ui/core';

const CardAddButton = ({
  scaleData,
  schedule,
  agenda,
  index,
  completedDaysCalendar,
}) => {
  const classes = useStyles();

  const { handleOpenModalScheduleCall = () => {} } = useContext(
    ProfessionalSchedulePageContext
  );

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
    <div className={classes.container}>
      <Button
        onClick={() =>
          handleOpenModalScheduleCall({
            scaleData,
            schedule,
            selected_schedule: schedule[index],
            agenda,
            daySelected: result[index],
          })
        }
        className={classes.button_add_cell}
      >
        <div className={classes.button}>
          <AddCircleOutlineIcon />
          <div>Agendar plantão</div>
        </div>
      </Button>
    </div>
  );
};

export default memo(CardAddButton);
