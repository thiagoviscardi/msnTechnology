import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles, TableLegendItem, ErrorMessage } from './styles';
import ScheduleForm from './ScheduleFormCreate';
import CalendarFormCreate from './CalendarFormCreate';

function GridModalCalendarCombo() {
  const classes = useStyles();

  const [selectedDays, setSelectedDays] = useState([]);
  const [repeatType, setRepeatType] = useState(null);
  const [errorDate, setErrorDate] = useState(false);

  const onSubmit = () => {
    setErrorDate(!selectedDays.length > 0);
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="flex-start" spacing={0}>
        <Grid item xs>
          <CalendarFormCreate
            repeatType={repeatType}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
          {!errorDate || selectedDays.length > 0 ? (
            <>
              <TableLegendItem color="#1F437F">
                <div />
                Dias em que o profissional já está escalado
              </TableLegendItem>
              <TableLegendItem color="#646464">
                <div />
                Não há um horário para este dia
              </TableLegendItem>
            </>
          ) : (
            <ErrorMessage>
              <div />
              Selecione pelo menos um dia!
            </ErrorMessage>
          )}
        </Grid>
        <Grid item xs>
          <ScheduleForm onSubmit={onSubmit} setRepeatType={setRepeatType} />
        </Grid>
      </Grid>
    </div>
  );
}

export default GridModalCalendarCombo;
