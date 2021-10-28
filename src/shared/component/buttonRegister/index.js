import React from 'react';
import styles from './styles';
import { Button, Typography } from '@material-ui/core';

export default function ButtonRegister({ title, style, onclik }) {
  const classes = styles();
  return (
    <div className={classes.rootButton}>
      <Button style={style} onclik={onclik}>
        <Typography
          className={classes.title}
          style={{
            textTransform: 'none',
          }}
        >
          {title}
        </Typography>
      </Button>
    </div>
  );
}
