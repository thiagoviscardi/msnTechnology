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
    width: 155,
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
  container_expand: {
    marginLeft: 50,
  },
  content_title: {
    fontSize: 14,
    color: '#A2A5A8',
    margin: '5px 0',
  },
}));

export const ScreenContainer = styled.div`
  margin-left: 50px;
  margin-top: 20px;
  @media (min-width: 1601px) {
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
