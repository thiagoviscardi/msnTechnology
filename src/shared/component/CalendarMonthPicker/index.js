import React, { useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import Monthpicker from '@compeon/monthpicker';
import { Button, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TodayIcon from '@material-ui/icons/Today';
import { useStyles, CustomContainer, MonthPickerContainer } from './styles';
import appColors from 'utils/appColors';

const CalendarMonthPicker = ({ handleDateChange = () => {} }) => {
  const classes = useStyles();

  const [currentDate, setCurrentDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  useEffect(() => {
    handleDateStartDateEnd();
  }, [currentDate]);

  const onMonthYearChange = (data) => {
    setCurrentDate(data);
  };

  function getNumWeeksForMonth(year, month) {
    const date = new Date(year, month - 1, 1);
    const day = date.getDay();
    const numDaysInMonth = new Date(year, month, 0).getDate();
    return Math.ceil((numDaysInMonth + day) / 7);
  }

  const getDayPrevMonth = (firstDayWeekDay) => {
    let prevMonth = '';

    if (currentDate.month === 1) {
      prevMonth = `${currentDate.year - 1}-12`;
    } else {
      prevMonth = `${currentDate.year}-${currentDate.month - 1}`;
    }
    let count = firstDayWeekDay;
    let daysInMonth = moment(prevMonth, 'YYYY-MM').daysInMonth();
    var restDaysPrevMonth = [];

    while (count) {
      var current = moment(prevMonth, 'YYYY-MM').date(daysInMonth).toDate();
      restDaysPrevMonth.push(current);
      count--;
      daysInMonth--;
    }
    return restDaysPrevMonth;
  };

  const handleDateStartDateEnd = () => {
    const currentMonth = `${currentDate.year}-${currentDate.month}`;

    let daysInMonth = moment(currentMonth, 'YYYY-MM').daysInMonth();
    const weeksInMonth = getNumWeeksForMonth(
      currentDate.year,
      currentDate.month
    );
    var arrDays = [];
    var allDaysMonth = [];

    while (daysInMonth) {
      var current = moment(currentMonth, 'YYYY-MM').date(daysInMonth).toDate();
      arrDays.push(current);
      allDaysMonth.push(current);
      daysInMonth--;
    }

    const date_start = moment(arrDays.pop(), 'DD/MM/YYYY').format('YYYY-MM-DD');
    const date_end = moment(arrDays[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
    const firstDay =
      moment(date_start).day() === 0 ? 0 : moment(date_start).day() - 1; // segunda-feira -> primeiro dia da semana

    const daysPrevMonth = getDayPrevMonth(firstDay);

    const completedDaysCalendar = [
      ...daysPrevMonth.reverse(),
      ...allDaysMonth.reverse(),
    ];

    handleDateChange({
      date_start:
        daysPrevMonth.length > 0
          ? moment(daysPrevMonth[0]).format('YYYY-MM-DD')
          : date_start,
      date_end,
      weeksInMonth,
      completedDaysCalendar,
    });
  };

  const getPreviousMonth = () => {
    let prevMonth = '';
    let prevYear = '';
    if (currentDate.month === 1) {
      prevMonth = 12;
      prevYear = currentDate.year - 1;
    } else {
      prevMonth = currentDate.month - 1;
      prevYear = currentDate.year;
    }
    setCurrentDate({ month: prevMonth, year: prevYear });
  };

  const getNextMonth = () => {
    let nextMonth = '';
    let nextYear = '';
    if (currentDate.month === 12) {
      nextMonth = 1;
      nextYear = currentDate.year + 1;
    } else {
      nextMonth = currentDate.month + 1;
      nextYear = currentDate.year;
    }
    setCurrentDate({ month: nextMonth, year: nextYear });
  };

  const label = `${moment(currentDate?.month, 'M').format('MMMM')} ${
    currentDate?.year
  }`;

  return (
    <CustomContainer>
      <TodayIcon className={classes.icons} style={{ marginRight: 10 }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton className={classes.buttons_icon} onClick={getPreviousMonth}>
          <ArrowBackIosIcon className={classes.icons} />
        </IconButton>
        <MonthPickerContainer>
          <Monthpicker
            locale="pt"
            onChange={(date) => {
              onMonthYearChange(date);
            }}
            month={currentDate?.month}
            year={currentDate?.year}
            primaryColor={appColors.PRIMARY_COLOR}
          >
            <Button variant="outlined" style={{ border: 'none', width: 280 }}>
              {label}
            </Button>
          </Monthpicker>
        </MonthPickerContainer>
        <IconButton className={classes.buttons_icon} onClick={getNextMonth}>
          <ArrowForwardIosIcon className={classes.icons} />
        </IconButton>
      </div>
    </CustomContainer>
  );
};

export default CalendarMonthPicker;
