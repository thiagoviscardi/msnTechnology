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
import FormPermissions from './FormPermissions';

const ModalCreatePermissions = forwardRef(({ handleGetPermissions }, ref) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const initialValues = {
    id: null,
    name: null,
    permission: null,
    status: null,
  };
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
          <TitleModal>Cadastrar Permissão</TitleModal>
          <CloseModal>
            <IconButton
              onClick={() => setOpen(false)}
              className={classes.closeButton}
            >
              <Icon>close</Icon>
            </IconButton>
          </CloseModal>
        </ContainerTopModal>
        <FormPermissions
          handleCloseModal={() => setOpen(false)}
          handleGetPermissions={handleGetPermissions}
          initialValues={initialValues}
        />
      </ContainerModal>
    </Modal>
  );
});

export default ModalCreatePermissions;
