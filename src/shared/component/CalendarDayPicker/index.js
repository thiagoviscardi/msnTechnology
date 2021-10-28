import React, { useState } from 'react';
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

const CalendarWeekPicker = ({ onDaySelect = () => {} }) => {
  const classes = useStyles();

  const [state, setState] = useState({
    hoverRange: undefined,
    selectedDays: [],
  });

  const { selectedDays } = state;

  const handleDayChange = (date) => {
    localStorage.setItem('calendarDayPiker', date);
    setState((oldState) => ({
      ...oldState,
      selectedDays: [date],
    }));
    onDaySelect(date);
  };

  React.useEffect(() => {
    const dataSelected = localStorage.getItem('calendarDayPiker');
    if (dataSelected) {
      setState((oldState) => ({
        ...oldState,
        selectedDays: [dataSelected],
      }));
      onDaySelect(dataSelected);
    }
  }, []);

  const getPreviousDay = () => {
    handleDayChange(moment(state.selectedDays[0]).subtract(1, 'days').toDate());
  };

  const getNextDay = () => {
    handleDayChange(moment(state.selectedDays[0]).add(1, 'days').toDate());
  };

  const formatedDate = (date) => {
    return `${formatDate(date, 'll', 'pt-br')}`;
  };

  const label = (
    <span style={{ fontSize: 12 }}>{`${formatedDate(selectedDays[0])}`}</span>
  );

  return (
    <CustomContainer>
      <TodayIcon className={classes.icons} style={{ marginRight: 10 }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton className={classes.buttons_icon} onClick={getPreviousDay}>
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
                onDayClick={(...e) => {
                  handleDayChange(...e);
                  onClose();
                }}
              />
            </WeekPickerContainer>
          )}
        </CalendarPickerPopover>
        <IconButton className={classes.buttons_icon} onClick={getNextDay}>
          <ArrowForwardIosIcon className={classes.icons} />
        </IconButton>
      </div>
    </CustomContainer>
  );
};

export default CalendarWeekPicker;
