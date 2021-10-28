import { makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  buttonExport: {
    fontFamily: 'Nunito Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#24B8EC',
    textTransform: 'none',
  },
}));

export const DefaultContainer = styled.div`
  padding-top: 7%;
  text-align: flex-start;
  margin-left: 14%;
  @media (max-width: 1750px) {
    padding-top: 9%;
    margin-left: 18%;
  }
  @media (max-width: 1024px) {
    padding-top: 12%;
    margin-left: 25%;
  }
  @media (max-width: 768px) {
    padding-top: 21%;
    margin-left: 33%;
  }
`;
