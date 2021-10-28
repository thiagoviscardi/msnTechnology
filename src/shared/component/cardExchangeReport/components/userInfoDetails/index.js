import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';

const UserInfoDetails = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.data}>
      <Typography className={classes.name}>{user?.name}</Typography>
      <Typography className={classes.specialty}>{user?.group?.name}</Typography>
      <Typography className={classes.schedule}>
        {/* {user?.schedule} */}
      </Typography>
    </div>
  );
};

export default UserInfoDetails;
