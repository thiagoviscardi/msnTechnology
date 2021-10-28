import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    maxWidth: '100%',
    cursor: 'pointer',
    marginBottom: 10,
  },
  cell_add_buttom: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },

  button_add_cell: {
    flex: 1,
    padding: 5,
    minHeight: 146,
    height: 'auto',
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#A2A5A8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#A2A5A8',
    fontSize: 12,
    width: '100%',
  },
  button: {
    '@media (max-width: 1024px)': {
      width: 103,
    },
  },
}));
