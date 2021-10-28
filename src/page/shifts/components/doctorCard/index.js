import React from 'react';
import { UserCard, useStyles } from './styles';
import { Avatar, Typography } from '@material-ui/core';

const DoctorCard = ({ escala, type }) => {
  const classes = useStyles();
  const hourStart = escala.hour_start.substring(0, 5);
  const hourEnd = escala.hour_end.substring(0, 5);

  const nameUser = (
    <Typography className={classes.doctorName}>{escala.user.name}</Typography>
  );

  const nameUserEdit = (
    <Typography className={classes.doctorName}>
      {escala.user.name.substring(0, 33)}...
    </Typography>
  );

  const nameUserOld = (
    <Typography className={classes.doctorName}>
      {escala.user_old.name}
    </Typography>
  );

  const nameUserOldEdit = (
    <Typography className={classes.doctorName}>
      {escala.user_old.name.substring(0, 19)}...
    </Typography>
  );

  return (
    <UserCard style={type === 'shifts' ? { width: 520 } : {}}>
      <Avatar alt="doctor_profile" src={escala.user.image} />
      <div>
        {type === 'shifts' ? (
          escala.user.name.length < 19 ? (
            <div className={classes.rowContainer}>
              <Typography
                style={{ fontWeight: 'bold' }}
                className={classes.doctorName}
              >
                {escala.user.name}
              </Typography>
              <Typography style={{ marginLeft: 12 }}>recebeu de</Typography>
              {nameUserOld}
            </div>
          ) : (
            <div className={classes.rowContainer}>
              <Typography
                style={{ fontWeight: 'bold' }}
                className={classes.doctorName}
              >
                {escala.user.name.substring(0, 19)}...
              </Typography>
              <Typography style={{ marginLeft: 12 }}>recebeu de</Typography>
              {nameUserOldEdit}
            </div>
          )
        ) : escala.user.name.length < 33 ? (
          nameUser
        ) : (
          nameUserEdit
        )}

        <Typography className={classes.escaleDate}>
          {hourStart} - {hourEnd}
        </Typography>
      </div>
    </UserCard>
  );
};

export default DoctorCard;
