import React, { useContext } from 'react';
import { useStyles, StyledAvatar } from './style';
import { Typography } from '@material-ui/core';
import { ExchangesPageContext } from 'page/exchangeReport/index';

export const TypeUserStatus = ({
  color = '',
  titleStatus = '',
  typeBall = '',
}) => {
  const classes = useStyles();

  const { details } = useContext(ExchangesPageContext);

  return (
    <div>
      <StyledAvatar src={details?.user?.image || ''} color={color} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <div className={classes[typeBall]} />
        <Typography
          style={{
            marginLeft: 10,
          }}
        >
          {titleStatus}
        </Typography>
      </div>
    </div>
  );
};
