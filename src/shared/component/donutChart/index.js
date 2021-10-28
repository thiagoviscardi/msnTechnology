import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import Chart from 'react-apexcharts';
import { useStyles, StyledDetailsReportCard } from './styles';
import LegendLine from 'shared/component/legendLine';

const DonutChart = ({ title, scales, data }) => {
  const classes = useStyles();

  const hasScales = () => {
    return !!scales;
  };

  const formatScalesPercent = (percent) => {
    return parseFloat(percent);
  };

  const { user_active, users_shift } = data;
  const user_percent = (user_active / (user_active + users_shift)) * 100;
  const user_scaled_percent = (users_shift / (user_active + users_shift)) * 100;

  const state = {
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Profissionais nas escalas', 'Profissionais fora da escala'],
      legend: {
        show: false,
      },
      colors: ['#24B8EC', '#d11507'],
    },
    series: [users_shift, user_active],
  };

  return (
    <StyledDetailsReportCard elevation={0}>
      <Typography className={classes.title}>{title}</Typography>
      <Divider style={{ marginBottom: 20 }} />
      <Chart
        options={state.options}
        series={state.series}
        type="donut"
        width="100%"
        height={250}
      />
      {hasScales() && (
        <div style={{ marginTop: 40 }}>
          <LegendLine
            color="#24B8EC"
            value={`${formatScalesPercent(user_scaled_percent).toFixed(1)}%`}
            legend="Profissionais nas escalas"
          />
          <LegendLine
            color="#d11507"
            value={`${formatScalesPercent(user_percent).toFixed(1)}%`}
            legend="Profissionais fora nas escalas"
          />
        </div>
      )}
    </StyledDetailsReportCard>
  );
};

export default DonutChart;
