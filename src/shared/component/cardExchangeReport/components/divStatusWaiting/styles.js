import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  vlWaiting: {
    borderLeft: '2px solid #BBBDBF',
    position: 'absolute',
    height: '55px',
    marginLeft: '30px',
  },
  hlWaiting: {
    borderLeft: '2px solid #787B80',
    position: 'absolute',
    height: '28px',
    marginLeft: '44px',
    marginTop: 44,
    transform: 'rotate(90deg)',
  },
  avatarWaiting: {
    width: '52px',
    height: '52px',
    border: '2px solid #787B80',
  },
  iconWaiting: {
    position: 'absolute',
    marginLeft: 26,
    marginTop: 53,
    fontSize: 10,
    color: '#787B80',
  },
}));
