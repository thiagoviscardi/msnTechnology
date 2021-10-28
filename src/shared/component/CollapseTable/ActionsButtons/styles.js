import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container_buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 10,
  },
  container_flex_end: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 10,
  },
  icon: {
    fontSize: 18,
  },
}));
