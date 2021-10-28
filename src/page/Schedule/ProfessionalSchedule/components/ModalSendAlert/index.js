import React, { useState } from 'react';
import { Button, FormControl, Modal, Select } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export function ModalSendAlert({
  open,
  close,
  title,
  options,
  searchItem,
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
          width: '360px',
          height: '296px',
          background: '#FFFFFF',
          borderRadius: '10px',
          padding: '1.5rem',
        }}
      >
        <p>{title}</p>
        <FormControl
          variant="outlined"
          style={{
            width: '100%',
            marginTop: '16px',
          }}
        >
          <Select
            options={data}
            onChange={handleChangeMessage}
            placeholder="Pesquise a mensagem desejada"
            minMenuHeight={50}
            maxMenuHeight={170}
            value={message ? message : '0'}
            isClearable
            inputValue={searchItem}
            isSearchable={true}
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
            color="primary"
            style={{
              color: '#24B8EC',
              textTransform: 'capitalize',
              width: '136px',
              height: '32px',
              border: '1px solid #24B8EC',
              fontSize: '12px',
              marginTop: '120px',
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
