import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const styles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 144,
  },
  container_pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  container_no_results: {
    marginTop: 124,
    display: 'flex',
    justifyContent: 'center',
  },
  no_results: {
    fontSize: 18,
    color: '#646464',
  },
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
    padding-left: 50px;
    margin-top: 5px;
  }
`;

export const DefaultContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
