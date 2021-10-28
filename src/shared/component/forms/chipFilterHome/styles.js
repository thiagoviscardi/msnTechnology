import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0px 5px 8px',
    background: '#0F83AD',
    width: 'fit-content',
    float: 'left',
    borderRadius: 50,
    margin: 5,
  },
  filterName: {
    margin: '0px 5px 0px 0px',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    color: 'white',
  },
}));
