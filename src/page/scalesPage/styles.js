import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
    marginLeft: 24,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  tableRow: {
    backgroundColor: '#E5E5E5',
    width: 1528,
  },
  tableScales: {
    padding: '8px 20px',
    backgroundColor: 'white',
    width: 1528,
    height: 56,
    marginTop: 8,
    marginRight: 90,
    borderRadius: 4,
    color: '#444',
    alignItems: 'center',
  },
  rootFullScales: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 24,
    marginRight: 20,
    textTransform: 'none',
  },
  textRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 151,
    marginTop: 32,
    marginBottom: 16,
  },
  textWeek: {
    color: '#505255',
    height: '16px',
    width: '96px',
    fontSize: '16px',
    marginRight: 96,
  },
  statusView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 320,
    color: '#ccc',
  },
  statusText: {
    fontSize: 14,
    color: '#24B8EC',
  },

  rowButton: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textTable: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#24B8EC',
  },
  specialty: {
    fontSize: '16px',
    fontStyle: 'normal',
    height: '24px',
    width: '232px',
    color: '#A2A5A8',
    marginRight: 24,
  },
  headerSearch: {
    backgroundColor: 'white',
    borderRadius: 24,
    border: '1px solid #e9e9e9',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: 776,
    height: 48,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchIcon: {
    margin: '0 12px',
    color: '#24B8EC',
    fontSize: 26,
  },
  searchIconClose: {
    margin: '0 12px',
    color: '#A2A5A8',
    fontSize: 24,
  },
  closeIcon: {
    margin: '0 12px',
    color: '#A2A5A8',
    fontSize: 25,
  },

  inputSearch: {
    flex: 1,
    padding: 5,
  },
  table: {
    marginBottom: 18,
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    marginRight: 20,
    width: 30,
    color: '#A2A5A8',
  },
  name: {
    height: '24px',
    width: '232px',
    marginLeft: 50,
    marginRight: 33,
  },
  registerButton: {
    height: 32,
    width: 175,
    borderRadius: 4,
    background: '#0F83AD',
    marginLeft: 24,
    textTransform: 'none',
    '&:hover': {
      border: ' 1px solid #0F83AD',
    },
  },
  registerText: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    color: 'white',
    '&:hover': {
      color: '#0F83AD',
    },
  },
  rowButtons: {
    display: 'flex',
    marginRight: 80,
  },
  tableAddScales: {
    padding: '8px 20px',
    borderWidth: '2px',
    borderStyle: 'dashed',
    border: ' 1px solid #A2A5A8',
    width: 1528,
    height: 72,
    borderRadius: 4,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
    textTransform: 'none',
  },
  textAddTable: {
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    marginTop: 5,
    color: '#A2A5A8',
    height: '24px',
    width: '128px',
    display: 'flex',
    flexDirection: 'column',
  },
  iconAdd: {
    fontSize: 24,
    marginTop: 5,
    color: '#A2A5A8',
  },
  inputWidth: {
    minWidth: '90%',
  },
  container_minimizable: {
    overflowX: 'scroll',
    '@media (min-width: 1921px)': {
      maxWidth: '80vw',
    },
    '@media (max-width: 1920px)': {
      maxWidth: '80vw',
    },
    '@media (max-width: 1660px)': {
      maxWidth: '75vw',
    },
    '@media (max-width: 1600px)': {
      maxWidth: '75vw',
    },
    '@media (max-width: 1440px)': {
      maxWidth: '74vw',
    },
    '@media (max-width: 1400px)': {
      maxWidth: '72vw',
    },
    '@media (max-width: 1360px)': {
      maxWidth: '73vw',
    },
    '@media (max-width: 1024px)': {
      maxWidth: '65vw',
    },
  },
  container_minimizableClose: {
    overflowX: 'scroll',
    '@media (min-width: 1921px)': {
      maxWidth: '100vw',
    },
    '@media (max-width: 1920px)': {
      maxWidth: '100vw',
    },
    '@media (max-width: 1660px)': {
      maxWidth: '100vw',
    },
    '@media (max-width: 1600px)': {
      maxWidth: '100vw',
    },
    '@media (max-width: 1440px)': {
      maxWidth: '88vw',
    },
    '@media (max-width: 1400px)': {
      maxWidth: '90vw',
    },
    '@media (max-width: 1360px)': {
      maxWidth: '90vw',
    },
    '@media (max-width: 1024px)': {
      maxWidth: '80vw',
    },
  },
}));

export const DefaultContainer = styled.div`
  padding-top: 4%;
  text-align: flex-start;
  margin-left: 14%;
  @media (max-width: 1920px) {
    padding-top: 4%;
    margin-left: 14%;
  }
  @media (max-width: 1440px) {
    padding-top: 5%;
    margin-left: 18%;
  }
  @media (max-width: 1366px) {
    padding-top: 5%;
    margin-left: 18%;
  }
  @media (max-width: 1024px) {
    padding-top: 7%;
    margin-left: 25%;
  }
  @media (max-width: 768px) {
    padding-top: 7%;
    margin-left: 33%;
  }
`;

export const ContainerTable = styled.div`
  @media (max-width: 1920px) {
  }
  @media (max-width: 1440px) {
  }
  @media (max-width: 1366px) {
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
  }
`;

export const TableControl = styled.div`
  margin-top: 50px;
`;

export const ContainerButton = styled.div`
  width: 208px;
  @media (max-width: 1920px) {
    width: 390px;
    margin-left: 50px;
  }
  @media (max-width: 1440px) {
    width: 300px;
  }
  @media (max-width: 1366px) {
    width: 310px;
  }
`;

export const SearchContainer = styled.div`
  margin-top: 74px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  border-radius: 24px;
  width: 776px;
  @media (max-width: 1920px) {
    width: 776px;
  }
  @media (max-width: 1440px) {
    width: 696px;
  }
  @media (max-width: 1366px) {
    width: 556px;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
