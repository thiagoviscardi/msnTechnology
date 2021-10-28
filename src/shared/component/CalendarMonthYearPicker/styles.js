import { TextField } from '@material-ui/core';
import styled from 'styled-components';

export const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: white;
      height: 50px;
    }
    & .MuiOutlinedInput-input {
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
