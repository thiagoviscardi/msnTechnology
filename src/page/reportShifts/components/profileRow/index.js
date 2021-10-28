import React from 'react';
import { Avatar, TableCell, IconButton } from '@material-ui/core';
import { useStyles } from './styles';

const ProfileRow = ({ id, name, userImage, specialty, onClick }) => {
  const classes = useStyles();

  return (
    <TableCell>
      <div className={classes.root}>
        <IconButton
          style={{ padding: 0, marginRight: 16 }}
          onClick={() => onClick(id)}
        >
          <Avatar alt="userImage" src={userImage} />
        </IconButton>
        <div>
          <p className={classes.userName}>{name}</p>
          <p className={classes.specialty}>{specialty}</p>
        </div>
      </div>
    </TableCell>
  );
};

export default ProfileRow;
