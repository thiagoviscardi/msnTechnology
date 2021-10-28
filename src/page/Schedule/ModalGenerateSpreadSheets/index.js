import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';
import { Icon, IconButton, Modal } from '@material-ui/core';
import {
  useStyles,
  TitleModal,
  CloseModal,
  ContainerModal,
  ContainerTopModal,
} from './styles';
import FormGenerateSpreadSheets from './FormGenerateSpreadSheets';

const ModalGenerateSpreadSheets = forwardRef((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        handleOpenModal,
      };
    },
    []
  );

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ContainerModal className={classes.paper}>
        <ContainerTopModal>
          <TitleModal>Gerar Planilhas</TitleModal>
          <CloseModal>
            <IconButton
              onClick={() => setOpen(false)}
              className={classes.closeButton}
            >
              <Icon>close</Icon>
            </IconButton>
          </CloseModal>
        </ContainerTopModal>
        <FormGenerateSpreadSheets handleCloseModal={() => setOpen(false)} />
      </ContainerModal>
    </Modal>
  );
});

export default ModalGenerateSpreadSheets;
