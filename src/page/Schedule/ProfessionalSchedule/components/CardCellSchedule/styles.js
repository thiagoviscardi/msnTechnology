import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    marginRight: 5,
  },
  day_cell: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: '5px 3px 5px 10px',
    marginBottom: 10,
    width: 144,
    height: 90,
  },
  div_controler: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    height: '100%',
    cursor: 'pointer',
  },
  hour: {
    fontSize: 10,
    fontWeight: 400,
    color: '#A2A5A8',
    whiteSpace: 'wrap',
    marginLeft: 18,
  },
  status: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 15,
    marginRight: 3,
  },
  value: {
    fontSize: 10,
    fontWeight: 400,
    color: '#A2A5A8',
    marginLeft: 18,
  },
}));
