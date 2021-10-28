import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container_tooltip: {
    width: '100%',
  },
  name_schedule: {
    color: '#505255',
    fontSize: 13,
    fontWeight: 600,
  },
  hour_schedule: {
    color: '#A2A5A8',
    marginTop: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  unit_name: {
    color: '#A2A5A8',
    marginTop: 10,
    fontSize: 12,
    fontWeight: 500,
  },
  button: {
    fontSize: 11,
    marginTop: 5,
    textTransform: 'unset',
  },
  icon_edit: {
    width: 15,
    height: 15,
  },
}));
