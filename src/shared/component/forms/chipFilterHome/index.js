import React from 'react';
import { useStyles } from './styles';
import { Icon, IconButton } from '@material-ui/core';

const ChipFilterHome = ({ name, onClick, id, itemLength }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p className={classes.filterName}>{name}</p>
      <IconButton
        onClick={() => onClick(id, itemLength)}
        style={{ padding: 3 }}
      >
        <Icon style={{ fontSize: 21, color: 'white' }}>close</Icon>
      </IconButton>
    </div>
  );
};
export default ChipFilterHome;
