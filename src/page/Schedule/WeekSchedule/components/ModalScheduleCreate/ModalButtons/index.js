import React, { useContext } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';

import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';

function ModalButtons({ loading }) {
  const classes = useStyles();

  const { handleCloseModalScheduleCall = () => {} } = useContext(
    ScheduleWeekPageContext
  );

  return (
    <div className={classes.container_buttons}>
      <Button
        className={classes.button_cancel}
        onClick={handleCloseModalScheduleCall}
      >
        Cancelar
      </Button>
      <Button type="submit" className={classes.button_agendar}>
        {loading ? <CircularProgress color="primary" size={20} /> : 'Agendar'}
      </Button>
    </div>
  );
}

export default ModalButtons;
