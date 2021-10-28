import React from 'react';
import { useStyles } from './styles';
import { Typography, TableCell } from '@material-ui/core';

export const StatusType = ({ status }) => {
  const classes = useStyles();

  return (
    <TableCell>
      <div className={classes.status_view}>
        <Typography
          style={{
            color: status === 1 ? '#24B8EC' : '#A2A5A8',
          }}
          className={classes.status_text}
        >
          Ativo
        </Typography>
        {' | '}
        <Typography
          style={{
            color: status !== 1 ? '#24B8EC' : '#A2A5A8',
          }}
          className={classes.status_text}
        >
          Inativo
        </Typography>
      </div>
    </TableCell>
  );
};
