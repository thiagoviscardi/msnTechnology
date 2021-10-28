import React, { useContext } from 'react';
import { useStyles } from './styles';
import { Button, IconButton, Icon, Typography, Chip } from '@material-ui/core';
import { icons } from 'asset';
import { ExchangesPageContext } from 'page/exchangeReport/index';

export default function FilterTab({
  type = '',
  defaultContext = ExchangesPageContext,
  showSearchButton = true,
  titleFilter = 'Filtro',
}) {
  const classes = useStyles();

  const {
    scaleJsonInLocal,
    selectedUnit,
    stateScales,
    mainFilter,
    setMainFilter = () => {},
    handleOpenSearchModal = () => {},
    handleOpenFilter = () => {},
    handleCloseChipScale = () => {},
    handleCloseChipStatus = () => {},
  } = useContext(defaultContext);
  return (
    <div
      style={{ marginTop: 12, marginBottom: 12 }}
      className={classes.rowContainer}
    >
      {showSearchButton && (
        <IconButton onClick={handleOpenSearchModal}>
          <Icon style={{ fontSize: 34 }}>search</Icon>
        </IconButton>
      )}
      <Button
        id="btnFiltro"
        onClick={handleOpenFilter}
        startIcon={<img src={icons?.filter} style={{ width: 34 }} />}
      >
        <Typography
          style={{
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: 500,
            textAlign: 'left',
          }}
        >
          {titleFilter}
        </Typography>
      </Button>
      {type !== 'localScales' &&
        stateScales &&
        stateScales.length > 0 &&
        stateScales
          .filter((item) => item.checked)
          .map((option, i) => (
            <Chip
              key={i}
              style={{ marginLeft: 16 }}
              label={option.name}
              onDelete={handleCloseChipScale(option)}
            />
          ))}
      {type !== 'localScales' &&
        mainFilter &&
        mainFilter?.custom_filter &&
        mainFilter?.custom_filter
          .filter((item) => item.checked)
          .map((item) => (
            <Chip
              key={item.id}
              style={{ marginLeft: 16 }}
              label={item.name}
              onDelete={handleCloseChipStatus(item)}
            />
          ))}
      {type !== 'localScales' && mainFilter && mainFilter?.scale_id && (
        <Chip
          key={mainFilter?.scale_id}
          style={{ marginLeft: 16 }}
          label={mainFilter?.scale_name}
          onDelete={() =>
            setMainFilter((old) => ({
              ...old,
              scale_id: null,
              scale_name: null,
            }))
          }
        />
      )}
      {scaleJsonInLocal &&
        scaleJsonInLocal.length > 0 &&
        selectedUnit &&
        scaleJsonInLocal &&
        scaleJsonInLocal
          .filter((item) => item.unit === selectedUnit.id)
          .map((option, i) => (
            <Chip
              key={i}
              style={{ marginLeft: 16 }}
              label={option.label}
              onDelete={handleCloseChipScale(option)}
            />
          ))}
    </div>
  );
}
