import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    margin: 0,
  },
  specialty: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    margin: 0,
    color: '#A2A5A8',
  },
}));
