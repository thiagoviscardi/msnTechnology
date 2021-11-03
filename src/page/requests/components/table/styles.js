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
    fontFamily: 'Open Sans',
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
    fontFamily: 'Open Sans',
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
  },
  loadingContainer: {
    textAlign: 'center',
    paddingTop: 90,
  },
  centerMessage: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 90,
  },
}));

export const LeftSideContainer = styled.div`
  display: flex;
  align-items: center;
  width: 506px;
  @media (max-width: 1920px) {
    width: 506px;
  }
  @media (max-width: 1440px) {
    width: 313px;
  }
  @media (max-width: 1366px) {
    width: 293px;
  }
`;

export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 520px;
  @media (max-width: 1920px) {
    width: 520px;
  }
  @media (max-width: 1440px) {
    width: 410px;
  }
  @media (max-width: 1366px) {
    width: 400px;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  margin-left: 85px;
  @media (max-width: 1920px) {
    width: 82px;
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
  width: 100px;
  margin-right: 25px;
  @media (max-width: 1920px) {
    width: 100px;
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
  width: 224px;
  margin-right: 40px;
  @media (max-width: 1920px) {
    width: 224px;
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
