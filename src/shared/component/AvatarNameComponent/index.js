import React from 'react';
import { useStyles } from './styles';
import { Typography, TableCell, Avatar } from '@material-ui/core';

export const AvatarNameComponent = ({ rowData }) => {
  const classes = useStyles();

  return (
    <TableCell>
      <div className={classes.avatar_view}>
        {rowData?.image_url && rowData?.image_url !== '' && (
          <Avatar
            className={classes.avatar}
            alt="logo-hospital"
            src={rowData?.image_url}
          />
        )}
        {rowData?.image && rowData?.image !== '' && (
          <Avatar
            className={classes.avatar}
            alt="logo-hospital"
            src={rowData?.image}
          />
        )}
        <Typography className={classes.name}>{rowData?.name}</Typography>
      </div>
    </TableCell>
  );
};
