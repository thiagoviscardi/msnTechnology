import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container_buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    bottom: 15,
    position: 'fixed',
    right: 20,
    maxWidth: 380,
  },
  button_cancel: {
    width: '184px',
    height: '32px',
    backgroundColor: 'transparent',
    border: '1px solid #A2A5A8',
    textTransform: 'capitalize',
    color: '#A2A5A8',
    fontSize: '12px',
    marginRight: '32px',
  },
  button_agendar: {
    width: '184px',
    height: '32px',
    backgroundColor: '#BBE9F9',
    textTransform: 'capitalize',
    color: '#0C6D90',
    fontSize: '12px',
  },
}));

export const ContainerModal = styled.div``;
