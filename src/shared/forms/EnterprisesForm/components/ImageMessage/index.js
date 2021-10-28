import React from 'react';
import { Icon, Typography } from '@material-ui/core';
import { useStyles } from './styles';

const ImageMessage = () => {
  const classes = useStyles();
  return (
    <div className={classes.messageContainer}>
      <Icon style={{ color: '#24B8EC', fontSize: 24 }}>info_outline</Icon>
      <Typography className={classes.messageLogo}>
        Recomendamos que a imagem do seu logotipo tenha no mínimo o tamanho de
        208 x 208 px.
      </Typography>
    </div>
  );
};

export default ImageMessage;
