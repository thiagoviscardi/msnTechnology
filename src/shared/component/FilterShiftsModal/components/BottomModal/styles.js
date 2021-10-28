import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  button: {
    color: 'gray',
    margin: 5,
  },
  button_filter: {
    margin: '10px 0',
    color: '#fff',
    height: 30,
  },
  closeBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    background: '#F5F5F5',
    paddingRight: 10,
  },
}));
