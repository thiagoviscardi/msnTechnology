import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {},
}));

export const ScreenContainer = styled.div`
  margin-left: 50px;
  @media (min-width: 1601px) {
    margin-left: 70px;
  }
  @media (max-width: 1600px) {
    margin-left: 20px;
  }
  @media (max-width: 1440px) {
    margin-left: 45px;
  }
  @media (max-width: 1024px) {
    padding-left: 70px;
    margin-top: 5px;
  }
`;
