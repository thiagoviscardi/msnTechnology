import { makeStyles } from '@material-ui/styles';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  container_modal: {
    minWidth: 200,
    height: 100,
    padding: 10,
    background: '#FFFFFF',
    borderRadius: 5,
    border: `2px solid ${appColors.SECUNDARY_COLOR}`,
    display: 'flex',
    flexDirection: 'column',
  },
  container_loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  container_details: {
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
}));
