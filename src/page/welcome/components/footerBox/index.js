import React from 'react';
import { FooterContainer, useStyles } from './styles';
import { Typography, Button } from '@material-ui/core';

const FooterBox = ({
  checked = [],
  selectedUnits = [],
  setSelectedUnits = () => {},
  setChecked = () => {},
  onSubmit = () => {},
}) => {
  const classes = useStyles();

  const handleCleanUnits = () => {
    const storageUnits = localStorage.getItem('plantãoExtra@hospital');
    if (storageUnits) {
      localStorage.removeItem('plantãoExtra@hospital');
    }
    setSelectedUnits([]);
    setChecked([]);
  };

  return (
    <FooterContainer>
      <Typography className={classes.footer}>
        *Selecione no máximo 3 hospitais.
      </Typography>
      <div style={{ display: 'flex' }}>
        <Button
          id="BtnLimpar"
          className={classes.buttonStyle}
          variant="outlined"
          color="primary"
          onClick={() => handleCleanUnits()}
          disabled={checked?.length < 1}
        >
          Limpar
        </Button>
        <Button
          id="btnFiltrarHospital"
          data-cy="btn_submit_hospital"
          type="submit"
          className={classes.filterButtonStyle}
          variant="contained"
          color="primary"
          onClick={() => onSubmit({ hospital: selectedUnits })}
          disabled={checked?.length < 1}
        >
          Filtrar hospitais
        </Button>
      </div>
    </FooterContainer>
  );
};

export default FooterBox;
