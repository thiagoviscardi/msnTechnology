import React from 'react';
import { Avatar, Typography, Icon } from '@material-ui/core';
import { useStyles } from './styles';
import Button from '@material-ui/core/Button';
const typeExchangeReport = ({
  title,
  avatar,
  specialty,
  schedule,
  name,
  id,
  type,
  openDetails,
}) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.title}>{title}</Typography>
      <div className={classes.rowContainer}>
        {type === 'Cancelada' && (
          <div>
            <Button
              type="button"
              onClick={() => {
                openDetails(id);
              }}
              style={{
                padding: 0,
              }}
            >
              <Avatar className={classes.avatarCancel}>{avatar}</Avatar>
            </Button>
            <div className={classes.vlCancel}></div>
            <div className={classes.hlCancel}></div>
            <div>
              <Icon className={classes.iconCancel}>highlight_off</Icon>
            </div>
          </div>
        )}
        {type === 'Trocado' && (
          <div>
            <Button
              type="button"
              onClick={() => {
                openDetails(id);
              }}
              style={{
                padding: 0,
              }}
            >
              <Avatar className={classes.avatarConfirm}>{avatar}</Avatar>
            </Button>
            <div className={classes.vlComfirm}></div>
            <div className={classes.hlComfirm}></div>
            <div>
              <Icon className={classes.iconComfirm}>fiber_manual_record</Icon>
            </div>
          </div>
        )}
        {type === 'Aguardando' && (
          <div>
            <Button
              type="button"
              onClick={() => {
                openDetails(id);
              }}
              style={{
                padding: 0,
              }}
            >
              <Avatar className={classes.avatarWaiting}>{avatar}</Avatar>
            </Button>
            <div className={classes.vlWaiting}></div>
            <div className={classes.hlWaiting}></div>
            <div>
              <Icon className={classes.iconWaiting}>fiber_manual_record</Icon>
            </div>
          </div>
        )}
        <div className={classes.data}>
          <Typography className={classes.name}>{name}</Typography>
          <Typography className={classes.specialty}>{specialty}</Typography>
          <Typography className={classes.schedule}>{schedule}</Typography>
        </div>
      </div>
      <div className={classes.status}>
        {type === 'Cancelada' && (
          <div className={classes.statusCancel}>
            <Typography className={classes.titleType}>Cancelada</Typography>
          </div>
        )}
        {type === 'Trocado' && (
          <div className={classes.statusConfirm}>
            <Typography className={classes.titleType}>Trocou com</Typography>
          </div>
        )}
        {type === 'Aguardando' && (
          <div className={classes.statusWaiting}>
            <Typography className={classes.titleType}>
              Não confirmado
            </Typography>
          </div>
        )}
      </div>
      <div className={classes.rowContainer2}>
        {type === 'Cancelada' && (
          <Button
            type="button"
            onClick={() => {
              openDetails(id);
            }}
            style={{
              padding: 0,
            }}
          >
            <Avatar className={classes.avatarCancel}>{avatar}</Avatar>
          </Button>
        )}
        {type === 'Trocado' && (
          <Button
            type="button"
            onClick={() => {
              openDetails(id);
            }}
            style={{
              padding: 0,
            }}
          >
            <Avatar
              style={{
                borderColor: '#24B8EC',
              }}
              className={classes.avatarConfirm}
            >
              {avatar}
            </Avatar>
          </Button>
        )}
        {type === 'Aguardando' && (
          <div>
            <Button
              type="button"
              onClick={() => {
                openDetails(id);
              }}
            >
              <Avatar className={classes.avatarWaiting}>{avatar}</Avatar>
            </Button>
          </div>
        )}
        <div className={classes.data}>
          <Typography className={classes.name}>{name}</Typography>
          <Typography className={classes.specialty}>{specialty}</Typography>
          <Typography className={classes.schedule}>{schedule}</Typography>
        </div>
      </div>
    </>
  );
};

export default typeExchangeReport;
