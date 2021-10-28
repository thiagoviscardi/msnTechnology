import React, { useEffect, useState } from 'react';

import DayPicker from 'react-day-picker/';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import MomentLocaleUtils, { formatDate } from 'react-day-picker/moment';

import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TodayIcon from '@material-ui/icons/Today';

import CalendarPickerPopover from 'shared/component/CalendarPickerPopover';
import { useStyles, CustomContainer, WeekPickerContainer } from './styles';

const CalendarWeekPicker = ({ defaultSelectedDays, onWeekSelect }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    hoverRange: undefined,
    selectedDays: [],
  });

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      selectedDays: defaultSelectedDays,
    }));
  }, []);

  const getWeekDays = (weekStart) => {
    const days = [weekStart];
    for (let i = 1; i < 7; i += 1) {
      days.push(moment(weekStart).add(i, 'days').toDate());
    }
    return days;
  };

  const getWeekRange = (date) => {
    return {
      from: moment(date).startOf('week').add(1, 'days').toDate(),
      to: moment(date).endOf('week').add(1, 'days').toDate(),
    };
  };

  const handleDayChange = (date) => {
    setState((oldState) => ({
      ...oldState,
      selectedDays: getWeekDays(getWeekRange(date).from),
    }));
    onWeekSelect(getWeekDays(getWeekRange(date).from));
  };

  const handleDayEnter = (date) => {
    setState((oldState) => ({
      ...oldState,
      hoverRange: getWeekRange(date),
    }));
  };

  const handleDayLeave = () => {
    setState((oldState) => ({
      ...oldState,
      hoverRange: undefined,
    }));
  };

  const handleWeekClick = (weekNumber, days) => {
    setState((oldState) => ({
      ...oldState,
      selectedDays: days,
    }));
  };

  const getPreviousWeek = () => {
    handleDayChange(moment(state.selectedDays[0]).subtract(2, 'days').toDate());
  };

  const getNextWeek = () => {
    handleDayChange(moment(state.selectedDays[6]).add(2, 'days').toDate());
  };

  const { hoverRange, selectedDays } = state;
  const daysAreSelected = selectedDays.length > 0;

  const formatedDate = (date) => {
    return `${formatDate(date, 'LL', 'pt-br')}`;
  };

  const modifiers = {
    hoverRange,
    selectedRange: daysAreSelected && {
      from: selectedDays[0],
      to: selectedDays[6],
    },
    hoverRangeStart: hoverRange && hoverRange.from,
    hoverRangeEnd: hoverRange && hoverRange.to,
    selectedRangeStart: daysAreSelected && selectedDays[0],
    selectedRangeEnd: daysAreSelected && selectedDays[6],
  };
  const label = (
    <span style={{ fontSize: 12 }}>
      {`${formatedDate(selectedDays[0])} - ${formatedDate(selectedDays[6])}`}
    </span>
  );

  return (
    <CustomContainer>
      <TodayIcon className={classes.icons} style={{ marginRight: 10 }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          data-cy="btn_backArrow_calendar"
          className={classes.buttons_icon}
          onClick={getPreviousWeek}
        >
          <ArrowBackIosIcon className={classes.icons} />
        </IconButton>
        <CalendarPickerPopover label={label}>
          {({ onClose }) => (
            <WeekPickerContainer>
              <DayPicker
                firstDayOfWeek={1}
                localeUtils={MomentLocaleUtils}
                locale="pt-br"
                selectedDays={selectedDays}
                showOutsideDays
                modifiers={modifiers}
                onDayClick={(...e) => {
                  handleDayChange(...e);
                  onClose();
                }}
                onDayMouseEnter={handleDayEnter}
                onDayMouseLeave={handleDayLeave}
                onWeekClick={handleWeekClick}
              />
            </WeekPickerContainer>
          )}
        </CalendarPickerPopover>
        <IconButton className={classes.buttons_icon} onClick={getNextWeek}>
          <ArrowForwardIosIcon className={classes.icons} />
        </IconButton>
      </div>
    </CustomContainer>
  );
};

export default CalendarWeekPicker;
