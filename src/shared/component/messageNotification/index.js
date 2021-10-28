import React from 'react';
import { IconButton, Icon } from '@material-ui/core';

const MessageNotification = ({
  openNotification,
  closeNotification,
  type,
  message,
  vertical,
  horizontal,
  position,
}) => {
  return (
    openNotification && (
      <div
        style={{
          display: 'flex',
          position: position ? position : 'absolute',
          bottom: vertical,
          left: horizontal,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 300,
          background: type === 'success' ? '#4caf50' : '#f44336',
        }}
      >
        <span
          style={{
            color: 'black',
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          {message}
        </span>
        <IconButton onClick={closeNotification}>
          <Icon>close</Icon>
        </IconButton>
      </div>
    )
  );
};

export default MessageNotification;
