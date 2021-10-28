import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    textAlign: 'flex-start',
    width: '40%',
    '@media (max-width: 1024px)': {
      width: '50%',
    },
  },
  scrollContainer: {
    maxHeight: 210,
    overflowY: 'scroll',
    marginTop: 12,
    marginBottom: 12,
  },
  loadingContainer: {
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
  subText: {
    color: '#606367',
    width: 488,
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  inputWidth: {
    minWidth: '100%',
  },
}));
