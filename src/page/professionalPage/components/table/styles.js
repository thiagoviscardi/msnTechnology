import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    fontFamily: 'Nunito Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
  },
  textStatus: {
    width: 175,
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
  divider: {
    marginTop: 24,
    marginBottom: 24,
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
    '@media (max-width: 1440px)': {
      overflowX: 'scroll',
      marginRight: 20,
    },
  },
  rootLoading: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%',
  },
  content_table: {
    '@media (max-width: 1440px)': {
      width: 'fit-content',
    },
  },
}));

export const LeftSideContainer = styled.div`
  display: flex;
  align-items: center;
  width: 420px;
  @media (max-width: 1920px) {
    width: 420px;
  }
  @media (max-width: 1440px) {
    width: 330px;
  }
  @media (max-width: 1366px) {
    width: 440px;
  }
`;

export const CenterContainer = styled.div`
  width: 280px;
  @media (max-width: 1920px) {
    width: 280px;
  }
  @media (max-width: 1440px) {
    width: 180px;
  }
  @media (max-width: 1366px) {
    width: 210px;
  }
`;

export const RightSideContainer = styled.div`
  width: 290px;
  @media (max-width: 1920px) {
    width: 290px;
  }
  @media (max-width: 1440px) {
    width: 150px;
  }
  @media (max-width: 1366px) {
    width: 190px;
  }
`;
export const FinalContainer = styled.div`
  width: 260px;
  margin-left: 50px;
  @media (max-width: 1920px) {
    width: 260px;
    margin-left: 50px;
  }
  @media (max-width: 1440px) {
    width: 220px;
    margin-left: 45px;
  }
  @media (max-width: 1366px) {
    width: 230px;
  }
`;
export const IdContainer = styled.div`
  width: 70px;
  margin-right: 25px;
  margin-right: 25px;
  @media (max-width: 1920px) {
    width: 70px;
    margin-right: 25px;
  }
  @media (max-width: 1440px) {
    width: 39px;
    margin-right: 24px;
  }
  @media (max-width: 1366px) {
    width: 39px;
    margin-right: 30px;
  }
`;

export const ContainerStatus = styled.div`
  width: 230px;
  @media (max-width: 1920px) {
    width: 230px;
  }
  @media (max-width: 1440px) {
    width: 210px;
    margin-right: 0px;
  }
  @media (max-width: 1366px) {
    width: 150px;
  }
`;

export const ContainerActions = styled.div`
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
