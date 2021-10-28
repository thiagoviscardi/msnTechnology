import React, { useContext } from 'react';
import { useStyles } from './style';
import { Button, Icon, Typography } from '@material-ui/core';
import { ExchangesPageContext } from 'page/exchangeReport/index';

export const ContainerProfessionalDetails = ({ handleOpen = () => {} }) => {
  const classes = useStyles();
  const { details, selectedUnit } = useContext(ExchangesPageContext);

  const formatedSpecialties = (specialties) => {
    if (specialties && specialties.length > 0) {
      const joinedSpecialites = specialties.map((item) => item.name).join(', ');
      return joinedSpecialites;
    } else {
      return '...';
    }
  };

  const GROUP_MEDICO = 3;

  return (
    <div>
      <div className={classes.itemInfo}>
        <Typography className={classes.textTitle}>Profissional</Typography>
        <div className={classes.detailsText}>{details?.user?.name}</div>
      </div>
      <div className={classes.itemInfo}>
        <Typography className={classes.textTitle}>Área de atuação</Typography>
        <div className={classes.detailsText}>
          {details?.user?.group?.id === GROUP_MEDICO
            ? formatedSpecialties(details?.user?.specialties)
            : details?.user?.group?.name}
        </div>
      </div>
      <div className={classes.itemInfo}>
        <Typography className={classes.textTitle}>
          {details?.user?.regulation_agency.name || 'CRM'}
        </Typography>
        <div className={classes.detailsText}>
          {`${
            details?.user?.regulation_agency?.number
              ? details?.user?.regulation_agency?.number
              : '...'
          } -
            ${
              details?.user?.regulation_agency?.state
                ? details?.user?.regulation_agency?.state?.uf
                : '...'
            }`}
        </div>
      </div>
      <div className={classes.itemInfo}>
        <Typography className={classes.textTitle}>
          Empresa resposável
        </Typography>
        <div className={classes.detailsText}>{details?.company?.name}</div>
      </div>
      <div className={classes.itemInfo}>
        <Typography className={classes.textTitle}>Hospital</Typography>
        <div className={classes.detailsText}>{selectedUnit?.unit.name}</div>
      </div>
      <div className={classes.itemInfo}>
        <Typography className={classes.textTitle}>Contato</Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 50,
          }}
        >
          <Icon
            style={{
              fontSize: 20,
              color: '#24B8EC',
              marginRight: 5,
            }}
          >
            email_Outlined
          </Icon>
          <div className={classes.detailsText}>{details?.user?.email}</div>
        </div>
      </div>
      <div className={classes.buttonModal}>
        <Button
          data-cy="btn_send_alert"
          onClick={handleOpen}
          variant="outlined"
          style={{
            borderColor: '#24B8EC',
          }}
        >
          <Icon
            style={{
              fontSize: '18px',
              color: '#24B8EC',
              marginRight: 5,
            }}
          >
            send
          </Icon>

          <Typography
            style={{
              fontSize: '12px',
              color: '#24B8EC',
              textTransform: 'none',
            }}
          >
            Enviar alerta
          </Typography>
        </Button>
      </div>
    </div>
  );
};
