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

export const MonthPickerContainer = styled.div``;
