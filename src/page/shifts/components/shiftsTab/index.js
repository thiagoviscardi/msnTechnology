import React from 'react';
import { Divider } from '@material-ui/core';
import { AntTab, AntTabs } from './styles';

const ShiftsTab = ({ handleChange, value }) => {
  return (
    <>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        <AntTab value={0} label="Trocas" />
        <AntTab value={1} label="Ocorrendo" />
        <AntTab value={2} label="Realizados" />
        <AntTab value={3} label="Não finalizados" />
        <AntTab value={4} label="Validados" />
        <AntTab value={5} label="Pagos à vista" />
        <AntTab value={6} label="Não iniciados" />
      </AntTabs>
      <Divider style={{ marginTop: -2, paddingTop: 2 }} />
    </>
  );
};
export default ShiftsTab;
