import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {},
  container_buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 10,
  },
  button: { padding: 0, marginRight: 5 },
  icon: {
    fontSize: 23,
  },
}));
