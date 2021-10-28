import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { icons } from 'asset';
import { useHistory } from 'react-router-dom';

const HeaderBox = ({ userLogged, totalUnits, selectedUnits }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleRedirect = () => {
    history.push(`/plantoes`);
  };

  return (
    <div>
      <Typography className={classes.title}>
        Bem vindo,
        <br />
        {userLogged.name}
      </Typography>
      <div className={classes.box}>
        <img
          style={{
            filter:
              '  invert(71%) sepia(67%) saturate(3010%) hue-rotate(161deg) brightness(94%) contrast(96%)',
          }}
          alt="hospital-icon"
          src={icons.hospital}
          className={classes.icon}
        />
        <Typography
          style={{
            color: '#24B8EC',
            whiteSpace: 'nowrap',
            fontFamily: 'Poppins',
            fontSize: 16,
          }}
        >
          {totalUnits} hospitais cadastrados
        </Typography>
        <Button
          data-cy="btn_visao_geral"
          onClick={() => handleRedirect()}
          disabled={selectedUnits && !selectedUnits.length > 0}
          className={classes.linkStyle}
        >
          <Typography
            style={{ color: '#A2A5A8', marginRight: 16, marginLeft: 8 }}
          >
            |
          </Typography>
          <Typography
            style={{
              color: '#A2A5A8',
              fontFamily: 'Poppins',
              whiteSpace: 'nowrap',
              fontSize: 16,
            }}
          >
            visão geral
          </Typography>
          <img
            style={{
              width: 19,
              filter:
                'invert(73%) sepia(8%) saturate(117%) hue-rotate(169deg) brightness(89%) contrast(92%)',
            }}
            alt=""
            src={icons.keyboardArrowRight}
          />
        </Button>
      </div>
    </div>
  );
};

export default HeaderBox;
