import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  hlConfirm: {
    borderLeft: '2px solid #24B8EC',
    position: 'absolute',
    height: '36px',
    marginLeft: '50px',
    marginTop: 37,
    transform: 'rotate(90deg)',
  },
  isConfirm: {
    borderLeft: '2px solid  #BBE9F9',
    height: 37,
    position: 'absolute',
    marginLeft: '30px',
    marginTop: -35,
  },
  vlConfirm: {
    borderLeft: '2px solid  #BBE9F9',
    height: '54px',
    position: 'absolute',
    marginLeft: '30px',
  },
  avatarConfirm: {
    width: '52px',
    height: '52px',
    border: '2px solid #BBE9F9',
  },
  iconConfirm: {
    position: 'absolute',
    marginLeft: 26,
    marginTop: 50,
    fontSize: 10,
    color: '#24B8EC',
  },
}));
