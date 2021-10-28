import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { useStyles, StyledDetailsReportCard } from './styles';
import LegendLine from 'shared/component/legendLine';

const colors = ['#24B8EC', '#EB0000', '#5AC17F', '#F0BE0A'];

const BarChart = ({ title, scales }) => {
  const classes = useStyles();

  const hasScales = () => {
    return !!scales;
  };

  const formatScalesStatus = (onScales) => {
    return onScales ? Math.ceil(onScales) : 0;
  };

  const state = {
    series: [
      {
        name: 'Quantidade',
        data: [
          formatScalesStatus(scales?.scaled),
          formatScalesStatus(scales?.happening),
          formatScalesStatus(scales?.finished),
          formatScalesStatus(scales?.exchanges),
        ],
      },
    ],
    options: {
      chart: {
        height: 300,
        type: 'bar',
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ['Plantões escalados'],
          ['Plantões ocorrendo'],
          ['Plantões realizados'],
          ['Plantões trocados'],
        ],
        labels: {
          show: false,
        },
      },
    },
  };

  return (
    <StyledDetailsReportCard elevation={0}>
      <Typography className={classes.title}>{title}</Typography>
      <Divider style={{ marginBottom: 20 }} />
      {hasScales() && (
        <>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={250}
          />
          <LegendLine
            color="#24B8EC"
            legend="Plantões Escalados"
            value={formatScalesStatus(scales?.scaled)}
          />
          <LegendLine
            color="#EB0000"
            legend="Plantões Ocorrendo"
            value={formatScalesStatus(scales?.happening)}
          />
          <LegendLine
            color="#5AC17F"
            legend="Plantões Realizados"
            value={formatScalesStatus(scales?.finished)}
          />
          <LegendLine
            color="#F0BE0A"
            legend="Plantões Trocados"
            value={formatScalesStatus(scales?.exchanges)}
          />
        </>
      )}
    </StyledDetailsReportCard>
  );
};

export default BarChart;
