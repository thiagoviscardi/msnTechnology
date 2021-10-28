import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 30,
    zIndex: 99999,
  },
  paper: {
    position: 'absolute',
    backgroundColor: '#fafafa',
    borderRadius: 4,
    width: 485,
    height: 'auto',
    '@media (min-width: 610px)': {
      top: `28%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 600px)': {
      width: '90%',
      top: `30%`,
      left: '50%',
      transform: `translate(-50%)`,
    },
  },
}));

export const ModalInputContainer = styled(Paper)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 30px;
  min-width: 776px;
  @media (max-width: 1440px) {
    margin-left: 5%;
    margin-top: 3%;
  }
  @media (max-width: 1366px) {
    margin-left: 5%;
    margin-top: 3%;
  }
  @media (max-width: 1024px) {
    margin-left: 5%;
    margin-top: 5%;
    min-width: 700px;
  }
  @media (max-width: 768px) {
    margin-left: 23%;
    margin-top: 12%;
    min-width: 450px;
  }
`;
