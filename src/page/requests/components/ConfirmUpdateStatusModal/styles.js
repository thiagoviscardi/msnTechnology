import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  container: {
    textAlign: 'center',
    background: 'white',
    height: 150,
    width: 420,
    padding: 30,
  },
  cancelButton: {
    fontWeight: 'bold',
    color: '#505255',
    border: '1px solid #24B8EC',
  },
  confirmButton: {
    background: '#24B8EC',
    fontWeight: 'bold',
    border: '1px solid #24B8EC',
    color: 'white',
    '&:hover': {
      color: '#24B8EC',
    },
  },
  message: {
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 21,
  },
}));
