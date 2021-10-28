import React, { useEffect, useState, createContext, useCallback } from 'react';
import { TableLegend } from '../../../shared/component/TableLegend';
import ModalProfessionalSchedule from './components/ModalProfessionalSchedule';
import ModalScheduleCreate from './components/ModalScheduleCreate';
import TableWeekHeader from './components/TableWeekHeader';
import TableWeekContent from './components/TableWeekContent';
import Layout from 'shared/component/Layout';
import InputSearchModal from 'shared/component/inputSearchModal';
import FilterShiftsModal from 'shared/component/FilterShiftsModal';
import { updateCheckboxStatus } from 'utils/updateCheckboxStatus';
import { Typography, CircularProgress } from '@material-ui/core';
import { styles } from './styles';
import { useUnitScales } from 'hook/unitScales';
import { useConfig } from 'hook/config';
import { useAgenda } from 'hook/agenda';
import { useAgendaDetails } from 'hook/agenda/details';
import ControlledPagination from 'shared/component/ControledPagination';
import usePersistedState from 'hook/usePersistedState';
import { useAgendaValuePrice } from 'hook/agenda/value_price';

import moment from 'moment';

export const ScheduleWeekPageContext = createContext({});

function WeekSchedule() {
  const classes = styles();
  const { config } = useConfig();

  const permissions = {
    read: 'schedule/r',
    create: 'schedule/c',
    delete: 'schedule/d',
    update: 'schedule/u',
    validate: 'schedule/validate',
    export: 'schedule/export',
    changeProfessional: 'schedule/change-professional',
    value: 'scheduleValue/r',
  };

  const {
    loading: loadingUnitScales,
    data: dataUnitScales,
    total: totalUnitScales,
    getUnitScales,
  } = useUnitScales();

  const {
    loading: loadingAgenda,
    data: dataUnitAgenda,
    total: totalAgenda,
    getAgenda,
    createAgenda,
  } = useAgenda();

  const {
    data: agendaDetails,
    loading: loadingAgendaDetails,
    setData: setAgendaDetailsData,
    getAgendaDetails,
  } = useAgendaDetails();
  const { data: dataValue, getAgendaValuePrice } = useAgendaValuePrice();

  const scaleLocal = localStorage && localStorage.getItem('selectedScale');
  const scaleJsonInLocal =
    localStorage.getItem('selectedScale') && JSON.parse(scaleLocal);
  const scaleInArray = scaleJsonInLocal ? scaleJsonInLocal : [];

  const [openModalScheduleCall, setOpenModalScheduleCall] = useState(false);
  const [openModalSchedule, setOpenModalSchedule] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const selectedLocalUnit = localStorage.getItem('selectedLocalUnit');
  const parseSelectedUnit = selectedLocalUnit && JSON.parse(selectedLocalUnit);
  const [selectedUnit, setSelectedUnit] = useState(
    parseSelectedUnit ? parseSelectedUnit : null
  );
  const [stateScales, setStateScales] = useState(scaleInArray);
  const [detailsSchedule, setDetailsSchedule] = useState(null);
  const [currentTab, setCurrentTab] = usePersistedState(
    'plantaoextra@tabshopital',
    {
      value: 0,
    }
  );

  const findSelectedScale =
    selectedUnit && scaleInArray.find((item) => item.unit === selectedUnit.id);

  const firstWeekDay = moment().day(1);
  const lastWeekDay = moment().day(7);
  const initialMainFilter = {
    date_start: moment(firstWeekDay).format('YYYY-MM-DD'),
    date_end: moment(lastWeekDay).format('YYYY-MM-DD'),
    unit_id: selectedUnit ? selectedUnit.id : '',
    scale_id: findSelectedScale ? findSelectedScale.value : null,
    page: 1,
    search: '',
  };

  const [mainFilter, setMainFilter] = useState(initialMainFilter);
  useEffect(() => {
    !mainFilter?.scale_id &&
      mainFilter?.unit_id &&
      setMainFilter(initialMainFilter);
  }, [mainFilter?.unit_id]);
  const [localScales, setLocalScales] = React.useState('');

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleOpenSearchModal = () => {
    setOpenSearchModal(true);
  };

  const handleCloseSearchModal = () => {
    setOpenSearchModal(false);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handlePageChange = (page) => {
    setMainFilter((oldState) => ({
      ...oldState,
      page,
    }));
  };

  const handleCloseChipScale = (filterDelete) => () => {
    scaleInArray.splice(scaleInArray.indexOf(filterDelete), 1);
    localStorage.setItem('selectedScale', JSON.stringify(scaleInArray));
    const newArray = updateCheckboxStatus(filterDelete.id, false, stateScales);
    setStateScales(newArray);
    setMainFilter({ ...mainFilter, scale_id: '' });
  };

  const handleChangeTab = (event, newTab) => {
    setCurrentTab({ ...currentTab, value: newTab });
  };

  const handleClickUnitTab = (unit) => {
    localStorage.setItem('selectedLocalUnit', JSON.stringify(unit));
    const { id } = unit;
    getUnitScales(id, { page: 1, per_page: 20 });
    setSelectedUnit(unit);
    const findSelectedScale =
      selectedUnit && scaleInArray.find((item) => item.unit === unit.id);
    setMainFilter((old) => ({
      ...old,
      scale_id:
        findSelectedScale && findSelectedScale !== undefined
          ? findSelectedScale.value
          : null,
      unit_id: id,
    }));
  };

  const handleOpenModalScheduleCall = ({
    scaleData,
    schedule,
    selected_schedule,
    agenda,
    daySelected,
  }) => {
    setOpenModalScheduleCall(true);
    setDetailsSchedule({
      schedule,
      selected_schedule,
      agenda,
      scaleData,
      daySelected,
    });
  };

  const handleCloseModalScheduleCall = () => {
    setOpenModalScheduleCall(false);
  };

  const handleDateChange = ({ date_start, date_end }) => {
    localStorage.setItem(
      'scheduleWeekDate',
      JSON.stringify({ date_start, date_end })
    );
    setMainFilter((oldState) => ({
      ...oldState,
      date_start,
      date_end,
    }));
  };

  const handleGetAgenda = () => {
    const { unit_id, date_start, date_end } = mainFilter;
    if (!openFilter && unit_id && date_start && date_end)
      getAgenda({ ...mainFilter, scale_name: null });
  };

  const setConfigsProps = () => {
    const firstUnitOnConfig = config?.hospitalData[currentTab.value];
    if (config?.hospitalData && !selectedUnit) {
      setSelectedUnit(firstUnitOnConfig);
      setMainFilter((oldState) => ({
        ...oldState,
        unit_id: firstUnitOnConfig?.id,
      }));
      getUnitScales(firstUnitOnConfig?.id);
    }
  };

  const handleOpenSchedule = useCallback(({ item, scaleData }) => {
    setOpenModalSchedule(true);
    getAgendaDetails({ agenda_id: item?.id });
    getAgendaValuePrice({ agenda_id: item?.id });
    setDetailsSchedule({
      ...item,
      scaleData,
    });
  }, []);

  useEffect(() => {
    handleGetAgenda();
  }, [mainFilter, openFilter]);
  useEffect(setConfigsProps, [config]);
  useEffect(() => {
    !mainFilter?.scale_id && setOpenFilter(true);
  }, [currentTab, findSelectedScale]);
  useEffect(() => {
    if (config.hospitalData.length <= 2) {
      setCurrentTab({
        value: 0,
      });
      handleClickUnitTab(config.hospitalData[0]);
    }
  }, [config]);

  let schedule = useState(JSON.parse(localStorage.getItem('selectedScale')));
  if (schedule[0] == null || schedule[0].length === 0) {
    schedule = false;
  } else {
    schedule = true;
  }

  return (
    <Layout
      handleDateChange={handleDateChange}
      title="Agenda da semana"
      backArrow
    >
      <ScheduleWeekPageContext.Provider
        value={{
          localScales,
          setLocalScales,
          scaleInArray,
          findSelectedScale,
          scaleJsonInLocal,
          dataUnitAgenda,
          openModalSchedule,
          openModalScheduleCall,
          currentTab,
          stateScales,
          mainFilter,
          openSearchModal,
          dataUnitScales,
          openFilter,
          intialMainFilter: initialMainFilter,
          loadingUnitScales,
          totalUnitScales,
          selectedUnit,
          detailsSchedule,
          agendaDetails,
          dataValue,
          loadingAgendaDetails,
          setAgendaDetailsData,
          handleGetAgenda,
          handleOpenSchedule,
          getAgendaDetails,
          getUnitScales,
          createAgenda,
          getAgenda,
          handleCloseModalScheduleCall,
          handleCloseFilter,
          setStateScales,
          setMainFilter,
          handleCloseSearchModal,
          handleOpenSearchModal,
          handleOpenFilter,
          handleCloseChipScale,
          handleChangeTab,
          handleClickUnitTab,
          handleOpenModalScheduleCall,
          setOpenModalSchedule,
        }}
      >
        <TableWeekHeader />
        {loadingAgenda && (
          <div style={{ textAlign: 'center', marginTop: '21%' }}>
            <CircularProgress color="primary" size={120} />
          </div>
        )}
        {mainFilter?.scale_id &&
          !loadingAgenda &&
          dataUnitAgenda &&
          dataUnitAgenda.length > 0 &&
          dataUnitAgenda.map((data, index) => (
            <TableWeekContent
              permissions={permissions}
              key={index}
              data={data}
            />
          ))}
        {!findSelectedScale && !loadingAgenda && (
          <div className={classes.container_no_results}>
            <Typography className={classes.no_results}>
              Selecione uma escala!
            </Typography>
          </div>
        )}
        {findSelectedScale && !loadingAgenda && dataUnitAgenda.length === 0 && (
          <div className={classes.container_no_results}>
            <Typography className={classes.no_results}>
              Sem resultados para essa Escala ou data!
            </Typography>
          </div>
        )}
        {mainFilter?.scale_id &&
          !loadingAgenda &&
          dataUnitAgenda.length > 0 && <TableLegend />}
        <div className={classes.container_pagination}>
          <ControlledPagination
            onChange={handlePageChange}
            total={totalAgenda}
            perPage={mainFilter?.per_page}
            loading={loadingAgenda}
          />
        </div>
        <ModalProfessionalSchedule permissions={permissions} />
        <ModalScheduleCreate />
        <InputSearchModal currentContext={ScheduleWeekPageContext} />
        <FilterShiftsModal
          open={!!dataUnitAgenda.length}
          currentContext={ScheduleWeekPageContext}
          onlyOneScale
          buttonFilter
          buttonDuplicate
        />
      </ScheduleWeekPageContext.Provider>
    </Layout>
  );
}

export default WeekSchedule;
