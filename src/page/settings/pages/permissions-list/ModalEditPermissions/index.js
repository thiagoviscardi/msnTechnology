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

const ModalEditPermissions = forwardRef(({ handleGetPermissions }, ref) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [initialValues, setInitialValues] = useState({
    id: null,
    name: null,
    permission: null,
    status: null,
  });

  const openModalPermissions = useCallback((item) => {
    setInitialValues(item);
    setOpen(true);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        openModalPermissions,
      };
    },
    []
  );

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ContainerModal className={classes.paper}>
        <ContainerTopModal>
          <TitleModal>Lista de Permissões</TitleModal>
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
          initialValues={initialValues}
          handleCloseModal={() => setOpen(false)}
          handleGetPermissions={handleGetPermissions}
        />
      </ContainerModal>
    </Modal>
  );
});

export default ModalEditPermissions;
