import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { useStyles } from './styles';

const ImageMessage = ({ content }) => {
  const classes = useStyles();
  return (
    <div className={classes.messageContainer}>
      <Icon style={{ color: '#24B8EC', fontSize: 24 }}>info_outline</Icon>
      <Typography className={classes.messageLogo}>{content}</Typography>
    </div>
  );
};

export default ImageMessage;
