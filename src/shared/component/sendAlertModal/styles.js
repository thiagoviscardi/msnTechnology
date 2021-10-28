import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  textAlert: {
    fontSize: 18,
    textAlign: 'center',
    color: '#505255',
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  ModalAlert: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '17%',
    borderRadius: 30,
  },
  subtitleAlert: {
    fontSize: 12,
    weight: 400,
    height: 31,
    textAlign: 'center',
    color: '#505255',
    fontFamily: 'Poppins',
  },
}));

export const ModalContainerAlert = styled(Paper)`
  border-radius: 10px;
  width: 360px;
  height: 304px;
  @media (max-width: 1024px) {
    width: 900px;
  }
  @media (max-width: 768px) {
    width: 700px;
  }
`;
