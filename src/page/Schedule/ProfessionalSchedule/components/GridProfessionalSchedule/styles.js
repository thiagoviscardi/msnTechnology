import { makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';

export const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 150,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    backgroundColor: appColors.BACKGROUND_COLOR,
    height: 'auto',
    overflowX: 'hidden',
  },
  container_no_results: {
    display: 'flex',
    justifyContent: 'center',
    height: 100,
    paddingTop: 30,
  },
  no_results: {
    fontSize: 18,
    color: '#646464',
  },
}));
