import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(() => ({
  container_pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  container_no_results: {
    display: 'flex',
    justifyContent: 'center',
    height: 100,
    marginTop: 150,
  },
  no_results: {
    fontSize: 18,
    color: '#646464',
  },
}));

export const ScreenContainer = styled.div`
  margin-left: 50px;
  @media (min-width: 2001px) {
    margin-left: 0px;
  }
  @media (max-width: 2000px) {
    margin-left: 40px;
  }
  @media (max-width: 1660px) {
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

export const TableWeek = styled.div``;
