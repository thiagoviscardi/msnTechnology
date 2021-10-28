import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 30,
    marginLeft: '10%',
    border: 'solid 10px transparent',
    boxShadow: 'none',
    background: 'transparent',
  },
  paperContainer: {
    position: 'absolute',
    left: 93,
    top: 160,
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 30,
    minWidth: 776,
  },
}));
