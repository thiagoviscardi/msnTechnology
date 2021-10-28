import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    backgroundColor: '#fafafa',
    borderRadius: 4,
    padding: 24,
    height: 'auto',
    '@media (min-width: 1441px)': {
      minHeight: 500,
      width: '40%',
      top: `30%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 1440px)': {
      minHeight: 600,
      width: '55%',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 1024px)': {
      width: '90%',
      top: `30%`,
      left: '50%',
      transform: `translate(-50%)`,
    },
  },
}));

export const ContainerModal = styled.div``;
