import React, { useContext } from 'react';
import { Modal } from '@material-ui/core';
import { useStyles, ContainerModal } from './styles';

import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import HeaderModal from './HeaderModal';
import GridModalCalendarCombo from './GridModalCalendarCombo';

function ModalScheduleCreate() {
  const classes = useStyles();

  const {
    openModalScheduleCall = false,
    handleCloseModalScheduleCall = () => {},
  } = useContext(ScheduleWeekPageContext);

  return (
    <Modal open={openModalScheduleCall} onClose={handleCloseModalScheduleCall}>
      <ContainerModal className={classes.paper}>
        <HeaderModal />
        <GridModalCalendarCombo />
      </ContainerModal>
    </Modal>
  );
}

export default ModalScheduleCreate;
