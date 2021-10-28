import styled from 'styled-components';

export const WeekPickerContainer = styled.div`
  .DateRangePicker-Month {
    border-collapse: separate;
  }
  .DateRangePicker-WeekNumber {
    outline: none;
  }
  .DateRangePicker-Day {
    outline: none;
    border: 1px solid transparent;
  }
  .DateRangePicker-Day--hoverRange {
    background-color: #efefef !important;
  }
  .DateRangePicker-Day--today {
    color: #32b8d2 !important;
  }
  .DateRangePicker-Day--selectedRange {
    background-color: lightgray !important;
    border-top-color: lightgray;
    border-bottom-color: lightgray;
    border-left-color: lightgray;
    border-right-color: lightgray;
  }
  .DateRangePicker-Day--selectedRangeStart {
    background-color: lightgray !important;
    border-left: 1px solid lightgray;
  }
  .DateRangePicker-Day--selectedRangeEnd {
    background-color: lightgray !important;
    border-right: 1px solid lightgray;
  }
  .DateRangePicker-Day--selectedRange:not(.DateRangePicker-Day--outside).DateRangePicker-Day--selected,
  .DateRangePicker-Day--hoverRange:not(.DateRangePicker-Day--outside).DateRangePicker-Day--selected {
    border-radius: 0 !important;
    color: black !important;
  }
  .DateRangePicker-Day--hoverRange:hover {
    border-radius: 0 !important;
  }
`;
