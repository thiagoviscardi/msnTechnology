import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  modal: {
    position: 'absolute',
    display: 'flex',
    marginLeft: '40%',
    marginTop: '16%',
    borderRadius: 30,
  },
  divPrincipal: {
    width: 360,
  },

  divIcon: {
    display: 'flex',
    justifyContent: 'center',
  },

  textModal: {
    fontFamily: 'Open Sans',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: 25,
  },

  successIcon: {
    fontSize: 150,
    marginTop: 32,
    filter:
      'invert(79%) sepia(11%) saturate(1782%) hue-rotate(87deg) brightness(84%) contrast(85%)',
  },

  cancelIcon: {
    fontSize: 150,
    marginTop: 32,
    filter:
      'invert(8%) sepia(100%) saturate(7453%) hue-rotate(3deg) brightness(98%) contrast(112%)',
  },

  subTextModal: {
    fontFamily: 'Open Sans',
    color: '#A2A5A8',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    width: 256,
    textAlign: 'left',
    paddingLeft: '24px',
  },

  buttonRoot: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonSave: {
    height: '32px',
    width: '152px',
    borderRadius: '4px',
    background: '#0F83AD',
    textTransform: 'none',
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonCancel: {
    height: '32px',
    width: '152px',
    borderRadius: '4px',
    border: '1px solid #A2A5A8',
    textTransform: 'none',
    color: '#A2A5A8',
    fontSize: 16,
  },
}));

export const ModalSuccessScale = styled(Paper)`
  border-radius: 4px;
  width: 360px;
  height: fit-content;
  @media (max-width: 1756px) {
    margin-left: 5%;
    margin-top: 2%;
  }
  @media (max-width: 1024px) {
    margin-left: 14%;
    margin-top: 9%;
  }
  @media (max-width: 768px) {
    margin-left: 23%;
    margin-top: 12%;
  }
`;
