import React, { useContext, useState, useEffect } from 'react';
import { useStyles, ScrollContainer, BlueCheckbox } from './styles';
import {
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core';
import { ExchangesPageContext } from 'page/exchangeReport/index';
import { updateCheckboxStatus } from 'utils/updateCheckboxStatus';
import SearchInputDebounce from 'shared/component/forms/SearchInputDebounce';
import ControlledPagination from 'shared/component/ControledPagination';

export const ScalesCheckboxes = ({
  cleanAll = false,
  currentContext = ExchangesPageContext,
}) => {
  const classes = useStyles();

  const {
    stateScales,
    loadingUnitScales = false,
    totalUnitScales,
    mainFilter,
    getUnitScales = () => {},
    dataUnitScales,
    setStateScales = () => {},
  } = useContext(currentContext);
  const [filterScales, setFilterScales] = useState({
    page: 1,
    per_page: 10,
  });

  const getInitialScales = () => {
    setStateScales([
      ...dataUnitScales.map((item) => ({
        id: item.id,
        name: item.name,
        checked: !!stateScales?.find(
          (custom) => custom.checked && custom.id === item.id
        ),
      })),
    ]);
  };

  useEffect(() => {
    getUnitScales(mainFilter?.unit_id, filterScales);
  }, [filterScales]);

  useEffect(() => {
    getInitialScales();
  }, [dataUnitScales]);

  const handleChangeScales = (event) => {
    const { id, checked } = event.target;
    const newArray = updateCheckboxStatus(id, checked, stateScales);
    setStateScales(newArray);
  };

  const handleScaleSearch = (search) => {
    getUnitScales(mainFilter?.unit, { search });
  };

  const handlePageChange = (page) => {
    setFilterScales((oldState) => ({ ...oldState, page }));
  };

  useEffect(() => {
    if (cleanAll) {
      setStateScales([
        ...dataUnitScales.map((item) => ({
          id: item.id,
          name: item.name,
          checked: false,
        })),
      ]);
    }
  }, [cleanAll]);

  return (
    <div style={{ flex: 1.3 }}>
      <SearchInputDebounce
        placeholder="Buscar escalas"
        onChange={handleScaleSearch}
        style={{
          alignItems: 'center',
          width: '100%',
        }}
      />
      {!loadingUnitScales ? (
        <ScrollContainer className={classes.scrollContainer}>
          {stateScales &&
            stateScales.map((scale, i) => (
              <FormGroup key={i}>
                <FormControlLabel
                  style={{ margin: 0 }}
                  control={
                    <BlueCheckbox
                      checked={scale.checked}
                      onChange={handleChangeScales}
                      name={scale?.name}
                      id={scale?.id}
                    />
                  }
                  label={<span className={classes.label}>{scale?.name}</span>}
                />
              </FormGroup>
            ))}
        </ScrollContainer>
      ) : (
        <div
          style={{
            width: '100%',
            height: 180,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={30} color="primary" />
        </div>
      )}
      <div className={classes.containerPagination}>
        <ControlledPagination
          onChange={handlePageChange}
          total={totalUnitScales}
          perPage={filterScales?.per_page}
        />
      </div>
    </div>
  );
};
