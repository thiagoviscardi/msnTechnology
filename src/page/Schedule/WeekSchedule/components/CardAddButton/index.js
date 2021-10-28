import React, { useContext, memo } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useStyles } from './styles';
import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import { eachDayOfInterval } from 'date-fns';
import { Button, Tooltip } from '@material-ui/core';
import moment from 'moment';
import HasPermission from 'utils/checkPermission';

const CardAddButton = ({ scaleData, schedule, agenda, index, permissions }) => {
  const classes = useStyles();

  const { handleOpenModalScheduleCall = () => {} } = useContext(
    ScheduleWeekPageContext
  );

  const resultDaysWeek = eachDayOfInterval({
    start: moment(scaleData?.date_start).toDate(),
    end: moment(scaleData?.date_end).toDate(),
  });
  return (
    <div className={classes.container}>
      <Tooltip
        title={
          HasPermission(permissions.create) ? '' : 'Você não tem permissão'
        }
        placement="bottom"
        arrow
      >
        <Button
          id="AdicionarPlantao"
          onClick={
            HasPermission(permissions.create)
              ? () =>
                  handleOpenModalScheduleCall({
                    scaleData,
                    schedule,
                    selected_schedule: schedule[index],
                    agenda,
                    daySelected: resultDaysWeek[index],
                  })
              : null
          }
          className={classes.button_add_cell}
        >
          <div className={classes.button}>
            <AddCircleOutlineIcon
              style={{
                width: 27,
                height: 27,
              }}
            />
            <div>Adicionar plantão</div>
          </div>
        </Button>
      </Tooltip>
    </div>
  );
};

export default memo(CardAddButton);
