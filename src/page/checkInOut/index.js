import { useConfig } from 'hook/config';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DefaultCardTable from 'shared/component/defaultCardTable';
import Layout from 'shared/component/Layout';
import useStyles from './styles';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import { Divider, Icon, IconButton } from '@material-ui/core';
import CardCheckInOut from 'shared/component/cardCheckInOut';
import { icons } from 'asset';
import InputModal from 'shared/component/inputModal';
import ChipFilter from './components/ChipFilter';
import FilterShiftsModal from './components/filterCheckInOut';
import useReport from 'hook/report';
import ModalDetails from './components/modalDetails';
import usePersistedState from 'hook/usePersistedState';
import '../../shared/fixedtab.css';

const CheckInOutContext = React.createContext('CheckInOut');

const CheckInOut = () => {
  const classes = useStyles();
  const { config } = useConfig();
  const { reportsCheck, getCheckInReports } = useReport();
  const { data, pagination, loadingCheckReports } = reportsCheck;
  const [searchModal, setSearchModal] = useState(false);
  const [currentTab, setCurrentTab] = usePersistedState(
    'plantaoextra@checkiTab',
    {
      value: 0,
    }
  );
  const [filterModal, setFilterModal] = useState(false);
  const [filterType, setFilterType] = useState('universal');
  const [selectedScaleList, setSelectedScaleList] = useState([]);
  const [selectedSituationStatusList, setSelectedSituationStatusList] =
    useState([]);
  const [modal, setModal] = useState({
    openDetails: false,
  });
  const { openDetails } = modal;
  const [reportsFilter, setReportsFilter] = usePersistedState(
    'plantaoextra@checkinDetails',
    {
      page: 1,
      perPage: 12,
      search: '',
      details: '',
      unitId: config.hospitalData.length > 0 ? config.hospitalData[0].id : null,
    }
  );
  const { page, perPage, search, unitId, details } = reportsFilter;

  const localDate = localStorage.getItem('calendarDayPiker');
  const dateObj = new Date();
  const day = moment(dateObj).format('YYYY-MM-DD');
  const [date, setDate] = React.useState(localDate ? localDate : day);
  const handleDateChange = ({ formated_date }) => {
    setDate({ formated_date });
  };
  const selectedArrays = [...selectedScaleList, ...selectedSituationStatusList];

  const onChangeShifts = (e) => {
    setReportsFilter({ ...reportsFilter, search: e, page: 1 });
  };
  const debounce = function (fn, d) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    };
  };
  const debounceForData = debounce(onChangeShifts, 500);
  React.useEffect(() => {
    if (selectedSituationStatusList.length === 0) {
      setFilterType('universal');
    }
  }, [selectedSituationStatusList, data]);

  const handleChangePage = (page) => {
    setReportsFilter({ ...reportsFilter, page });
  };
  const handleChangeTab = (event, newValue) => {
    setCurrentTab({ ...currentTab, value: newValue });
  };
  const openSearchModal = () => {
    setSearchModal(!searchModal);
  };
  const openFilterModal = () => {
    setFilterModal(!filterModal);
  };
  const handleChangeUnit = (unit) => {
    setSelectedSituationStatusList([]);
    setSelectedScaleList([]);
    setReportsFilter({
      ...reportsFilter,
      unitId: unit.id,
      search: '',
      page: 1,
    });
  };

  useEffect(() => {
    getCheckInReports({
      page,
      perPage,
      search,
      unitId,
      dateStart: date.formated_date,
      dateEnd: date.formated_date,
      situationStatus: selectedSituationStatusList,
      scaleId: selectedScaleList,
      filter: filterType,
    });
  }, [
    reportsFilter,
    selectedScaleList,
    selectedSituationStatusList,
    filterType,
    date,
  ]);

  const abas = config.hospitalData.map((item) => ({
    name: item.name,
    id: item.id,
  }));

  const contextValue = {
    // stateScales: ,
  };
  const removeFilter = (removedFilter, itemLength) => {
    if (itemLength > 3) {
      const newScaleList =
        selectedScaleList.length > 0 &&
        selectedScaleList.filter((scale) => scale.id !== removedFilter);
      setSelectedScaleList(newScaleList);
    } else {
      const newSituationStatusList =
        selectedSituationStatusList.length > 0 &&
        selectedSituationStatusList.filter(
          (situationStatus) => situationStatus.id !== removedFilter
        );
      setSelectedSituationStatusList(newSituationStatusList);
    }
  };
  const handleOpenDetails = (id) => {
    setModal({ ...modal, openDetails: true });
    setReportsFilter({
      ...reportsFilter,
      details: data.find((item) => item.user.id === id),
    });
  };
  const handleCloseDetails = () => {
    setModal({
      ...modal,
      openDetails: false,
    });
  };

  return (
    <Layout
      title="Check-in/Check-out"
      calendarWeek={false}
      isLoading={loadingCheckReports}
      backArrow
      handleDateChange={handleDateChange}
    >
      <CheckInOutContext.Provider value={contextValue}>
        <div id="fixed-tab">
          <AntTabs
            onChange={handleChangeTab}
            value={currentTab.value}
            aria-label="ant example"
          >
            {abas.map((option, i) => (
              <AntTab
                key={i}
                onClick={() => handleChangeUnit(option)}
                label={option.name}
              />
            ))}
          </AntTabs>
          <Divider style={{ marginBottom: 24, paddingTop: 2 }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={openSearchModal}>
              <Icon>search</Icon>
            </IconButton>
            <IconButton onClick={openFilterModal}>
              <img src={icons.filter} style={{ width: 26 }} />
            </IconButton>
            {selectedArrays &&
              selectedArrays.length > 0 &&
              selectedArrays.map((filter) => (
                <ChipFilter
                  key={filter.id}
                  name={filter.name}
                  id={filter.id}
                  itemLength={Object.keys(filter).length}
                  onClick={removeFilter}
                />
              ))}
          </div>
        </div>
        <div className={classes.root}>
          <div>
            <InputModal
              value={search}
              placeholder="Busque por profissionais"
              handleClose={openSearchModal}
              open={searchModal}
              onchange={debounceForData}
            />
            <FilterShiftsModal
              openFilter={filterModal}
              handleClose={openFilterModal}
              filterModal={filterModal}
              setSelectedScaleList={setSelectedScaleList}
              selectedScaleList={selectedScaleList}
              selectedSituationStatusList={selectedSituationStatusList}
              setSelectedSituationStatusList={setSelectedSituationStatusList}
              setFilterModal={setFilterModal}
              setFilterType={setFilterType}
              unitId={unitId}
              dateStart={date}
            />
          </div>
          <div className={classes.pagination_control}>
            <DefaultCardTable
              dataList={data}
              renderItem={({ item }) => (
                <CardCheckInOut
                  item={item}
                  openDetails={handleOpenDetails}
                  id={item.user.id}
                />
              )}
              loading={false}
              deleteLoading={false}
              totalList={pagination}
              page={page}
              perPage={perPage}
              redirectTo="/inicio"
              showExportButton={false}
              handleChangePage={handleChangePage}
              cellHeight="auto"
              nCols={3}
              spacing={40}
            />
          </div>
          {openDetails && (
            <ModalDetails
              item={reportsFilter.details}
              unitId={reportsFilter.unitId}
              dateStart={date}
              dateEnd={date}
              openDetails={openDetails}
              details={details}
              handleCloseDetails={handleCloseDetails}
              company={
                config.hospitalData[0] && config.hospitalData[0].company.name
              }
            />
          )}
        </div>
      </CheckInOutContext.Provider>
    </Layout>
  );
};

export default CheckInOut;
