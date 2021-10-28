import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    maxWidth: '100%',
    marginRight: 5,
  },
  day_cell_empty: {
    height: 146,
    marginRight: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
}));
