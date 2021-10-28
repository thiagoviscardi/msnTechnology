import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  columnModal: {
    backgroundColor: '#EDEDED',
    minWidth: '30%',
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
    marginTop: 90,
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
  modalMensager: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '17%',
    borderRadius: 30,
  },
  titleModal: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontweight: 400,
    color: '#505255',
    width: 304,
    height: 17,
    marginLeft: 24,
  },
  iconButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  userImage: {
    width: '104px',
    height: '104px',
    margin: '24px 24px 0px 24px',
    border: '3px solid #8FA1BF',
  },
  marginContainer: {
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
  sendText: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#24B8EC',
    textTransform: 'none',
  },
  bottomContainer: {
    marginBottom: 5,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  selectStyle: {
    width: 312,
    height: 10,
  },
}));

export const ModalContainer = styled(Paper)`
  border-radius: 10px;
  width: 488px;
  height: 328px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1024px) {
    width: 900px;
  }
  @media (max-width: 768px) {
    width: 700px;
  }
`;

export const ModalContainerMensager = styled(Paper)`
  border-radius: 10px;
  width: 380px;
  height: 296px;
  display: flex;
  @media (max-width: 1024px) {
    width: 900px;
  }
  @media (max-width: 768px) {
    width: 700px;
  }
`;
