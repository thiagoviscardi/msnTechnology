import { makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';

export default makeStyles({
  root: {
    marginTop: 124,
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  pagination_control: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
});
