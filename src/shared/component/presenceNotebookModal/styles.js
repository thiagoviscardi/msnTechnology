import { makeStyles, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    marginLeft: '14%',
    marginTop: '9%',
    borderRadius: 30,
  },
  select: {
    display: 'flex',
    flexDirection: 'column',
  },
  rootz: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  buttonContainer: {
    display: ' flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 24,
    marginTop: 40,
  },
  textModal: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'left',
    margin: 24,
  },
  subtitle: { display: 'flex' },

  subTextModal: {
    fontFamily: 'Poppins',
    color: '#A2A5A8',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    width: 256,
    textAlign: 'left',
    marginTop: 24,
    marginLeft: 25,
  },
  buttonCancel: {
    display: 'flex',
    width: '96px',
    height: '32px',
    borderRadius: '4px',
    border: ' 1px solid #A2A5A8',
    marginRight: 16,
  },
  textCancel: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    marginLeft: 12,
    textAlign: 'center',
    textTransform: 'none',
    color: '#A2A5A8',
  },

  buttonExport: {
    display: 'flex',
    width: '224px',
    height: '32px',
    borderRadius: '4px',
    border: ' 1px solid #BBE9F9',
    background: '#BBE9F9',
    '&:hover': {
      backgroundColor: '#0F83AD',
    },
  },
  textExport: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    marginLeft: 11,
    textAlign: 'center',
    textTransform: 'none',
    color: '#0F83AD',
    '&:hover': {
      color: 'white',
    },
    radioContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  },
}));

export const ModalNotebookContainer = styled(Paper)`
  border-radius: 4px;
  min-width: 616px;
  height: 512px;
  @media (max-width: 1756px) {
    margin-left: 5%;
    margin-top: 2%;
  }
  @media (max-width: 1024px) {
    margin-left: 14%;
    margin-top: 9%;
    min-width: 550px;
  }
  @media (max-width: 768px) {
    margin-left: 23%;
    margin-top: 12%;
    min-width: 450px;
  }
`;

export const DefaultContainer = styled.div`
  padding-top: 4%;
  text-align: flex-start;
  margin-left: 14%;
  @media (max-width: 1750px) {
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

export const ModalContainerAlert = styled(Paper)`
  border-radius: 10px;
  width: 360px;
  height: 304px;
  display: flex;
  @media (max-width: 1024px) {
    width: 900px;
  }
  @media (max-width: 768px) {
    width: 700px;
  }
`;

export const TypographyAfter = styled(Typography)`
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #24b8ec;
`;

export const TypographyBefore = styled(Typography)`
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #a2a5a8;
`;
