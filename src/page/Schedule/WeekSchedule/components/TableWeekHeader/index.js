import React, { useContext } from 'react';
import { ScheduleWeekPageContext } from 'page/Schedule/WeekSchedule/index';
import { useConfig } from 'hook/config';
import FilterTab from 'shared/component/filterTab';
import { AntTab, AntTabs } from 'shared/component/TabsComponents';
import { TableWeekHeaderContent } from './styles';
import '../../../../../shared/fixedtab.css';

function TableWeekHeader() {
  const { config } = useConfig();

  const {
    currentTab = 0,
    handleChangeTab = () => {},
    handleClickUnitTab = () => {},
  } = useContext(ScheduleWeekPageContext);
  return (
    <div id="fixed-tab">
      <AntTabs
        value={currentTab.value}
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

      <TableWeekHeaderContent>
        <FilterTab
          type="localScales"
          defaultContext={ScheduleWeekPageContext}
          showSearchButton={false}
          titleFilter="Escalas"
        />
      </TableWeekHeaderContent>
    </div>
  );
}

export default TableWeekHeader;
