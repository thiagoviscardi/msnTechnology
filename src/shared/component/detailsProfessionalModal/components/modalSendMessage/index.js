import React, { useState, useRef } from 'react';
import { useStyles } from './style';
import {
  Modal,
  Icon,
  Typography,
  IconButton,
  Button,
  FormControl,
} from '@material-ui/core';
import { useTemplateNotifications } from 'hook/templateNotifications';
import CustomSelect from 'shared/component/forms/CustomSelect';

export const ModalSendMessage = ({
  open = false,
  handleCloseMensager = () => {},
  handleOpenAlert = () => {},
}) => {
  const classes = useStyles();
  const [filter, setFilter] = useState({
    page: 1,
    per_page: 5,
    search: '',
    search_type: 'text',
  });
  const [options, setOptions] = useState([]);
  const { page, per_page, search, search_type } = filter;
  const { getList, data, total } = useTemplateNotifications();

  React.useEffect(() => {
    getList({ page, per_page, search, search_type });
  }, [page, search]);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    !open && setMessage('');
  }, [open]);

  React.useEffect(() => {
    if (data && data.length > 0) {
      setOptions([
        ...data.map((item) => ({
          id: item.id,
          label: item.text,
          value: item.id,
        })),
      ]);
    }
  }, [data]);

  const handleChangeMessage = (value) => {
    setMessage(value);
  };
  const handleSearchMesaage = (search) => {
    setFilter((old) => ({ ...old, search }));
  };
  const page_ref = useRef(1);

  const notificationPagination = () => {
    const totalPage = Math.ceil(total / per_page);
    const nextPage = page_ref.current + 1;
    if (page < totalPage) {
      setFilter((oldState) => ({
        ...oldState,
        page: nextPage,
      }));

      page_ref.current = nextPage;
    }
  };

  const topNotificationPagination = () => {
    if (per_page > 1) {
      let prevPage = page_ref.current - 1;
      prevPage = prevPage > 0 ? prevPage : 1;
      setFilter((oldState) => ({
        ...oldState,
        page: prevPage,
      }));

      page_ref.current = prevPage;
    }
  };
  return (
    <Modal
      className={classes.modalMensager}
      open={open}
      disableAutoFocus
      disableEnforceFocus
    >
      <div
        style={{
          width: '400px',
          height: '330px',
          background: '#FFFFFF',
          borderRadius: '10px',
        }}
      >
        {' '}
        <div className={classes.iconButton}>
          <Typography className={classes.titleModal}>
            Selecionar mensagem pré-definida
          </Typography>
          <IconButton
            onClick={handleCloseMensager}
            style={{ marginTop: 5, marginRight: 11 }}
          >
            <Icon fontSize="small">close</Icon>
          </IconButton>
        </div>
        <FormControl variant="outlined" className={classes.selectContainer}>
          <CustomSelect
            loading={false}
            placeholder="Pesquise a mensagem desejada!"
            handleChange={handleChangeMessage}
            value={message ? message : '0'}
            options={options}
            isClearable
            searchItem={handleSearchMesaage}
            pagination={notificationPagination}
            toTopPagination={topNotificationPagination}
          />
        </FormControl>
        <div className={classes.buttonModalAlert}>
          <Button
            data-cy="btn_modal_send_alert"
            disabled={!message}
            onClick={() => message && handleOpenAlert(message.value)}
            variant="outlined"
            style={{
              borderColor: '#24B8EC',
            }}
          >
            <Icon className={classes.sendIcon}>send</Icon>
            <Typography className={classes.sendAlertText}>
              Enviar alerta
            </Typography>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
