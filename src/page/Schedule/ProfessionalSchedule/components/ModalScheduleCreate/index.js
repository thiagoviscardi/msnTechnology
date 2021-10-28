import React, { useContext } from 'react';
import { Modal } from '@material-ui/core';
import { useStyles, ContainerModal } from './styles';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';

import HeaderModal from './HeaderModal';
import GridModalCalendarCombo from './GridModalCalendarCombo';

function ModalScheduleCreate() {
  const classes = useStyles();

  const {
    openModalScheduleCall = false,
    handleCloseModalScheduleCall = () => {},
  } = useContext(ProfessionalSchedulePageContext);

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
