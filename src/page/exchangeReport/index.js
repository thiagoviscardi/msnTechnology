import React, { useState, useEffect, createContext } from 'react';
import { Divider } from '@material-ui/core';
import { styles, DefaultContainer } from './styles';
import CardExchangeReport from 'shared/component/cardExchangeReport';
import FilterTab from 'shared/component/filterTab';
import FilterShiftsModal from 'shared/component/FilterShiftsModal';
import DetailsProfessionalModal from 'shared/component/detailsProfessionalModal';
import Layout from 'shared/component/Layout';
import { useExchanges } from 'hook/exchanges';
import { useConfig } from 'hook/config';
import { useUnitScales } from 'hook/unitScales';
import InputSearchModal from 'shared/component/inputSearchModal';
import { updateCheckboxStatus } from 'utils/updateCheckboxStatus';
import { Typography } from '@material-ui/core';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import ControlledPagination from 'shared/component/ControledPagination';
import usePersistedState from 'hook/usePersistedState';
import '../../shared/fixedtab.css';

export const ExchangesPageContext = createContext({});

const statusType = {
  SOLICITADO: '31',
  CONFIRMADO: '32',
  OCORRENDO: '33',
  REALIZADO: '34',
  RECUSADO: '35',
};

export default function ExchangeReport() {
  const classes = styles();

  const { config } = useConfig();

  const {
    loading: loadingExchanges,
    data: dataExchanges,
    total: totalExchanges,
    getExchanges,
  } = useExchanges();

  const {
    loading: loadingUnitScales,
    data: dataUnitScales,
    total: totalUnitScales,
    getUnitScales,
  } = useUnitScales();

  const [state, setState] = usePersistedState('plantaoextra@exchangeReport', {
    value: 0,
    openSearchModal: false,
    openFilter: false,
    openDetails: false,
    loading: false,
    details: {},
    data1: [],
  });
  const { openSearchModal, openFilter, openDetails, details } = state;

  const [stateScales, setStateScales] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const intialMainFilter = {
    filter: 'exchanges',
    date_start: '',
    date_end: '',
    unit_id: null,
    scale_id: null,
    custom_filter: [],
    scales: [],
    page: 1,
    per_page: 10,
    search: '',
  };
  const [mainFilter, setMainFilter] = useState(intialMainFilter);

  const [filterScales, setFilterScales] = useState({
    page: 1,
    per_page: 10,
  });

  const handleOpenSearchModal = () => {
    setState({ ...state, openSearchModal: true });
  };

  const handleCloseSearchModal = () => {
    setState({ ...state, openFilter: false, openSearchModal: false });
  };

  const handleOpenFilter = () => {
    setState({ ...state, openSearchModal: false, openFilter: true });
  };

  const handleCloseFilter = () => {
    setState({ ...state, openFilter: false });
  };

  const handleChangeTab = (event, newTab) => {
    setState({ ...state, value: newTab });
  };

  const handleClickUnitTab = (unit) => {
    setMainFilter((oldState) => ({
      ...oldState,
      custom_filter: [],
      scales: [],
      unit_id: unit.id,
    }));
    setSelectedUnit({
      unit,
    });
    setStateScales([]);
  };

  const handleOpenDetails = (exchange, user) => {
    setState({
      ...state,
      openDetails: true,
      details: { ...exchange, user },
    });
  };

  const handleCloseDetails = () => {
    setState({ ...state, openDetails: false, openSearchModal: false });
  };

  const handleCloseChipScale = (filterDelete) => () => {
    const newArray = updateCheckboxStatus(filterDelete.id, false, stateScales);
    setStateScales(newArray);
  };

  const handleCloseChipStatus = (filterDelete) => () => {
    const newArray = updateCheckboxStatus(
      filterDelete.id,
      false,
      mainFilter?.custom_filter
    ).filter((item) => item.checked);
    setMainFilter((oldState) => ({ ...oldState, custom_filter: newArray }));
  };

  const handlePageChange = (page) => {
    setMainFilter((oldState) => ({ ...oldState, page }));
  };

  const handleDateChange = ({ date_start, date_end }) => {
    setMainFilter((oldState) => ({ ...oldState, date_start, date_end }));
  };

  useEffect(() => {
    const firstUnitOnConfig = config?.hospitalData[0];
    if (config?.hospitalData && !selectedUnit) {
      setSelectedUnit({
        unit: firstUnitOnConfig,
      });
      setMainFilter((oldState) => ({
        ...oldState,
        unit_id: firstUnitOnConfig?.id,
      }));
      getUnitScales(firstUnitOnConfig?.id);
    }
  }, [config]);

  useEffect(() => {
    if (stateScales && stateScales.length > 0) {
      setMainFilter((oldState) => ({
        ...oldState,
        scales: stateScales.filter((item) => item.checked),
      }));
    }
  }, [stateScales]);

  useEffect(() => {
    const { unit_id, date_start, date_end } = mainFilter;
    if (!openFilter && unit_id && date_start && date_end)
      getExchanges(mainFilter);
    else if (
      !openFilter &&
      (mainFilter?.custom_filter.length > 0 || mainFilter?.scales.length > 0)
    ) {
      getExchanges(mainFilter);
    }
  }, [mainFilter, openFilter]);

  useEffect(() => {
    if (config.hospitalData) {
      setState({
        value: 0,
        openSearchModal: false,
        openFilter: false,
        openDetails: false,
        loading: false,
        details: {},
        data1: [],
      });
    }
  }, [config]);
  return (
    <Layout
      title="Trocas"
      handleDateChange={handleDateChange}
      calendarWeek={false}
      calendarRange={true}
      isLoading={loadingExchanges}
      startNull
    >
      <ExchangesPageContext.Provider
        value={{
          dataUnitScales,
          openFilter,
          stateScales,
          intialMainFilter,
          loadingUnitScales,
          filterScales,
          totalUnitScales,
          details,
          statusType,
          openDetails,
          openSearchModal,
          mainFilter,
          selectedUnit,
          getUnitScales,
          setFilterScales,
          setStateScales,
          setMainFilter,
          handleCloseSearchModal,
          handleOpenSearchModal,
          handleOpenFilter,
          handleCloseFilter,
          handleCloseChipScale,
          handleCloseChipStatus,
          handleCloseDetails,
        }}
      >
        <div id="fixed-tab">
          <AntTabs
            value={state.value}
            onChange={handleChangeTab}
            aria-label="ant example"
          >
            {config &&
              config.hospitalData.map((unit, i) => (
                <AntTab
                  onClick={() => handleClickUnitTab(unit)}
                  key={i}
                  label={unit.name}
                />
              ))}
          </AntTabs>
          <Divider style={{ marginTop: -2, paddingTop: 2 }} />
          <DefaultContainer>
            <FilterTab />
          </DefaultContainer>
        </div>
        <div className={classes.root}>
          <DefaultContainer>
            {!loadingExchanges &&
              dataExchanges.map((exchange, index) => (
                <CardExchangeReport
                  key={index}
                  openDetails={handleOpenDetails}
                  exchange={exchange}
                  statusType={statusType}
                />
              ))}
          </DefaultContainer>
          {!loadingExchanges && dataExchanges.length === 0 && (
            <div className={classes.container_no_results}>
              <Typography className={classes.no_results}>
                Sem resultados para essa data!
              </Typography>
            </div>
          )}
        </div>
        <div className={classes.container_pagination}>
          <ControlledPagination
            onChange={handlePageChange}
            total={totalExchanges}
            perPage={mainFilter?.per_page}
            loading={loadingExchanges}
          />
        </div>
        <DetailsProfessionalModal />
        <InputSearchModal />
        <FilterShiftsModal />
      </ExchangesPageContext.Provider>
    </Layout>
  );
}
