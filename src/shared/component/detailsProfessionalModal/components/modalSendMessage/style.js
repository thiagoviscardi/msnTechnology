import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
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
  selectContainer: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
  },
  container_select_button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: '0 24px',
    height: 200,
  },
  div_close_button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  iconButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonModalAlert: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 160,
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
}));

export const ModalContainerMensager = styled(Paper)`
  border-radius: 10px;
  height: 330px;
  display: flex;
`;
