import { makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
}));

export const DefaultContainer = styled.div`
  padding-top: 7%;
  text-align: flex-start;
  margin-left: 15%;
  @media (max-width: 1920px) {
    padding-top: 5%;
    margin-left: 14%;
  }
  @media (max-width: 1440px) {
    padding-top: 7%;
    margin-left: 18%;
    margin-right: 1%;
  }
  @media (max-width: 1366px) {
    padding-top: 8%;
    margin-left: 14.5%;
  }
`;

export const SelectContainer = styled.div`
  margin: 18px;
  width: 358px;
  @media (max-width: 1920px) {
    width: 358px;
    margin: 12px;
  }
  @media (max-width: 1440px) {
    width: 263px;
    margin: 3px;
  }
  @media (max-width: 1366px) {
    width: 246px;
    margin: 14px;
  }
  @media (max-width: 1024px) {
    width: 350px;
    margin: 12px;
  }
  @media (max-width: 768px) {
    width: 226px;
    text-align: center;
    margin: 12px;
  }
`;
