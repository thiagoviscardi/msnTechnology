import React from 'react';
import { Avatar, Icon } from '@material-ui/core';
import { useStyles } from './styles';
import Button from '@material-ui/core/Button';

const DivStatusCanceled = ({
  user,
  openDetails,
  exchange,
  isCurrentUser = false,
}) => {
  const classes = useStyles();

  return (
    <div>
      {isCurrentUser && <div className={classes.isCanceled}></div>}
      <Button
        type="button"
        onClick={() => {
          openDetails(exchange, user);
        }}
        style={{
          padding: 0,
        }}
      >
        <Avatar className={classes.avatarCancel} src={user?.image} />
      </Button>
      {!isCurrentUser && (
        <>
          <div className={classes.vlCancel}></div>
          <div className={classes.hlCancel}></div>
          <div>
            <Icon className={classes.iconCancel}>highlight_off</Icon>
          </div>
        </>
      )}
    </div>
  );
};

export default DivStatusCanceled;
