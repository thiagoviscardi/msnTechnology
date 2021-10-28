import React, { useContext } from 'react';
import { useStyles, ContainerModal } from './styles';
import { CircularProgress, Grid, Modal } from '@material-ui/core';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';
import LeftGridInfo from './LeftGridInfo';
import RightGridInfo from './RightGridInfo';

function ModalProfessionalSchedule() {
  const classes = useStyles();

  const {
    openModalSchedule = false,
    loadingAgendaDetails = false,
    setOpenModalSchedule = () => {},
  } = useContext(ProfessionalSchedulePageContext);

  return (
    <Modal
      open={openModalSchedule}
      onClose={() => {
        setOpenModalSchedule(!openModalSchedule);
      }}
    >
      <ContainerModal className={classes.paper}>
        <div className={classes.root}>
          {!loadingAgendaDetails ? (
            <Grid container spacing={0}>
              <Grid
                className={classes.left_grid}
                item
                xs={2}
                sm={2}
                md={2}
                lg={3}
                xl={2}
              >
                <LeftGridInfo />
              </Grid>
              <Grid
                className={classes.right_grid}
                item
                xs={10}
                sm={10}
                md={10}
                lg={9}
                xl={10}
              >
                <RightGridInfo />
              </Grid>
            </Grid>
          ) : (
            <div className={classes.loading_container}>
              <CircularProgress color="primary" size={50} />
            </div>
          )}
        </div>
      </ContainerModal>
    </Modal>
  );
}

export default ModalProfessionalSchedule;
