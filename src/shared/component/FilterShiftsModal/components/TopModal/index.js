import React from 'react';
import { useStyles } from './styles';
import { Icon, Typography } from '@material-ui/core';
import appColors from 'utils/appColors';

export const TopModal = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.rowContainer}>
        <Icon
          style={{
            fontSize: 20,
            marginRight: 5,
            color: appColors.PRIMARY_COLOR,
          }}
        >
          filter_alt
        </Icon>
        <Typography
          style={{
            color: appColors.PRIMARY_COLOR,
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 2,
          }}
        >
          Filtros
        </Typography>
      </div>
    </div>
  );
};
