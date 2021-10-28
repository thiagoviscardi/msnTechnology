import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    maxWidth: '100%',
  },
  day_cell_empty: {
    height: 90,
    width: 144,
    marginRight: 5,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
}));
