import React, { useState } from 'react';
import { Button, FormControl, Modal, IconButton } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import CustomSelect from 'shared/component/forms/CustomSelect';

export function ModalSendAlert({
  open,
  close,
  title,
  options,
  searchItem,
  notificationPagination,
  topNotificationPagination,
  dispatchMessage = () => {},
}) {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    if (options && options.length > 0) {
      setData([
        ...options.map((item) => ({
          label: item.text,
          value: item.id,
        })),
      ]);
    }
  }, [options]);
  const [message, setMessage] = useState('');
  const handleOpenSendFinish = () => {
    dispatchMessage(message.value);
  };

  const handleChangeMessage = (event) => {
    setMessage(event);
  };

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      open={open}
      onClose={close}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          width: '400px',
          height: '330px',
          background: '#FFFFFF',
          borderRadius: '10px',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{title}</p>
          <IconButton onClick={close} style={{ padding: 0 }}>
            <Icon fontSize="small">close</Icon>
          </IconButton>
        </div>
        <FormControl
          id="InputPesquisa"
          variant="outlined"
          style={{
            width: '100%',
            marginTop: '20px',
          }}
        >
          <CustomSelect
            loading={false}
            placeholder="Pesquise a mensagem desejada!"
            handleChange={handleChangeMessage}
            value={message ? message : '0'}
            options={data}
            isClearable
            searchItem={searchItem}
            pagination={notificationPagination}
            toTopPagination={topNotificationPagination}
          />
        </FormControl>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            data-cy="btn_modal_send_alert"
            disabled={!message}
            color="primary"
            style={{
              color: '#24B8EC',
              textTransform: 'capitalize',
              width: '136px',
              height: '32px',
              border: '1px solid #24B8EC',
              fontSize: '12px',
              marginTop: '160px',
            }}
            onClick={handleOpenSendFinish}
            endIcon={<Icon>send</Icon>}
          >
            Enviar alerta
          </Button>
        </div>
      </div>
    </Modal>
  );
}
