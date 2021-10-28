import React from 'react';
import { Avatar, Icon } from '@material-ui/core';
import { useStyles } from './styles';
import Button from '@material-ui/core/Button';

const DivStatusChanged = ({
  user,
  openDetails,
  exchange,
  isCurrentUser = false,
}) => {
  const classes = useStyles();

  return (
    <div>
      {isCurrentUser && <div className={classes.isConfirm}></div>}
      <Button
        type="button"
        onClick={() => {
          openDetails(exchange, user);
        }}
        style={{
          padding: 0,
        }}
      >
        <Avatar className={classes.avatarConfirm} src={user?.image} />
      </Button>
      {!isCurrentUser && (
        <>
          <div className={classes.vlConfirm}></div>
          <div className={classes.hlConfirm}></div>
          <div>
            <Icon className={classes.iconConfirm}>fiber_manual_record</Icon>
          </div>
        </>
      )}
    </div>
  );
};

export default DivStatusChanged;
