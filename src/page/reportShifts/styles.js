import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    minwidth: '100%',
    marginTop: 124,
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export const TableControl = styled.div`
  margin-right: 20px;
  margin-top: 50px;
`;
