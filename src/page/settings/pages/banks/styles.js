import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  inputWidth: {
    minWidth: '90%',
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 1024px)': {
      marginTop: 25,
    },
  },
  registerButton: {
    height: 32,
    width: 152,
    borderRadius: 4,
    background: '#0F83AD',
  },
  registerText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    color: 'white',
  },
  buttonExport: {
    fontFamily: 'Nunito Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#24B8EC',
  },
  buttonRegister: {
    height: '32px',
    width: '152px',
    borderRadius: '4px',
    background: '#0F83AD',
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: '12px',
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
    padding-left: 70px;
    margin-top: 5px;
  }
`;

export const TableControl = styled.div`
  margin-top: 50px;
`;

export const SearchContainer = styled.div`
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
