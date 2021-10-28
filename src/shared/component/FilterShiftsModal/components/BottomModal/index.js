import React from 'react';
import { useStyles } from './styles';
import { Icon, Button } from '@material-ui/core';

export const BottomModal = ({
  handleCleanAll = () => {},
  handleCloseFilter = () => {},
  onlyOneScale = false,
  buttonFilter = false,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.closeBar}>
      {!onlyOneScale && (
        <Button
          onClick={handleCleanAll}
          className={classes.button}
          startIcon={
            <Icon fontSize="small" color="#A2A5A8">
              close
            </Icon>
          }
        >
          Limpar todos
        </Button>
      )}
      <Button
        id="Filtrar"
        onClick={handleCloseFilter}
        className={classes.button_filter}
        variant="contained"
        color="primary"
        startIcon={
          buttonFilter && (
            <Icon fontSize="small" color={'inherit'}>
              search
            </Icon>
          )
        }
      >
        {buttonFilter ? 'Filtrar' : 'Fechar'}
      </Button>
    </div>
  );
};
