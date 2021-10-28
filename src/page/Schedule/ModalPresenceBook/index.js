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
import FormPresenceBook from './FormPresenceBook';

const ModalPresenceBook = forwardRef((props, ref) => {
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
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      data-cy="modal_gerar_caderno_presenca"
    >
      <ContainerModal className={classes.paper}>
        <ContainerTopModal>
          <TitleModal>Gerar Caderno de Presença</TitleModal>
          <CloseModal>
            <IconButton
              onClick={() => setOpen(false)}
              className={classes.closeButton}
            >
              <Icon>close</Icon>
            </IconButton>
          </CloseModal>
        </ContainerTopModal>
        <FormPresenceBook handleCloseModal={() => setOpen(false)} />
      </ContainerModal>
    </Modal>
  );
});

export default ModalPresenceBook;
