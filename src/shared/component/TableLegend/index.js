import React from 'react';
import { TableLegendItem, Container } from './styles';

export const TableLegend = () => {
  return (
    <Container>
      <TableLegendItem color="#24B8EC">
        <div />
        Realizado
      </TableLegendItem>
      <TableLegendItem color="#5AC17F">
        <div />
        Ocorrendo
      </TableLegendItem>
      <TableLegendItem color="#818AEC">
        <div />
        Trocado
      </TableLegendItem>
      <TableLegendItem color="#1F437F">
        <div />
        Confirmado
      </TableLegendItem>
    </Container>
  );
};
