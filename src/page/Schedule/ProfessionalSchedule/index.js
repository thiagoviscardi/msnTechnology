import React, { useEffect, useState, createContext, useCallback } from 'react';
import { TableLegend } from 'shared/component/TableLegend';
import Layout from 'shared/component/Layout';
import { updateCheckboxStatus } from 'utils/updateCheckboxStatus';
import ModalScheduleCreate from './components/ModalScheduleCreate';
import ModalProfessionalSchedule from './components/ModalProfessionalSchedule';
import TableWeekHeader from './components/TableWeekHeader';
import { useParams } from 'react-router-dom';
import { useUnitScales } from 'hook/unitScales';
import { useConfig } from 'hook/config';
import { useProfessional } from 'hook/professional/index';
import { useAgenda } from 'hook/agenda';
import { useAgendaDetails } from 'hook/agenda/details';
import GridProfessionalSchedule from './components/GridProfessionalSchedule';
import moment from 'moment';

export const ProfessionalSchedulePageContext = createContext({});

function ProfessionalSchedule() {
  const { config } = useConfig();
  const { id } = useParams();

  const {
    loading: loadingUnitScales,
    data: dataUnitScales,
    total: totalUnitScales,
    getUnitScales,
  } = useUnitScales();

  const {
    loading: loadingAgenda,
    data: dataUnitAgenda,
    setData,
    getAgenda,
    createAgenda,
  } = useAgenda();

  const {
    data: agendaDetails,
    loading: loadingAgendaDetails,
    setData: setAgendaDetailsData,
    getAgendaDetails,
    getDetailsSimpleCard,
  } = useAgendaDetails();
  const { getOne: getOneProfessional } = useProfessional();

  const [openModalScheduleCall, setOpenModalScheduleCall] = useState(false);
  const [openModalSchedule, setOpenModalSchedule] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const selectedLocalUnit = localStorage.getItem('selectedUnitProfSchedule');
  const parseSelectedUnit = selectedLocalUnit && JSON.parse(selectedLocalUnit);
  const [selectedUnit, setSelectedUnit] = useState(
    parseSelectedUnit ? parseSelectedUnit : null
  );
  const [stateScales, setStateScales] = useState([]);
  const [detailsSchedule, setDetailsSchedule] = useState(null);
  const localHospTab = localStorage.getItem('hospTabSelected');
  const parseHospTab = localHospTab && JSON.parse(localHospTab);
  const [currentTab, setCurrentTab] = useState(parseHospTab ? parseHospTab : 0);
  const scheduleLocal =
    localStorage && localStorage.getItem('selectedSchedule');
  const scheduleJsonInLocal =
    localStorage.getItem('selectedScale') && JSON.parse(scheduleLocal);
  const scheduleInArray = scheduleJsonInLocal ? scheduleJsonInLocal : [];
  const [selectedSchedule, setSelectedSchedule] = useState('');

  const findSelectedSchedule =
    selectedUnit &&
    scheduleInArray.find((item) => item.unit === selectedUnit.id);

  const scaleLocal = localStorage && localStorage.getItem('selectedScale');
  const scaleJsonInLocal =
    localStorage.getItem('selectedScale') && JSON.parse(scaleLocal);
  const scaleInArray = scaleJsonInLocal ? scaleJsonInLocal : [];
  const findSelectedScale =
    selectedUnit && scaleInArray.find((item) => item.unit === selectedUnit.id);

  useEffect(() => {
    findSelectedSchedule !== undefined && findSelectedScale
      ? setSelectedSchedule(findSelectedSchedule)
      : setSelectedSchedule('');
  }, [currentTab]);

  const [weeksInMonth, setweeksInMonth] = useState(null);
  const [completedDaysCalendar, setCompletedDaysCalendar] = useState([]);

  const initialMainFilter = {
    date_start: null,
    date_end: null,
    unit_id: selectedUnit ? selectedUnit.id : '',
    scale_id: findSelectedScale ? findSelectedScale.value : null,
    page: 1,
    // per_page: 24,
    search: '',
    user_id: id,
  };

  const [mainFilter, setMainFilter] = useState(initialMainFilter);
  useEffect(() => {
    !mainFilter?.scale_id &&
      findSelectedScale &&
      mainFilter?.unit_id &&
      setMainFilter({ ...mainFilter, scale_id: findSelectedScale.value });
  }, [mainFilter?.unit_id]);
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

  const handleCloseChipScale = (filterDelete) => () => {
    setData('');
    setSelectedSchedule('');
    scaleInArray.splice(scaleInArray.indexOf(filterDelete), 1);
    localStorage.setItem('selectedScale', JSON.stringify(scaleInArray));
    const newArray = updateCheckboxStatus(filterDelete.id, false, stateScales);
    setStateScales(newArray);
    setMainFilter({ ...mainFilter, scale_id: null });
  };

  const handleChangeTab = (event, newTab) => {
    setData('');
    // setSelectedSchedule('');
    setCurrentTab(newTab);
    localStorage.setItem('hospTabSelected', JSON.stringify(newTab));
  };

  const handleClickUnitTab = (unit) => {
    localStorage.setItem('selectedUnitProfSchedule', JSON.stringify(unit));
    const { id } = unit;
    getUnitScales(id, { page: 1, per_page: 20 });
    setSelectedUnit(unit);
    setMainFilter((old) => ({
      ...old,
      unit_id: id,
      scale_id: null,
      scale_name: null,
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

  const getDaysIntervalWeek = (daysMonth) => {
    var i,
      j,
      chunk = 7;
    const temporary = [];
    for (i = 0, j = daysMonth.length; i < j; i += chunk) {
      temporary.push(daysMonth.slice(i, i + chunk));
    }
    setCompletedDaysCalendar(temporary);
  };

  const handleDateChange = ({
    date_start,
    date_end,
    weeksInMonth,
    completedDaysCalendar,
  }) => {
    setweeksInMonth(weeksInMonth);
    getDaysIntervalWeek(completedDaysCalendar);
    setMainFilter((oldState) => ({
      ...oldState,
      date_start,
      date_end,
    }));
  };

  const handleGetAgenda = () => {
    const { unit_id, date_start, date_end, scale_id } = mainFilter;
    if (unit_id && date_start && date_end && scale_id)
      getAgenda({ ...mainFilter, scale_name: null });
  };

  const setConfigsProps = () => {
    const firstUnitOnConfig = selectedUnit
      ? selectedUnit
      : config?.hospitalData[0];

    if (config?.hospitalData && !selectedUnit) {
      setSelectedUnit(firstUnitOnConfig);
      setMainFilter((oldState) => ({
        ...oldState,
        unit_id: firstUnitOnConfig?.id,
      }));
      getUnitScales(firstUnitOnConfig?.id);
    }
  };

  const verifyIsPast = (item) => {
    const dateCard = item?.date_start;
    const today = moment();
    return moment(dateCard).diff(today, 'days') < 0;
  };

  const handleOpenSchedule = useCallback(({ item, scaleData }) => {
    if (!verifyIsPast(item)) setOpenModalSchedule(true);
    getAgendaDetails({ agenda_id: item?.id });
    setDetailsSchedule({
      ...item,
      scaleData,
    });
  }, []);

  const hasFirstIdAgenda = (data) => {
    try {
      const firstIdAgenda = data[0][0].agendas[0].id;
      return firstIdAgenda;
    } catch (err) {
      return false;
    }
  };

  const getFirstScheduleDetails = useCallback(() => {
    const firstIdAgenda = hasFirstIdAgenda(dataUnitAgenda);
    if (dataUnitAgenda.length > 0 && firstIdAgenda) {
      getAgendaDetails({ agenda_id: firstIdAgenda });
    } else {
      getOneProfessional({ id }).then((data) =>
        setAgendaDetailsData({
          user: { ...data },
          scale: { name: mainFilter?.scale_name || '' },
        })
      );
    }
  }, [dataUnitAgenda]);

  useEffect(setConfigsProps, [config]);
  useEffect(handleGetAgenda, [mainFilter, selectedUnit, currentTab]);
  useEffect(getFirstScheduleDetails, [dataUnitAgenda]);

  return (
    <Layout
      isLoading={loadingAgenda}
      handleDateChange={handleDateChange}
      title="Agenda do Profissional"
      calendarWeek={false}
      calendarMonth
      backArrow
    >
      <ProfessionalSchedulePageContext.Provider
        value={{
          scaleJsonInLocal,
          scaleInArray,
          scheduleJsonInLocal,
          scheduleInArray,
          findSelectedSchedule,
          findSelectedScale,
          dataUnitAgenda,
          openModalSchedule,
          openModalScheduleCall,
          currentTab,
          stateScales,
          mainFilter,
          openSearchModal,
          dataUnitScales,
          openFilter,
          initialMainFilter,
          loadingUnitScales,
          totalUnitScales,
          selectedUnit,
          detailsSchedule,
          agendaDetails,
          loadingAgendaDetails,
          loadingAgenda,
          selectedSchedule,
          weeksInMonth,
          completedDaysCalendar,
          getDetailsSimpleCard,
          setSelectedSchedule,
          setAgendaDetailsData,
          handleGetAgenda,
          handleOpenSchedule,
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
        <GridProfessionalSchedule />
        <ModalScheduleCreate />
        <ModalProfessionalSchedule />
        {!loadingAgenda && dataUnitAgenda.length > 0 && <TableLegend />}
      </ProfessionalSchedulePageContext.Provider>
    </Layout>
  );
}

export default ProfessionalSchedule;
