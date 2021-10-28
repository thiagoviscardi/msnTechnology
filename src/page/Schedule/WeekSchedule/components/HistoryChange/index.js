import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import moment from 'moment';

const priceFormat = (val) =>
  new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL',
  }).format(val);

function ChangeHistory({ lastUpdate, description, value, name }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography style={{ marginLeft: 12 }}>
          {moment(lastUpdate).format('DD/MM/YYYY')}
        </Typography>
        <Typography style={{ color: '#555' }}>{name}</Typography>
        <div style={{ width: '33%' }}>
          <Typography
            style={{
              textAlign: 'center',
              wordWrap: 'break-word',
            }}
          >
            {description}
          </Typography>
        </div>
        <div style={{ width: 99 }}>
          {value < 0 ? (
            <Typography
              style={{ color: 'red', marginRight: 12, textAlign: 'right' }}
            >
              {priceFormat(value)}
            </Typography>
          ) : (
            <Typography
              style={{
                color: 'green',
                marginRight: 12,
                textAlign: 'right',
              }}
            >
              {priceFormat(value)}
            </Typography>
          )}
        </div>
      </div>
      <Divider style={{ marginRight: 12, marginLeft: 12, marginBottom: 12 }} />
    </>
  );
}

export default ChangeHistory;
