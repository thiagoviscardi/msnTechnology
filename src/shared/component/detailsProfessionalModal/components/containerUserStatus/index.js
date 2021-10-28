import React, { useContext } from 'react';
import { TypeUserStatus } from '../typeUserStatus';
import { ExchangesPageContext } from 'page/exchangeReport/index';

export const ContainerUserStatus = () => {
  const { details, statusType } = useContext(ExchangesPageContext);

  return (
    <>
      {`${details?.situation}${details?.situation_status}` ===
        statusType.SOLICITADO && (
        <TypeUserStatus
          color="#FDCAA8"
          typeBall="ballModalLate"
          titleStatus="Solicitado"
          style={{ height: 100, width: 100 }}
        />
      )}
      {`${details?.situation}${details?.situation_status}` ===
        statusType.CONFIRMADO && (
        <TypeUserStatus
          color="#8FA1BF"
          typeBall="ballModalClimbed"
          titleStatus="Confirmado"
        />
      )}
      {`${details?.situation}${details?.situation_status}` ===
        statusType.REALIZADO && (
        <TypeUserStatus
          color="#BBE9F9"
          typeBall="ballModalDone"
          titleStatus="Realizado"
        />
      )}
      {`${details?.situation}${details?.situation_status}` ===
        statusType.OCORRENDO && (
        <TypeUserStatus
          color="#99D9B0"
          typeBall="ballModalOccurring"
          titleStatus="Ocorrendo"
        />
      )}
      {`${details?.situation}${details?.situation_status}` ===
        statusType.RECUSADO && (
        <TypeUserStatus
          color="#F79999"
          typeBall="ballModalCancel"
          titleStatus="Cancelado"
        />
      )}
    </>
  );
};
