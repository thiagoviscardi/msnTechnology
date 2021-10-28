import React from 'react';
import { Icon, Button, Typography } from '@material-ui/core';
import useStyles from './styles';
import Tooltip from '@material-ui/core/Tooltip';

const HospitalList = ({ item, changeHospital, removeHospital, length }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.unitContainer}>
        {item.name && (
          <Tooltip title={item.name} placement="right">
            <Icon style={{ color: '#24B8EC', position: 'relative' }}>
              pin_drop
            </Icon>
          </Tooltip>
        )}

        <div className={classes.nameContainer}>
          {item && item.name && item.name.length < 20 ? (
            <Typography className={classes.hospName}>{item.name}</Typography>
          ) : (
            <Typography className={classes.hospName}>
              {item.name.substring(0, 20)}...
            </Typography>
          )}
        </div>
      </div>
      <div className={classes.rowContainer}>
        <Button
          onClick={changeHospital}
          startIcon={
            <Icon style={{ fontSize: 12, color: '#A2A5A8' }}>
              swap_horizontal
            </Icon>
          }
        >
          <Typography className={classes.hospActions}>Trocar</Typography>
        </Button>
        {length > 1 && (
          <Button
            onClick={removeHospital}
            startIcon={
              <Icon style={{ fontSize: 12, color: '#A2A5A8' }}>close</Icon>
            }
          >
            <Typography className={classes.hospActions}>Remover</Typography>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HospitalList;
