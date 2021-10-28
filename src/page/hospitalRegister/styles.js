import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 400,
    color: appColors.SILENCE,
    marginTop: 18,
  },
}));

export const ScreenContainer = styled.div`
  margin-left: 50px;
  @media (min-width: 1601px) {
    margin-left: 50px;
  }
  @media (max-width: 1600px) {
    margin-left: 30px;
  }
  @media (max-width: 1440px) {
    margin-left: 40px;
  }
  @media (max-width: 1024px) {
    padding-left: 80px;
    margin-top: 5px;
  }
`;
