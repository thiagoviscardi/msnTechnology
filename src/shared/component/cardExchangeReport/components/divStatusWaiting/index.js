import React from 'react';
import { Avatar, Icon } from '@material-ui/core';
import { useStyles } from './styles';
import Button from '@material-ui/core/Button';

const DivStatusWaiting = ({
  user,
  openDetails,
  exchange,
  isCurrentUser = false,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          openDetails(exchange, user);
        }}
        style={{
          padding: 0,
        }}
      >
        <Avatar className={classes.avatarWaiting} src={user?.image} />
      </Button>
      {!isCurrentUser && (
        <>
          <div className={classes.vlWaiting}></div>
          <div className={classes.hlWaiting}></div>
          <div>
            <Icon className={classes.iconWaiting}>fiber_manual_record</Icon>
          </div>
        </>
      )}
    </div>
  );
};

export default DivStatusWaiting;
