import React from 'react';
import {
  useStyles,
  ScaleNameContainer,
  DateContainer,
  StatusContainer,
  PriceContainer,
} from './styles';
import { TableRow, Icon, Button } from '@material-ui/core';
import moment from 'moment';
import { toPrice } from 'utils/converters';

export default function ContainerCollapse({
  rowData,
  pagination,
  prevPage,
  nextPage,
  selectedSituationStatusList = [],
}) {
  const classes = useStyles();

  return (
    <div>
      {rowData &&
        rowData.length > 0 &&
        rowData
          .filter(
            (item) =>
              !!selectedSituationStatusList.find(
                (selected) =>
                  `${selected?.id}` ===
                  `${item?.situation}${item?.situation_status}`
              ) || !(selectedSituationStatusList.length > 0)
          )
          .map((scale) => (
            <div key={scale.agenda_id}>
              <TableRow className={classes.root}>
                <ScaleNameContainer className={classes.tableCellStyle}>
                  <p className={classes.title}>Plantão</p>
                  <p className={classes.scaleName}>{scale.scale.name}</p>
                </ScaleNameContainer>
                <DateContainer>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ width: '48%' }}>
                      <p className={classes.title}>Entrada</p>
                      {scale.date_start ? (
                        <p className={classes.grayTextDetail}>
                          {moment(
                            scale.date_start,
                            'DD/MM/YYYY HH:mm:ss'
                          ).format('DD/MM HH[h]mm')}
                        </p>
                      ) : (
                        <div style={{ marginLeft: 19 }}>
                          <p className={classes.grayTextDetail}>-</p>
                        </div>
                      )}
                    </div>
                    <div style={{ width: '48%' }}>
                      <p className={classes.title}>Saída</p>
                      {scale.date_end ? (
                        <p className={classes.grayTextDetail}>
                          {moment(scale.date_end, 'DD/MM/YYYY HH:mm:ss').format(
                            'DD/MM HH[h]mm'
                          )}
                        </p>
                      ) : (
                        <div style={{ marginLeft: 12 }}>
                          <p className={classes.grayTextDetail}>-</p>
                        </div>
                      )}
                    </div>
                  </div>
                </DateContainer>
                <StatusContainer>
                  <p className={classes.title}>Status</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {scale.status_agenda === 'Ocorrendo' && (
                      <Icon style={{ color: '#199919', marginRight: 8 }}>
                        av_timer
                      </Icon>
                    )}
                    {scale.status_agenda === 'Escalado' && (
                      <Icon style={{ color: '#000059', marginRight: 8 }}>
                        query_builder
                      </Icon>
                    )}
                    {scale.status_agenda === 'Realizado' && (
                      <Icon style={{ color: '#24B8EC', marginRight: 8 }}>
                        done_all
                      </Icon>
                    )}
                    <p style={{ margin: 0 }} className={classes.grayTextDetail}>
                      {scale.situation_description}
                    </p>
                  </div>
                </StatusContainer>
                <PriceContainer>
                  <p className={classes.title}>Valor</p>
                  <p className={classes.grayTextDetail}>{`R$${toPrice(
                    scale.price
                  )}`}</p>
                </PriceContainer>
              </TableRow>
            </div>
          ))}
      <div className={classes.buttonContainer}>
        <Button
          onClick={prevPage}
          disabled={!pagination.has_prev}
          style={{ padding: 0 }}
        >
          <Icon>keyboard_arrow_left</Icon>
        </Button>
        {pagination.has_prev && <p style={{ margin: 0 }}>1</p>}
        {pagination.has_prev && (
          <p style={{ margin: 0, marginLeft: 16, marginRight: 16 }}>...</p>
        )}
        <p style={{ margin: 0 }}>{pagination.current_page}</p>
        {pagination.has_next && (
          <p style={{ margin: 0, marginLeft: 16, marginRight: 16 }}>...</p>
        )}
        {pagination.has_next &&
          pagination.total_pages > pagination.current_page && (
            <p style={{ margin: 0 }}>{pagination.total_pages}</p>
          )}
        <Button
          onClick={nextPage}
          disabled={!pagination.has_next}
          style={{ padding: 0 }}
        >
          <Icon>keyboard_arrow_right</Icon>
        </Button>
      </div>
    </div>
  );
}
