import React from 'react';
import styles from './styles';
import { Button, Typography } from '@material-ui/core';
import GeneratePdfExport from 'shared/component/GeneratePdfExport';
import bodyPdf from 'shared/component/GeneratePdfExport/bodyPdf';
import headerPdf from 'shared/component/GeneratePdfExport/headerPdf';
import { icons } from 'asset';

export default function ButtonExport({
  mainFilter,
  dataExchanges,
  selectedUnit,
}) {
  const classes = styles();
  const handleClickExport = () => {
    GeneratePdfExport(
      headerPdf('Relatório de trocas'),
      bodyPdf(mainFilter, dataExchanges, selectedUnit)
    );
  };

  return (
    <div className={classes.rootButton}>
      <Button
        startIcon={
          <img
            style={{
              filter:
                'invert(39%) sepia(84%) saturate(5260%) hue-rotate(177deg) brightness(95%) contrast(88%)',
            }}
            src={icons.insertDriveFile}
          ></img>
        }
        onClick={handleClickExport}
      >
        <Typography
          className={classes.title}
          style={{
            textTransform: 'none',
          }}
        >
          Exportar
        </Typography>
      </Button>
    </div>
  );
}
