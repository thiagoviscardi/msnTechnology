import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    minwidth: '100%',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  inputWidth: {
    minWidth: '100%',
  },

  inputContainer: {
    marginTop: 74,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  inputSearch: {
    flex: 1,
    padding: 5,
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
}));

export const DefaultContainer = styled.div`
  text-align: flex-start;
  margin-left: 14%;
  @media (max-width: 1920px) {
    padding-top: 6%;
    margin-left: 14%;
  }
  @media (max-width: 1440px) {
    padding-top: 7%;
    margin-left: 19%;
  }
  @media (max-width: 1366px) {
    padding-top: 7%;
    margin-left: 20%;
  }
  @media (max-width: 1024px) {
    padding-top: 12%;
    margin-left: 25%;
  }
  @media (max-width: 768px) {
    padding-top: 15%;
    margin-left: 33%;
  }
`;

export const TableControl = styled.div`
  margin-top: 50px;
`;

export const InputContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 24px;
  width: 600px;
  @media (max-width: 1920px) {
    width: 650px;
  }
  @media (max-width: 1440px) {
    width: 600px;
  }
  @media (max-width: 1366px) {
    width: 556px;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (max-width: 1600px) {
    width: 500px;
  }
  @media (max-width: 1660px) {
    width: 500px;
  }
`;
export const InputSelect = styled.div`
  width: 200px;
  background-color: white;
  height: 40px;
  border-radius: 16px;
  @media (max-width: 1920px) {
    width: 285px;
  }
  @media (max-width: 1440px) {
    width: 200px;
  }
  @media (max-width: 1600px) {
    width: 250px;
  }
  @media (max-width: 1660px) {
    width: 250px;
  }
`;
