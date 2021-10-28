import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DetailsReportCard from 'shared/component/detailsReportCard';
import DonutChart from 'shared/component/donutChart';
import BarChart from 'shared/component/barChart';
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

export default function BottomDetailsReportGrid() {
  const classes = useStyles();
  const { dashboardData } = useContext(DashboardPageContext);
  const [metrics, setMetrics] = useState([]);

  const getFormatedMetrics = () => {
    const arrayMetrics = [
      { name: 'Hospitais', value: dashboardData?.data_metrics.hospitals },
      {
        name: 'Profissionais ativos',
        value: dashboardData?.data_metrics.user_active,
      },
      {
        name: 'Profissionais escalados',
        value: dashboardData?.data_metrics.users_shift,
      },
    ];

    setMetrics(arrayMetrics);
  };

  useEffect(() => {
    if (dashboardData) getFormatedMetrics();
  }, [dashboardData]);

  return (
    <div className={classes.root}>
      <Grid justify="flex-start" container spacing={3}>
        <Grid data-cy="div_metricas" item xs={6} sm={6} md={6} lg={3}>
          <DetailsReportCard title="Métricas" details={metrics} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={3}>
          <DonutChart
            title="Escalas de profissionais"
            scales={dashboardData?.data_metrics}
            data={dashboardData.data_metrics}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={3}>
          <BarChart
            title="Status das escalas"
            scales={dashboardData?.data_scales}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={3}>
          <DetailsReportCard
            title="Destaques"
            details={dashboardData?.data_highlights || []}
          />
        </Grid>
      </Grid>
    </div>
  );
}
