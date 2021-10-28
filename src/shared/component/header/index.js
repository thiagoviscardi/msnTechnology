import React, { useEffect, useState, createRef } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import useStyles from './style';
import { icons } from 'asset';
import { useHistory } from 'react-router-dom';
import CalendarWeekPicker from 'shared/component/CalendarWeekPicker';
import CalendarDayPicker from 'shared/component/CalendarDayPicker';
import moment from 'moment';
import CalendarRangePicker from '../CalendarRangePicker';
import ShowToday from '../ShowToday';
import CalendarMonthPicker from '../CalendarMonthPicker';

const Header = ({
  title = '',
  route = '',
  backArrow = false,
  specificRoute = false,
  handleDateChange = () => {},
  calendarWeek = true,
  calendarRange = false,
  showToday = false,
  calendarMonth = false,
  calendarDay = true,
  open = true,
  startNull = null,
}) => {
  const classes = useStyles();

  const setToPage = () => {
    history.push(route);
  };
  const history = useHistory();

  const [localState, setLocalState] = useState({
    date_start: moment().add(-1, 'days').format('YYYY-MM-DD'),
    date_end: moment().add(5, 'days').format('YYYY-MM-DD'),
    unit_id: null,
    selectedDays: getCurrentWeek(),
  });

  const weekPickerRef = createRef(null);
  useEffect(() => {
    if (weekPickerRef) weekPickerRef.current?.handleDayChange(moment());
    if (calendarWeek) onWeekSelect(localState?.selectedDays);
    if (calendarRange) {
      const { date_start, date_end } = localState;
      handleDateChange({ date_start, date_end });
    }
  }, []);

  function getCurrentWeek() {
    var currentDate = moment();

    var weekStart = currentDate.clone().startOf('isoWeek');

    var days = [];

    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').toDate());
    }
    return days;
  }

  const onWeekSelect = (selectedDays) => {
    setLocalState((oldState) => ({ ...oldState, selectedDays }));
    const date_start = moment(selectedDays[0], 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    );
    const date_end = moment(selectedDays[6], 'DD/MM/YYYY').format('YYYY-MM-DD');
    setLocalState((oldState) => ({ ...oldState, date_start, date_end }));
    handleDateChange({ date_start, date_end });
  };
  const onDaySelect = (selectedDays) => {
    const formated_date = moment(selectedDays).format('YYYY-MM-DD');
    handleDateChange({ formated_date });
  };

  const onDateStartSelect = (selectedDay) => {
    const date_start = moment(selectedDay, 'DD/MM/YYYY').format('YYYY-MM-DD');

    setLocalState((oldState) => ({
      ...oldState,
      date_start,
    }));
    handleDateChange({ date_start, date_end: localState.date_end });
  };

  const onDateEndSelect = (selectedDay) => {
    const date_end = moment(selectedDay, 'DD/MM/YYYY').format('YYYY-MM-DD');

    setLocalState((oldState) => ({
      ...oldState,
      date_end,
    }));
    handleDateChange({ date_end, date_start: localState.date_start });
  };

  const switchCalendar = () => {
    if (showToday) {
      return <ShowToday />;
    } else if (calendarRange) {
      return (
        <CalendarRangePicker
          startNull={startNull}
          EndDate={localState.date_end}
          StartDate={localState.date_start}
          onDayStart={onDateStartSelect}
          onDayEnd={onDateEndSelect}
        />
      );
    } else if (calendarWeek) {
      return (
        <CalendarWeekPicker
          onWeekSelect={onWeekSelect}
          defaultSelectedDays={localState?.selectedDays}
        />
      );
    } else if (calendarMonth) {
      return <CalendarMonthPicker handleDateChange={handleDateChange} />;
    } else if (calendarDay) {
      return <CalendarDayPicker onDaySelect={onDaySelect} />;
    }
  };

  return (
    <div className={!open ? classes.headerContainer : classes.header_min}>
      <div className={classes.titleContainer}>
        {backArrow && (
          <IconButton
            style={{ padding: 0, marginRight: 21 }}
            onClick={specificRoute ? setToPage : history.goBack}
          >
            <img
              alt="arrow-icon"
              src={icons.arrowBack}
              style={{ width: 33, marginTop: 0 }}
            />
          </IconButton>
        )}

        <Typography variant="span" className={classes.titleStyle}>
          {title}
        </Typography>
      </div>
      <div>{switchCalendar()}</div>
    </div>
  );
};

export default Header;
