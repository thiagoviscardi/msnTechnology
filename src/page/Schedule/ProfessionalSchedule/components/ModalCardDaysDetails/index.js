import React, { useMemo } from 'react';
import { CircularProgress, Modal, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import moment from 'moment';

export function ModalCardDaysDetails({
  openModalDayDetails = false,
  agendaDetails = {},
  loading = false,
  handleCloseDayDetails = () => {},
}) {
  const classes = useStyles();

  const formatHour = (hour) => moment(hour, 'HHmmss').format('HH:mm');
  const mountShedulesPeriod = useMemo(
    () =>
      `${formatHour(agendaDetails?.date_start)} - ${formatHour(
        agendaDetails?.date_end
      )}`,
    [agendaDetails]
  );

  return (
    <Modal
      open={openModalDayDetails}
      onClose={handleCloseDayDetails}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={classes.container_modal}>
        {!loading ? (
          <div className={classes.container_details}>
            <Typography className={classes.name_schedule}>
              {agendaDetails?.scale_name}
            </Typography>
            <Typography className={classes.hour_schedule}>
              {mountShedulesPeriod}
            </Typography>
            <Typography className={classes.unit_name}>
              {agendaDetails?.unit_name}
            </Typography>
          </div>
        ) : (
          <div className={classes.container_loading}>
            <CircularProgress size={20} color="primary" />
          </div>
        )}
      </div>
    </Modal>
  );
}
