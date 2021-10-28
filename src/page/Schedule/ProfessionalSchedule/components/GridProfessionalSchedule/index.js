import React, { useContext } from 'react';
import TableWeekContent from '../TableWeekContent';
import { Grid, Paper, Typography } from '@material-ui/core';
import { styles } from './styles';
import ProfessionalDetails from '../ProfessionalDetails';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';

function GridProfessionalSchedule() {
  const classes = styles();

  const { dataUnitAgenda, loadingAgenda, selectedSchedule } = useContext(
    ProfessionalSchedulePageContext
  );
  const permissions = {
    value: 'scheduleValue/r',
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
          <ProfessionalDetails />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={9}>
          <Paper elevation={0} className={classes.paper}>
            {dataUnitAgenda &&
              dataUnitAgenda.length > 0 &&
              dataUnitAgenda.map((data, index) => (
                <TableWeekContent
                  permissions={permissions}
                  key={index}
                  data={data}
                  selectedSchedule={selectedSchedule}
                />
              ))}
            {!loadingAgenda &&
              (dataUnitAgenda.length === 0 || !selectedSchedule) && (
                <div className={classes.container_no_results}>
                  <Typography className={classes.no_results}>
                    Sem resultados para essa Escala ou data!
                  </Typography>
                </div>
              )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default GridProfessionalSchedule;
