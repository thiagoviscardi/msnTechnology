import React from 'react';
import useStyles from './style';
import { Avatar, Typography } from '@material-ui/core';
const AvatarSidebar = ({ name, data }) => {
  const classes = useStyles();
  return (
    <>
      {data && (
        <Avatar className={classes.small} alt="perfil" src={data.image_url} />
      )}
      {name && name.length > 20 ? (
        <Typography className={classes.title} variant="h6">
          {name.substring(0, 20)}...
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6">
          {name}
        </Typography>
      )}
    </>
  );
};

export default AvatarSidebar;
