import React, { useEffect, useState } from 'react';
import { useStyles, AntTab, AntTabs, SearchContainer } from './styles';
import {
  Divider,
  CircularProgress,
  Typography,
  Icon,
  IconButton,
} from '@material-ui/core';
import Tabs from 'shared/component/tabPanel';
import InputModal from 'shared/component/inputModal';
import FilterShiftsModal from './components/filterScaleDay';
import ScaleCard from 'shared/component/scaleCard';
import { useConfig } from 'hook/config';
import { icons } from 'asset';
import { useLocation } from 'react-router-dom';
import useShifts from 'hook/shifts';
import ModalProfessionalScaleDay from './components/modalProfessionalScaleDay';
import moment from 'moment';
import Layout from 'shared/component/Layout';
import ChipFilter from './components/chipFilter';
import ControlledPagination from 'shared/component/ControledPagination';
import usePersistedState from 'hook/usePersistedState';
import '../../shared/fixedtab.css';

export default function SpecificScalePage() {
  const dateObj = new Date();
  const day = moment(dateObj).format('YYYY-MM-DD');
  const { config } = useConfig();
  const { getAllShifts, shifts } = useShifts();
  const { dataShifts, loadingShifts, totalShifts } = shifts;
  const [searchModal, setSearchModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filterType, setFilterType] = useState('universal');
  const [selectedScaleList, setSelectedScaleList] = useState([]);

  const [prevState, setPrevState] = usePersistedState('plantaoextra@dayScale', {
    value: 0,
    page: 1,
    perPage: 10,
    unitId: config.hospitalData.length > 0 ? config.hospitalData[0].id : '',
    openDetails: false,
    details: '',
    search: '',
  });

  const [localState, setLocalState] = usePersistedState(
    'plantaoextra@dayScale',
    {
      value: prevState && prevState?.value ? prevState?.value : 0,
      page: 1,
      perPage: 12,
      unitId:
        prevState && prevState?.unitId
          ? prevState?.unitId
          : config.hospitalData[0].id,
      openDetails: false,
      details: '',
      search: '',
    }
  );
  const { value, page, perPage, unitId, details, openDetails, search } =
    localState;
  const abas = config.hospitalData.map((item) => ({
    name: item.name,
    id: item.id,
  }));
  const [request, setRequest] = React.useState(false);
  const [date, setDate] = React.useState(day);
  const { state } = useLocation();
  let situation_status, _filter;
  const [receivedDate, setReceivedDate] = React.useState('');
  if (state) {
    situation_status = state.situation_status;
    _filter = state.filter;
  }
  useEffect(() => {
    if (state?.date) {
      setRequest(true);
      setReceivedDate(state.date);
    } else {
      setTimeout(() => {
        setRequest(true);
      }, 1000);
    }
  }, [state?.date]);

  const [selectedSituationStatusList, setSelectedSituationStatusList] =
    useState(situation_status || []);

  React.useEffect(() => {
    request &&
      getAllShifts({
        page,
        perPage,
        search,
        unitId,
        dateStart: receivedDate ? receivedDate : date,
        dateEnd: receivedDate ? receivedDate : date,
        filter: _filter || filterType,
        scaleId: selectedScaleList,
        situationStatus: selectedSituationStatusList,
      });
  }, [
    unitId,
    filterType,
    date,
    receivedDate,
    search,
    page,
    selectedScaleList,
    selectedSituationStatusList,
    localState,
  ]);
  const handleOpenDetails = (id) => {
    setLocalState({
      ...localState,
      openDetails: true,
      details: dataShifts.find((item) => item.agenda_id === id),
    });
  };
  const handleCloseDetails = () => {
    setLocalState({ ...localState, openDetails: false, open: false });
  };
  const openFilterModal = () => {
    setFilterModal(!filterModal);
  };
  const openSearchModal = () => {
    setSearchModal(!searchModal);
  };
  const handleChange = (event, newValue) => {
    setLocalState({
      ...localState,
      value: newValue,
      page: 1,
      unitId:
        config.hospitalData.length > 0 && config.hospitalData[newValue].id,
      search: '',
    });
    setPrevState((old) => ({
      ...old,
      value: newValue,
      unitId:
        config.hospitalData.length > 0 && config.hospitalData[newValue].id,
    }));
  };
  const handleChangePage = (newPage) => {
    setLocalState({ ...localState, page: newPage });
  };

  const onChangeShifts = (e) => {
    setLocalState({ ...localState, search: e, page: 1 });
  };
  React.useEffect(() => {
    if (
      selectedSituationStatusList.length === 0 &&
      selectedScaleList.length === 0
    ) {
      setFilterType('universal');
    }
  }, [selectedSituationStatusList, selectedScaleList]);

  const handleDateChange = ({ formated_date }) => {
    setDate({ formated_date });
    setReceivedDate(formated_date);
  };

  const selectedArrays = [...selectedScaleList, ...selectedSituationStatusList];
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

  const classes = useStyles();
  useEffect(() => {
    if (config.hospitalData) {
      setPrevState({
        value: 0,
        page: 1,
        perPage: 12,
        unitId: config.hospitalData.length > 0 ? config.hospitalData[0].id : '',
        openDetails: false,
        details: '',
        search: '',
      });
    }
  }, [config]);
  return (
    <div className={classes.root}>
      <Layout
        title="Escala do dia"
        backArrow={true}
        handleDateChange={handleDateChange}
        calendarWeek={false}
        isLoading={false}
      >
        {config.hospitalData.length > 0 && (
          <div id="fixed-tab">
            <div className={classes.inputContainer}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={openSearchModal}>
                  <Icon>search</Icon>
                </IconButton>
                <IconButton onClick={openFilterModal}>
                  <img src={icons.filter} style={{ width: 26 }} />
                </IconButton>
                {selectedArrays &&
                  selectedArrays.length > 0 &&
                  selectedArrays.map(
                    (filter) =>
                      filter !== undefined && (
                        <ChipFilter
                          key={filter?.id}
                          name={filter?.name}
                          id={filter?.id}
                          itemLength={Object.keys(filter).length}
                          onClick={removeFilter}
                        />
                      )
                  )}
              </div>
              <SearchContainer>
                <InputModal
                  placeholder="Busque por profissionais"
                  handleClose={openSearchModal}
                  open={searchModal}
                  onchange={onChangeShifts}
                />
              </SearchContainer>
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

            <AntTabs
              value={value}
              onChange={handleChange}
              aria-label="ant example"
            >
              {abas.map((option, i) => (
                <AntTab key={i} label={option.name} />
              ))}
            </AntTabs>
            <Divider style={{ marginTop: -2, paddingTop: 2 }} />
          </div>
        )}
        {loadingShifts && config.hospitalData.length > 0 && (
          <div className={classes.progressContainer}>
            <CircularProgress
              style={{
                color: '#24B8EC',
              }}
              size={90}
            />
          </div>
        )}
        {!loadingShifts &&
          dataShifts.length === 0 &&
          config.hospitalData.length > 0 && (
            <div className={classes.messageContainer}>
              <Icon style={{ fontSize: 100, color: '#D8D8DA' }}>
                content_paste
              </Icon>
              <Typography className={classes.emptyMessage}>
                Não há plantões definidos <br /> para este hospital
              </Typography>
            </div>
          )}
        {config.hospitalData.length === 0 && (
          <div className={classes.messageContainer}>
            <Typography className={classes.emptyMessage}>
              Por favor, volte ao início e selecione um hospital
            </Typography>
          </div>
        )}
        <Tabs value={value} index={0}>
          <div
            data-cy="div_cards_professionals_scale"
            className={classes.rowContainer}
          >
            {dataShifts.length > 0 &&
              !loadingShifts &&
              dataShifts.map((item) => (
                <ScaleCard
                  key={item.agenda_id}
                  id={item.agenda_id}
                  avatar={item.user.image}
                  title={item.user.name}
                  situation={item.situation}
                  situationStatus={item.situation_status}
                  group={item.user.group.name}
                  company={
                    config.hospitalData[0] &&
                    config.hospitalData[0].company.name
                  }
                  schedule={item.scale.name}
                  dateStart={
                    item.status === 14 ||
                    item.status === 34 ||
                    item.status === 13 ||
                    item.status === 33
                      ? item && item.check_in
                      : item && item.scale && item.scale.date_start
                  }
                  dateEnd={
                    item.status === 14 || item.status === 34
                      ? item && item.check_out
                      : item && item.scale && item.scale.date_end
                  }
                  openDetails={handleOpenDetails}
                />
              ))}
          </div>
          {openDetails && (
            <ModalProfessionalScaleDay
              user={localState.details}
              openDetails={openDetails}
              details={details}
              handleCloseDetails={handleCloseDetails}
              company={
                config.hospitalData[0] && config.hospitalData[0].company.name
              }
            />
          )}
        </Tabs>
        <Tabs value={value} index={1}>
          <div className={classes.rowContainer}>
            {value === 1 &&
              dataShifts.length > 0 &&
              !loadingShifts &&
              dataShifts.map((item) => (
                <ScaleCard
                  key={item.user.id}
                  id={item.agenda_id}
                  avatar={item.user.image}
                  title={item.user.name}
                  situation={item.situation}
                  situationStatus={item.situation_status}
                  group={item.user.group.name}
                  company={
                    config.hospitalData[1] &&
                    config.hospitalData[1].company.name
                  }
                  schedule={item.scale.name}
                  dateStart={item.scale.date_start}
                  dateEnd={item.scale.date_end}
                  openDetails={handleOpenDetails}
                />
              ))}
          </div>
          {openDetails && (
            <ModalProfessionalScaleDay
              user={localState.details}
              openDetails={openDetails}
              details={details}
              handleCloseDetails={handleCloseDetails}
              company={
                config.hospitalData[1] && config.hospitalData[1].company.name
              }
            />
          )}
        </Tabs>
        <Tabs value={value} index={2}>
          <div className={classes.rowContainer}>
            {dataShifts.length > 0 &&
              !loadingShifts &&
              dataShifts.map((item) => (
                <ScaleCard
                  key={item.user.id}
                  id={item.agenda_id}
                  avatar={item.user.image}
                  title={item.user.name}
                  situation={item.situation}
                  situationStatus={item.situation_status}
                  group={item.user.group.name}
                  company={
                    config.hospitalData[2] &&
                    config.hospitalData[2].company.name
                  }
                  schedule={item.scale.name}
                  dateStart={item.scale.date_start}
                  dateEnd={item.scale.date_end}
                  openDetails={handleOpenDetails}
                />
              ))}
          </div>
          {openDetails && (
            <ModalProfessionalScaleDay
              user={localState.details}
              openDetails={openDetails}
              details={details}
              handleCloseDetails={handleCloseDetails}
              company={
                config.hospitalData[2] && config.hospitalData[2].company.name
              }
            />
          )}
        </Tabs>

        <Divider style={{ width: '100%' }} />
        <div className={classes.pageContainer}>
          <ControlledPagination
            className={classes.pageButton}
            total={totalShifts}
            pageByProps={page}
            perPage={perPage}
            loading={loadingShifts}
            onChange={handleChangePage}
          />
        </div>
      </Layout>
    </div>
  );
}
