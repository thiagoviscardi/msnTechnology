import { makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: appColors.BACKGROUND_COLOR,
    display: 'flex',
    height: '100%',
  },
  backdrop: {
    zIndex: 9999,
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
    marginTop: 94,
    minHeight: '100vh',
  },
}));

export const DefaultContainer = styled.div`
  padding-top: 7%;
  text-align: flex-start;
  margin-left: 14%;
  @media (max-width: 1920px) {
    padding-top: 5.5%;
    margin-left: 13.5%;
  }
  @media (max-width: 1440px) {
    padding-top: 7.5%;
    margin-left: 20%;
    margin-right: 1%;
  }
  @media (max-width: 1366px) {
    padding-top: 8%;
    margin-left: 20%;
  }
  @media (max-width: 1024px) {
    padding-top: 12%;
    margin-left: 5000%;
  }
  @media (max-width: 1600px) {
    padding-top: 7%;
    margin-left: 17%;
  }
  @media (max-width: 1660px) {
    padding-top: 5%;
    margin-left: 16%;
  }
  @media (max-width: 768px) {
    padding-top: 12%;
    margin-left: 27%;
  }
`;
