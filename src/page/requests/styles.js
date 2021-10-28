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
    width: 152,
    borderRadius: 4,
    background: '#0F83AD',
    marginLeft: 24,
    textTransform: 'none',
  },
  registerText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    color: 'white',
  },
  rowButtons: {
    display: 'flex',
    marginRight: 80,
  },
}));

export const TableControl = styled.div`
  margin-right: 20px;
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
