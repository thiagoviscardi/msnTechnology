import styled from 'styled-components';

export const WeekPickerContainer = styled.div`
  .DayPicker {
    width: 100%;
  }
  .DayPicker-Months {
    display: flex;
    justify-content: flex-start;
  }
  .DayPicker-NavButton--next {
    margin-right: 35px;
  }
  .DayPicker-NavButton--prev {
    margin-right: 65px;
  }
  .DayPicker-Month {
    border-collapse: separate;
    margin-left: 0px;
    width: 100%;
    max-width: 300px;
  }
  .DayPicker-WeekNumber {
    outline: none;
  }
  .DayPicker-Day {
    outline: none;
    border: 1px solid transparent;
  }
  .DayPicker-Day--today {
    color: #32b8d2 !important;
  }
  .DayPicker-Day--disabled {
    color: #646464;
  }
`;
