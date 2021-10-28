import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  header_days: {
    display: 'flex',
    width: '100%',
    '@media (max-width: 1024px)': {
      marginTop: 20,
    },
  },
  header_day_cell: {
    flex: 1,
    maxWidth: '100%',
    marginRight: 5,
    '@media (max-width: 1024px)': {
      marginRight: 1,
      paddingLeft: 5,
    },
  },
  header_day_title: {
    fontSize: 12,
    fontWeight: 400,
    marginRight: 5,
    color: '#BBBDBF',
  },
}));
