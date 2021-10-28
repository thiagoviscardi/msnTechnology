import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  ballModalClimbed: {
    borderRadius: '50% ',
    position: 'absolute',
    height: '6px',
    width: '6px',
    border: '1px solid  #1F437F',
    backgroundColor: ' #1F437F',
  },
  ballModalDone: {
    borderRadius: '50% ',
    position: 'absolute',
    height: '6px',
    width: '6px',
    border: '1px solid  #24B8EC',
    backgroundColor: ' #24B8EC',
  },
  ballModalOccurring: {
    borderRadius: '50% ',
    position: 'absolute',
    height: '6px',
    width: '6px',
    border: '1px solid   #5AC17F',
    backgroundColor: '  #5AC17F',
  },
  rowModal: {
    display: 'flex',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '152px',
    height: '448px',
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    textAlign: 'center',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '12%',
    borderRadius: 30,
  },
  detailsText: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    marginBottom: '20px',
  },
  buttonModal: {
    textAlign: 'flex-start',
  },
  buttonModalAlert: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 160,
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderColor: '#A2A5A8',
  },
  textTitle: {
    fontSize: '12px',
    marginBottom: '6px',
    fontFamily: 'Poppins',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A2A5A8',
  },
  textTitleHour: {
    fontSize: '12px',
    fontFamily: 'Poppins',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A2A5A8',
  },
  modalMensager: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '17%',
    borderRadius: 30,
  },
  titleModal: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: '#505255',
    width: 304,
    marginLeft: 24,
    marginTop: 18,
  },
  iconButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  avatarEscalado: {
    width: '104px',
    height: '104px',
    margin: '24px 24px 0px 24px',
    border: '3px solid #8FA1BF',
  },
  realizadoAvatar: {
    width: '104px',
    height: '104px',
    margin: '24px 24px 0px 24px',
    border: '3px solid #BBE9F9',
  },
  ocorrendoAvatar: {
    width: '104px',
    height: '104px',
    margin: '24px 24px 0px 24px',
    border: '3px solid #99D9B0',
  },
  rowLine: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
  },
  marginScaleType: {
    marginLeft: 10,
  },
  hourContainer: {
    fontSize: '12px',
    width: 120,
    height: 32,
  },
  professionalSchedule: {
    textDecoration: 'none',
    fontSize: '12px',
    color: '#24B8EC',
    fontFamily: 'Poppins',
  },
  emailIconContainer: {
    display: 'flex',
    marginRight: 50,
  },
  emailIcon: {
    fontSize: 20,
    color: '#24B8EC',
    marginRight: 5,
  },
  sendIcon: {
    fontSize: '18px',
    color: '#24B8EC',
    marginRight: 5,
  },
  sendAlertText: {
    fontSize: '12px',
    color: '#24B8EC',
    textTransform: 'none',
  },
  selectContainer: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
  },
}));

export const ModalContainer = styled(Paper)`
  border-radius: 10px;
  width: 488px;
  height: 448px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1024px) {
    width: 900px;
  }
  @media (max-width: 768px) {
    width: 700px;
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
