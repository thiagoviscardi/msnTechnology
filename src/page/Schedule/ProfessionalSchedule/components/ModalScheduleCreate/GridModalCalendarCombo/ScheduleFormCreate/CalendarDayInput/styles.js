import styled from 'styled-components';
import { TextField } from '@material-ui/core';

export const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: white;
      max-width: 180px;
      height: 35px;
    }
    & .MuiOutlinedInput-input {
      text-align: right;
      padding: 12px 12px;
    }
    & .MuiInputLabel-outlined[data-shrink='false'] {
      transform: translate(14px, 14px) scale(1);
    }

    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const WeekPickerContainer = styled.div`
  .DayPicker {
    width: 100%;
  }
  .DayPicker-Months {
    display: flex;
    justify-content: flex-start;
  }
  .DayPicker-Month {
    border-collapse: separate;
    margin-left: 0px;
    width: 100%;
    max-width: 100px;
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
