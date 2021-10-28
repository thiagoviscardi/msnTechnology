import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container_buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 10,
  },
  icon: {
    fontSize: 24,
  },
  textTable: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#24B8EC',
  },
}));
