import React, { useContext } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { useStyles } from './styles';

import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';

function ModalButtons({ loading, selectedDays }) {
  const classes = useStyles();

  const { handleCloseModalScheduleCall = () => {} } = useContext(
    ProfessionalSchedulePageContext
  );

  return (
    <div className={classes.container_buttons}>
      <Button
        className={classes.button_cancel}
        onClick={handleCloseModalScheduleCall}
      >
        Cancelar
      </Button>
      <Button
        disabled={selectedDays.length > 44}
        type="submit"
        className={classes.button_agendar}
      >
        {loading ? <CircularProgress color="primary" size={20} /> : 'Agendar'}
      </Button>
    </div>
  );
}

export default ModalButtons;
