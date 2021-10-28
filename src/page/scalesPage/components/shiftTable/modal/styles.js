import { makeStyles, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  modal: {
    position: 'absolute',
    display: 'flex',
    marginLeft: '29%',
    marginTop: '16%',
    borderRadius: 30,
  },
  select: {
    display: 'flex',
    flexDirection: 'row',
  },
  rootModal: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '24px',
  },
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  iconButton: {
    marginTop: 18,
    width: 20,
    height: 20,
    marginRight: 29,
    color: '#505255',
  },
  inputContainer: {
    display: 'flex',
    paddingLeft: '24px',
  },
  inputValues: {
    height: '48px',
    width: '168px',
    borderRadius: '4px',
    marginRight: 24,
  },
  inputVacacines: {
    height: '48px',
    width: '72px',
    borderRadius: '4px',
    marginBottom: 12,
  },
  buttonContainer: {
    display: ' flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 24,
  },
  textModal: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'left',
    marginTop: 24,
    marginBottom: 15,
  },
  textValues: {
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
    marginBottom: 30,
    paddingLeft: '24px',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#A2A5A8',
    marginTop: 30,
    marginBottom: 15,
    paddingLeft: '24px',
  },

  subTextModal: {
    fontFamily: 'Poppins',
    color: '#A2A5A8',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    width: 256,
    textAlign: 'left',
    marginBottom: 7,
    paddingLeft: '24px',
  },

  buttonExport: {
    display: 'flex',
    width: '224px',
    height: '32px',
    borderRadius: '4px',
    border: ' 1px solid #0F83AD',
    background: '#0F83AD',
    marginBottom: 24,
  },
  textExport: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    textAlign: 'center',
    textTransform: 'none',
    color: 'white',

    radioContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  },
}));

export const ModalChangeDuty = styled(Paper)`
  border-radius: 4px;
  min-width: 616px;
  height: 392px;
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
