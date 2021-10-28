import React, { useEffect, useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { WeekPickerContainer } from './styles';
import moment from 'moment';

function CalendarFormCreate({
  selectedDays,
  setSelectedDays,
  setYearMonth,
  repeatType,
  blockedDays = [],
  disabledDays,
  detailsSchedule = {},
}) {
  const WEEKDAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const initialMonth = moment(detailsSchedule?.daySelected).format('YYYY-MM');
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const isDayBloqued = (day) => {
    return !!blockedDays.find(
      (item) =>
        moment(item, 'YYYY-MM-DD').format('YYYY-MM-DD') ===
        moment(day, 'YYYY-MM-DD').format('YYYY-MM-DD')
    );
  };

  function handleDayClick(day, { selected }) {
    const selectedDaysA = [...selectedDays];

    if (selected) {
      const selectedIndex = selectedDaysA.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDaysA.splice(selectedIndex, 1);
    } else {
      selectedDaysA.push(day);
    }
    setSelectedDays(selectedDaysA);
  }

  const handleGetEvenDays = () => {
    let daysInMonth = moment(currentMonth, 'YYYY-MM').daysInMonth();
    var arrDays = [];
    // var blockedDays = [];

    while (daysInMonth) {
      var current = moment(currentMonth, 'YYYY-MM').date(daysInMonth).toDate();
      if (daysInMonth % 2 === 0) arrDays.push(current);
      // else blockedDays.push(current);

      daysInMonth--;
    }

    // setDisabledDays(blockedDays);
    setSelectedDays([...arrDays.filter((day) => !isDayBloqued(day))]);
  };

  const handleGetOddDays = () => {
    let daysInMonth = moment(currentMonth, 'YYYY-MM').daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment(currentMonth, 'YYYY-MM').date(daysInMonth).toDate();
      if (daysInMonth % 2 !== 0) arrDays.push(current);
      daysInMonth--;
    }

    setSelectedDays([...arrDays.filter((day) => !isDayBloqued(day))]);
  };

  const getSevenSevenDays = (limitWeek = 4) => {
    const currentDate = moment().toDate();
    const firstDay =
      selectedDays && selectedDays.length > 0
        ? selectedDays.pop()
        : currentDate;

    const days = [firstDay];
    for (let counter = 1; counter < limitWeek; counter += 1) {
      days.push(
        moment(firstDay)
          .add(7 * counter, 'days')
          .toDate()
      );
    }
    setSelectedDays([...days.filter((day) => !isDayBloqued(day))]);
  };

  const getMondayToFridayMonth = () => {
    let daysInMonth = moment(currentMonth, 'YYYY-MM').daysInMonth();
    var arrDays = [];

    // 0 -> sábado / 6 -> domingo
    const exeptDays = [0, 6];

    while (daysInMonth) {
      var current = moment(currentMonth, 'YYYY-MM').date(daysInMonth).toDate();
      const weekDay = moment(current).day();
      if (!exeptDays.includes(weekDay)) arrDays.push(current);
      daysInMonth--;
    }

    setSelectedDays([...arrDays.filter((day) => !isDayBloqued(day))]);
  };

  const splitYearMonth = (date) => {
    return date.split('-');
  };

  const onMonthChange = (date) => {
    const yearMonth = moment(date, 'YYYY-MM').format('YYYY-MM');
    setCurrentMonth(yearMonth);
    setYearMonth({
      year: splitYearMonth(yearMonth)[0],
      month: parseInt(splitYearMonth(yearMonth)[1]),
    });
  };

  const handleRepeatChange = () => {
    switch (repeatType?.value) {
      case 1:
        setSelectedDays([]);
        break;
      case 2:
        handleGetEvenDays();
        break;
      case 3:
        handleGetOddDays();
        break;
      case 4:
        getSevenSevenDays();
        break;
      case 5:
        getMondayToFridayMonth();
        break;
    }
  };

  useEffect(handleRepeatChange, [repeatType]);

  const modifiers = {
    highlighted: [...blockedDays],
  };

  const modifiersStyles = {
    highlighted: {
      border: '1px solid #1f437f',
    },
  };

  return (
    <WeekPickerContainer>
      <DayPicker
        month={currentMonth ? moment(currentMonth).toDate() : new Date()}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        firstDayOfWeek={1}
        showOutsideDays
        fixedWeeks
        selectedDays={selectedDays}
        onDayClick={handleDayClick}
        locale="pt-br"
        localeUtils={MomentLocaleUtils}
        weekdaysShort={WEEKDAYS_SHORT}
        onMonthChange={onMonthChange}
        disabledDays={{ daysOfWeek: disabledDays }}
      />
    </WeekPickerContainer>
  );
}

export default CalendarFormCreate;
