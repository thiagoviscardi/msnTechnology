import React from 'react';
// import PrintIcon from '@material-ui/icons/Print';
import {
  Modal,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import { ModalContainer, useStyles } from './styles';
import appColors from 'utils/appColors';
import DoctorCard from '../doctorCard';

const ShiftsModal = (props) => {
  const classes = useStyles();

  const { list, loadingReports, totalReports, handleClose, open, title, type } =
    props;

  return (
    <Modal className={classes.modal} open={open} onClose={handleClose}>
      <ModalContainer>
        <Typography className={classes.title}>{title}</Typography>
        <Divider />
        <div className={classes.columnContainer}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {list &&
              list.length > 0 &&
              !loadingReports &&
              list.map((escala, i) => (
                <div key={i}>
                  <Typography className={classes.scaleTitle}>
                    {escala.name}
                  </Typography>
                  <div className={classes.rowContainer}>
                    {escala.agendas.map((doctor, i) => (
                      <DoctorCard type={type} key={i} escala={doctor} />
                    ))}
                  </div>
                </div>
              ))}
            {loadingReports && (
              <div className={classes.loadingContainer}>
                <CircularProgress
                  style={{
                    color: appColors.PRIMARY_COLOR,
                  }}
                  size={90}
                />
              </div>
            )}
            {totalReports === 0 && !loadingReports && (
              <div className={classes.loadingContainer}>
                <Typography>Não há plantões nessa escala</Typography>
              </div>
            )}
          </div>

          <div className={classes.buttonsContainer}>
            <Button
              onClick={handleClose}
              variant="outlined"
              className={classes.closeButton}
            >
              <Typography className={classes.closeText}>Fechar</Typography>
            </Button>
            {/* <Button
              className={classes.printButton}
              endIcon={<PrintIcon style={{ color: '#DADADA' }} />}
            >
              <Typography className={classes.printText}>Imprimir</Typography>
            </Button> */}
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default ShiftsModal;
