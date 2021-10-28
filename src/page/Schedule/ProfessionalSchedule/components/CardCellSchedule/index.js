import React, { useContext, memo, useMemo } from 'react';
import CardTooltip from '../CardTooltip';
import { useStyles } from './styles';
import { formatPrice } from 'utils/formatPrice';
import SwitchSituation from 'shared/component/SwitchSituation';
import CardAddButton from '../CardAddButton';
import { Divider } from '@material-ui/core';
import { StatusSituationType } from 'utils/StatusSituationType';
import { ProfessionalSchedulePageContext } from 'page/Schedule/ProfessionalSchedule/index';
import moment from 'moment';
import HasPermission from 'utils/checkPermission';

const CardCellSchedule = ({
  index: indexScheduleMap,
  scaleData = {},
  schedule = {},
  agenda = [],
  completedDaysCalendar = [],
  permissions,
}) => {
  const classes = useStyles();

  const { selectedUnit = {}, handleOpenSchedule = () => {} } = useContext(
    ProfessionalSchedulePageContext
  );

  const verifyScheduleBelongsThisDay = (day, item) => {
    return (
      moment(day).format('YYYY-MM-DD') ===
      moment(item.date_start).format('YYYY-MM-DD')
    );
  };

  const memoizedValueQuantity = useMemo(() => {
    const quantityAgenda = agenda.filter(
      (element) =>
        !!completedDaysCalendar.find((day) =>
          verifyScheduleBelongsThisDay(day, element)
        )
    );
    return quantityAgenda.length > 0 ? 0 : 1;
  }, [agenda]);

  const formatHour = (hour) => moment(hour).format('HH:mm');

  return (
    <div data-cy="div_day_month" className={classes.container}>
      {agenda
        .filter(
          (element) =>
            !!completedDaysCalendar.find((day) =>
              verifyScheduleBelongsThisDay(day, element)
            )
        )
        .map((element, index) => (
          <div key={index} className={classes.day_cell}>
            <CardTooltip
              scaleData={scaleData}
              schedule={schedule}
              selectedUnit={selectedUnit}
              color={
                StatusSituationType(classes).find(
                  (situation) =>
                    situation.id ===
                    `${element?.situation}${element?.situation_status}`
                )?.color
              }
            >
              <div
                className={classes.div_controler}
                onClick={() => handleOpenSchedule({ item: element, scaleData })}
              >
                <SwitchSituation item={element} element={element} />
                <div className={classes.hour}>{`${formatHour(
                  element?.date_start
                )} - ${formatHour(element?.date_end)}`}</div>
                <Divider style={{ width: '95%' }} />
                {HasPermission(permissions.value) ? (
                  <div className={classes.value}>
                    {formatPrice(element?.price)}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </CardTooltip>
          </div>
        ))}
      {Array(memoizedValueQuantity)
        .fill()
        .map((element, i) => (
          <CardAddButton
            key={i}
            scaleData={scaleData}
            schedule={schedule}
            agenda={element?.agenda}
            index={indexScheduleMap}
            completedDaysCalendar={completedDaysCalendar}
          />
        ))}
    </div>
  );
};

export default memo(CardCellSchedule);
