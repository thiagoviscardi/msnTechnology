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
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerSearch: {
    backgroundColor: 'white',
    borderRadius: 24,
    border: '1px solid #e9e9e9',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    flex: 1,
    marginRight: 20,
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
    fontFamily: 'Poppins',
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
    alignItems: 'center',
  },
  status_view: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#ccc',
  },
}));

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 80px;
  @media (max-width: 1920px) {
    margin-right: 80px;
  }
  @media (max-width: 1600px) {
    margin-right: 20px;
  }
  @media (max-width: 1440px) {
    margin-right: 0px;
  }
  @media (max-width: 1024px) {
    margin-right: 20px;
  }
`;

export const ScreenContainer = styled.div`
  margin-left: 50px;
  margin-top: 30px;
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

export const TableControl = styled.div`
  margin-top: 50px;
`;
