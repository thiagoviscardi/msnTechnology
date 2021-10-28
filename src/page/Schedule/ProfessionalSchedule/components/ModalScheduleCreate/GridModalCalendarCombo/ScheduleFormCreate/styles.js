import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  container_radio_group: {
    margin: '0px',
    display: 'flex',
    alignItems: 'center',
  },
  container_repeat_type: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 0,
  },
  enabled: {},
  disabled: {
    opacity: 0.5,
  },
}));

export const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      background: white;
      width: 50px;
      height: 35px;
      margin-right: 10px;
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
