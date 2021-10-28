import React, { useState } from 'react';
import { useStyles, ModalFilter } from './styles';
import { Modal, Icon, Button, Typography, InputBase } from '@material-ui/core';
import { icons } from 'asset';
import CheckboxFilter from '../forms/checkBoxFilter';
import { Divider } from '@material-ui/core';

export default function DayScalePage({
  openFilter,
  handleClose,
  onChange,
  dataSchedule,
  optionsStatus,
  top,
  left,
  setChipFilter,
  onFilter,
}) {
  const [status, setStatus] = useState(optionsStatus.map((item) => item.id));
  const [schedule, setSchedule] = useState(dataSchedule.map((item) => item.id));
  const filterRendler = (e) => {
    onFilter(status.filter((h) => e.status.includes(`${h.id}`)));
  };
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={openFilter}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
    >
      <ModalFilter top={top} left={left}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            style={{
              filter:
                'invert(58%) sepia(22%) saturate(3746%) hue-rotate(165deg) brightness(105%) contrast(85%)',
            }}
            src={icons.filter}
            alt=""
          />
          <Typography className={classes.text}>Filtros</Typography>
        </header>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 180px)',
            columnGap: 20,
            marginLeft: 10,
          }}
        >
          <p style={{ fontSize: 12, marginRight: 20 }}>Filtrar por status:</p>
          <p style={{ fontSize: 12 }}>Filtrar por escala:</p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,200px)',
            columnGap: 10,
            height: 140,
            marginBottom: 35,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'baseline',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 10,
            }}
          >
            {optionsStatus.length > 0 &&
              optionsStatus.map((item) => (
                <div key={item.id}>
                  <CheckboxFilter
                    setChipFilter={setChipFilter}
                    label={item.name}
                    filters={status}
                    setFilters={setStatus}
                    id={item.id}
                  />
                </div>
              ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 160,
              width: 200,
              overflowY: 'auto',
            }}
          >
            <div className={classes.headerSearch}>
              <Icon className={classes.searchIcon}>search</Icon>
              <InputBase
                onChange={onChange}
                className={classes.inputSearch}
                placeholder="Busque por escala"
              />
            </div>
            <Divider style={{ width: 180, backgroundColor: '#24B8EC' }} />
            {dataSchedule &&
              dataSchedule.length &&
              dataSchedule.map((item) => (
                <div key={item.id}>
                  <CheckboxFilter
                    setChipFilter={setChipFilter}
                    label={item.name}
                    filters={schedule}
                    setFilters={setSchedule}
                    id={item.id}
                  />
                </div>
              ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: 32,
            justifyContent: 'flex-end',
            background: '#f5f5f5',
          }}
        >
          <Button
            onClick={handleClose}
            style={{
              textTransform: 'none',
              fontSize: 12,
              color: '#A2A5A8',
            }}
          >
            <Icon fontSize="small" color="#A2A5A8">
              close
            </Icon>
            Limpar todos
          </Button>
          <Button
            type="submit"
            onClick={filterRendler}
            className={classes.buttonFilter}
          >
            Filtrar
          </Button>
        </div>
      </ModalFilter>
    </Modal>
  );
}
