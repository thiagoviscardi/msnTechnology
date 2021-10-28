import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  buttons_icon: {
    padding: 7,
  },
  icons: {
    fontSize: 17,
  },
}));

export const CustomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  box-shadow: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
`;

export const WeekPickerContainer = styled.div`
  .DayPicker-Month {
    border-collapse: separate;
  }
  .DayPicker-WeekNumber {
    outline: none;
  }
  .DayPicker-Day {
    outline: none;
    border: 1px solid transparent;
  }
  .DayPicker-Day--hoverRange {
    background-color: #efefef !important;
  }
  .DayPicker-Day--today {
    color: #32b8d2 !important;
  }
  .DayPicker-Day--selectedRange {
    background-color: lightgray !important;
    border-top-color: lightgray;
    border-bottom-color: lightgray;
    border-left-color: lightgray;
    border-right-color: lightgray;
  }
  .DayPicker-Day--selectedRangeStart {
    background-color: lightgray !important;
    border-left: 1px solid lightgray;
  }
  .DayPicker-Day--selectedRangeEnd {
    background-color: lightgray !important;
    border-right: 1px solid lightgray;
  }
  .DayPicker-Day--selectedRange:not(.DayPicker-Day--outside).DayPicker-Day--selected,
  .DayPicker-Day--hoverRange:not(.DayPicker-Day--outside).DayPicker-Day--selected {
    border-radius: 0 !important;
    color: black !important;
  }
  .DayPicker-Day--hoverRange:hover {
    border-radius: 0 !important;
  }
`;
