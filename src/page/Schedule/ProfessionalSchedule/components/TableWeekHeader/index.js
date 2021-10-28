import React, { useEffect, useState, useContext } from 'react';
import { useConfig } from 'hook/config';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import FiltersHeaderContent from 'shared/component/FiltersHeaderContent';
import CustomSelect from 'shared/component/forms/CustomSelect';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';
import '../../../../../shared/fixedtab.css';

function TableWeekHeader() {
  const { config } = useConfig();

  const {
    currentTab = 0,
    dataUnitAgenda,
    selectedUnit,
    findSelectedScale,
    scheduleJsonInLocal,
    findSelectedSchedule,
    scheduleInArray,
    selectedSchedule = null,
    setSelectedSchedule = () => {},
    handleChangeTab = () => {},
    handleClickUnitTab = () => {},
  } = useContext(ProfessionalSchedulePageContext);
  const [optionsScheduleHour, setOptionsScheduleHour] = useState([]);
  const mountInitialHours = (schedules) => {
    setOptionsScheduleHour([
      ...schedules.map((item, index) => ({
        value: index,
        id: index,
        label: `${item[0].hour_start} - ${item[0].hour_end}`,
        hour_start: item[0].hour_start,
        hour_end: item[0].hour_end,
      })),
    ]);
  };

  useEffect(() => {
    if (
      dataUnitAgenda &&
      dataUnitAgenda.length > 0 &&
      dataUnitAgenda[0] &&
      dataUnitAgenda[0][0] &&
      dataUnitAgenda[0][0].schedules &&
      dataUnitAgenda[0][0].schedules.length > 0 &&
      dataUnitAgenda[0][0].schedules[0][0]
    ) {
      mountInitialHours(dataUnitAgenda[0][0].schedules);
      const SCHEDULE_PERIOD = `${dataUnitAgenda[0][0].schedules[0][0].hour_start} - ${dataUnitAgenda[0][0].schedules[0][0].hour_end}`;

      if (
        (findSelectedSchedule === undefined || !selectedSchedule) &&
        findSelectedScale
      ) {
        setSelectedSchedule({
          value: 99,
          id: 99,
          label: SCHEDULE_PERIOD,
          hour_start: dataUnitAgenda[0][0].schedules[0][0].hour_start,
          hour_end: dataUnitAgenda[0][0].schedules[0][0].hour_end,
          unit: selectedUnit.id,
        });
      }
    } else {
      setOptionsScheduleHour([]);
    }
  }, [currentTab, dataUnitAgenda]);

  const changeLocalSchedule = (data) => {
    if (scheduleJsonInLocal === null) {
      scheduleInArray.push({ ...data, unit: selectedUnit.id });
      localStorage.setItem('selectedSchedule', JSON.stringify(scheduleInArray));
    }
    if (
      scheduleJsonInLocal &&
      scheduleJsonInLocal.length < 3 &&
      (!findSelectedSchedule || findSelectedSchedule === undefined)
    ) {
      scheduleInArray.push({ ...data, unit: selectedUnit.id });
      localStorage.setItem('selectedSchedule', JSON.stringify(scheduleInArray));
    }
    if (findSelectedSchedule) {
      scheduleInArray.splice(scheduleInArray.indexOf(findSelectedSchedule), 1);
      scheduleInArray.push({ ...data, unit: selectedUnit.id });
      localStorage.setItem('selectedSchedule', JSON.stringify(scheduleInArray));
    }
  };

  return (
    <div id="fixed-tab">
      <AntTabs
        value={currentTab}
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

      <FiltersHeaderContent
        currentContext={ProfessionalSchedulePageContext}
        buttonFilter={false}
        secondComponent={
          <div style={{ minWidth: 250, marginRight: config.open ? 300 : 120 }}>
            <CustomSelect
              name="schedule_hour"
              loading={false}
              placeholder="Selecione o horário"
              handleChange={(val) => {
                setSelectedSchedule({ ...val, unit: selectedUnit.id });
                changeLocalSchedule(val);
              }}
              value={selectedSchedule}
              options={optionsScheduleHour}
              isSlim
            />
          </div>
        }
        showSearchButton={false}
        onlyOneScale
      />
    </div>
  );
}

export default TableWeekHeader;
