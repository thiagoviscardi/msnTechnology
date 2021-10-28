import React, { useEffect, useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { WeekPickerContainer, StyledTextField } from './styles';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import moment from 'moment';

function CalendarDayInput({
  selectedDays = [],
  blockedDays = [],
  yearMonth = {},
  disabled = false,
  setSelectedDays = () => {},
  onClick = () => {},
}) {
  const [selectedDay, setSelectedDay] = useState();

  const isDayBloqued = (day) => {
    return !!blockedDays.find(
      (item) =>
        moment(item, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
        moment(day, 'YYYY-MM-DD').format('YYYY-MM-DD')
    );
  };

  function handleDayClick(endDate) {
    setSelectedDay(endDate);
    const currentSelectedDate = `${yearMonth?.year}-${yearMonth?.month}`;
    const startDate = moment(currentSelectedDate, 'YYYY-MM')
      .startOf('month')
      .toDate();
    getDaysInPeriod(startDate, endDate);
  }

  const getDaysInPeriod = (startDate, endDate) => {
    var i = 0;
    var dates = [];

    // 0 -> sábado / 6 -> domingo
    const exeptDays = [0, 6];

    const difDates = moment(endDate).diff(startDate, 'days') + 1;

    while (i < difDates) {
      const date = moment(startDate).add(i, 'days').toDate();
      const weekDay = moment(date).day();
      if (!exeptDays.includes(weekDay)) dates.push(date);
      i++;
    }
    setSelectedDays([...dates.filter((day) => !isDayBloqued(day))]);
  };

  const getLastDayMonth = () => {
    const currentSelectedDate = `${yearMonth?.year}-${yearMonth?.month}`;
    const endOfMonth = moment(currentSelectedDate, 'YYYY-MM')
      .endOf('month')
      .toDate();
    setSelectedDay(endOfMonth, selectedDays);
  };

  useEffect(() => {
    if (yearMonth?.year) getLastDayMonth();
  }, [yearMonth, selectedDays]);

  return (
    <WeekPickerContainer onClick={onClick}>
      <DayPickerInput
        selectedDay={selectedDay}
        onDayChange={handleDayClick}
        dayPickerProps={{
          localeUtils: MomentLocaleUtils,
          locale: 'pt-br',
          firstDayOfWeek: 1,
        }}
        formatDate={formatDate}
        parseDate={parseDate}
        format="LL"
        placeholder={`${formatDate(selectedDay, 'LL', 'it')}`}
        component={(props) => (
          <StyledTextField disabled={disabled} variant="outlined" {...props} />
        )}
      />
    </WeekPickerContainer>
  );
}

export default CalendarDayInput;
