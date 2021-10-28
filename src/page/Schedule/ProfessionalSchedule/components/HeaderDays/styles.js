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
    width: 144,
    marginRight: 5,
    textAlign: 'initial',
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
