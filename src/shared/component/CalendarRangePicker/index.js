import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { WeekPickerContainer } from './styles';
import { DateRangePicker as DateBnb } from 'react-dates';

const CalendarRangePicker = ({
  onDayStart,
  onDayEnd,
  EndDate,
  StartDate,
  startNull,
}) => {
  const [localState, setLocalState] = React.useState({
    startDate: startNull ? null : moment(StartDate),
    endDate: startNull ? null : moment(EndDate),
    focusedInput: '',
    fullscreen: false,
    direction: 'left',
    dateFormat: 'YYYY-MM-DD',
    small: true,
    block: false,
    orientation: 'horizontal',
    numMonths: 2,
    showClearDates: true,
    showDefaultInputIcon: true,
    isOutsideRange: () => false,
    minimumNights: 0,
    startDatePlaceholderText: 'Data inicial',
    endDatePlaceholderText: 'Data final',
    readOnly: true,
  });

  const {
    focusedInput,
    startDatePlaceholderText,
    endDatePlaceholderText,
    readOnly,
    endDate,
    startDate,
    showClearDates,
    showDefaultInputIcon,
    small,
    isOutsideRange,
    minimumNights,
  } = localState;

  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      onDayStart(startDate);
    }
    if (endDate) {
      onDayEnd(endDate);
    }
    setLocalState((oldState) => ({ ...oldState, startDate, endDate }));
  };

  const handleFocusChange = (data) => {
    setLocalState((oldState) => ({ ...oldState, focusedInput: data }));
  };

  return (
    <div
      data-cy="container_calendar"
      style={{ padding: '10px', fontFamily: 'arial' }}
    >
      <WeekPickerContainer>
        <DateBnb
          startDatePlaceholderText={startDatePlaceholderText}
          readOnly={readOnly}
          endDatePlaceholderText={endDatePlaceholderText}
          startDate={startDate} // momentPropTypes.momentObj or null,
          startDateId="unique_start_date_id" // PropTypes.string.isRequired,
          endDate={endDate} // momentPropTypes.momentObj or null,
          endDateId="unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={handleDatesChange} // PropTypes.func.isRequired,
          focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={handleFocusChange} // PropTypes.func.isRequired,
          showClearDates={showClearDates}
          showDefaultInputIcon={showDefaultInputIcon}
          small={small}
          isOutsideRange={isOutsideRange}
          minimumNights={minimumNights}
        />
      </WeekPickerContainer>
    </div>
  );
};

export default CalendarRangePicker;
