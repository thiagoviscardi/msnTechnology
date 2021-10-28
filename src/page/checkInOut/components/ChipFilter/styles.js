import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0px 5px 8px',
    background: '#D8D8DA',
    borderRadius: 50,
    marginLeft: 8,
    marginRight: 8,
  },
  filterName: {
    margin: '0px 5px 0px 0px',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#787B80',
  },
}));
