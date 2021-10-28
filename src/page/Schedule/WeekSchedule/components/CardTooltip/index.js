import React, { memo, useMemo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './styles';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Typography } from '@material-ui/core';
import moment from 'moment';

const CardTooltip = ({
  children,
  color,
  scaleData,
  schedule,
  selectedUnit,
}) => {
  const classes = useStyles();

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: `1px solid ${color}`,
    },
  }))(Tooltip);

  const formatHour = (hour) => moment(hour, 'HHmmss').format('HH:mm');

  const mountShedulesPeriod = useMemo(
    () =>
      `${formatHour(schedule[0]?.hour_start)} - ${formatHour(
        schedule[0]?.hour_end
      )}`,
    [schedule]
  );
  return (
    <HtmlTooltip
      placement="right"
      title={
        <div className={classes.container_tooltip}>
          <Typography className={classes.name_schedule}>
            {scaleData?.name}
          </Typography>
          <Typography className={classes.hour_schedule}>
            {mountShedulesPeriod}
          </Typography>
          <Typography className={classes.unit_name}>
            {selectedUnit?.name}
          </Typography>
          <Button
            color="primary"
            className={classes.button}
            startIcon={<EditIcon className={classes.icon_edit} />}
          >
            Clique no card para editar
          </Button>
        </div>
      }
      arrow
    >
      {children}
    </HtmlTooltip>
  );
};

export default memo(CardTooltip);
