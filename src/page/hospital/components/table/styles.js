import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
    paddingLeft: 3,
  },
  headerText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
  },
  pageButton: {
    width: 48,
    height: 32,
    background: '#ffffff',
    borderRadius: 6,
  },
  pageContainer: {
    width: 32,
    height: 32,
    background: '#24B8EC',
    borderRadius: 6,
    marginRight: 8,
    marginLeft: 8,
    textAlign: 'center',
  },
  pageNumber: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#fff',
    marginTop: 3,
  },
  tableDiv: {
    minHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media (max-width: 1024px)': {
      overflowX: 'scroll',
    },
  },
  content_table: {
    '@media (max-width: 1440px)': {
      width: 'fit-content',
    },
  },
  loadingContainer: {
    textAlign: 'center',
    paddingTop: 90,
  },
}));

export const LeftSideContainer = styled.div`
  display: flex;
  align-items: center;
  width: 527px;
  @media (max-width: 1920px) {
    width: 527px;
  }
  @media (max-width: 1440px) {
    width: 403px;
  }
  @media (max-width: 1366px) {
    width: 403px;
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 540px;
  @media (max-width: 1920px) {
    width: 540px;
  }
  @media (max-width: 1440px) {
    width: 410px;
  }
  @media (max-width: 1366px) {
    width: 360px;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  margin-left: 85px;
  @media (min-width: 1440px) {
    width: 82px;
    flex: 1;
    margin-left: 85px;
  }
  @media (max-width: 1440px) {
    width: 82px;
    margin-left: 45px;
  }
  @media (max-width: 1366px) {
    width: 82px;
    margin-left: 35px;
  }
`;

export const IdContainer = styled.div`
  width: 60px;
  margin-right: 25px;
  @media (max-width: 1920px) {
    width: 60px;
    margin-right: 25px;
  }
  @media (max-width: 1440px) {
    width: 50px;
    margin-right: 24px;
  }
  @media (max-width: 1366px) {
    width: 50px;
    margin-right: 15px;
  }
`;

export const ProfContainer = styled.div`
  width: 280px;
  margin-right: 40px;
  @media (max-width: 1920px) {
    width: 280px;
    margin-right: 40px;
  }
  @media (max-width: 1440px) {
    width: 210px;
    margin-right: 0px;
  }
  @media (max-width: 1366px) {
    width: 200px;
  }
`;

export const PageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 80px;
  padding-bottom: 36px;
  padding-top: 8px;
  @media (max-width: 1920px) {
    margin-right: 80px;
  }
  @media (max-width: 1440px) {
    margin-right: 30px;
  }
  @media (max-width: 1366px) {
    margin-right: 20px;
  }
`;
