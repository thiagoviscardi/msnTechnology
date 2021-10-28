import React, { useState, useContext, useEffect } from 'react';
import { useStyles, BlueCheckbox } from './styles';
import { Typography, FormGroup, FormControlLabel } from '@material-ui/core';
import { ExchangesPageContext } from 'page/exchangeReport/index';
import { updateCheckboxStatus } from 'utils/updateCheckboxStatus';

export const StatusCheckboxes = ({
  cleanAll = false,
  currentContext = ExchangesPageContext,
}) => {
  const classes = useStyles();

  const { mainFilter, setMainFilter = () => {} } = useContext(currentContext);

  const initialStatus = [
    { id: 31, name: 'Solicitado', checked: false },
    { id: 32, name: 'Escalado', checked: false },
    { id: 33, name: 'Ocorrendo', checked: false },
    { id: 34, name: 'Realizado', checked: false },
    { id: 35, name: 'Recusado', checked: false },
  ];

  const [status, setStatus] = useState([]);
  useEffect(() => {
    if (mainFilter?.custom_filter) {
      const newArray = initialStatus.map((item) => ({
        ...item,
        checked: !!mainFilter?.custom_filter.find(
          (custom) => custom.id === item.id
        ),
      }));
      setStatus(newArray);
    }
  }, [mainFilter]);

  const getStatusRequest = (listStatus) => {
    setMainFilter((oldState) => ({
      ...oldState,
      custom_filter: listStatus.filter((item) => item.checked),
    }));
  };

  const handleChangeStatusScale = (event) => {
    const { id, checked } = event.target;
    const newArray = updateCheckboxStatus(id, checked, status);
    getStatusRequest(newArray);
    setStatus(newArray);
  };

  useEffect(() => {
    if (cleanAll) {
      setStatus(initialStatus);
    }
  }, [cleanAll]);

  return (
    <div style={{ flex: 1 }}>
      <Typography style={{ marginLeft: 15, marginTop: 5 }}>
        Filtro por status:
      </Typography>
      <div className={classes.scrollContainer}>
        {status &&
          status.map((item, i) => (
            <FormGroup key={i}>
              <FormControlLabel
                style={{ margin: 0 }}
                control={
                  <BlueCheckbox
                    checked={item.checked}
                    onChange={handleChangeStatusScale}
                    name={item?.name}
                    id={item?.id}
                  />
                }
                label={<span className={classes.label}>{item?.name}</span>}
              />
            </FormGroup>
          ))}
      </div>
    </div>
  );
};
