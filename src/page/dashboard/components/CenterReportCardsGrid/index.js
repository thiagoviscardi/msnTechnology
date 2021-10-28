import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReportCard from 'shared/component/reportCard';
import { DashboardPageContext } from 'page/dashboard/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 25,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenterReportCardsGrid() {
  const classes = useStyles();
  const { dashboardData } = useContext(DashboardPageContext);

  return (
    <div className={classes.root}>
      <Grid justify="flex-start" container spacing={3}>
        <Grid item xs={6} sm={3}>
          <ReportCard
            title="Escalados"
            quantity={dashboardData?.data_scales?.scaled || 0}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ReportCard
            title="Ocorrendo"
            quantity={dashboardData?.data_scales?.happening || 0}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ReportCard
            title="Realizados"
            quantity={dashboardData?.data_scales?.finished || 0}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <ReportCard
            title="Faltas"
            quantity={dashboardData?.data_scales.missed || 0}
          />
        </Grid>
      </Grid>
    </div>
  );
}
