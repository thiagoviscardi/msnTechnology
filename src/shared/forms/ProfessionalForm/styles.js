import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    paddingBottom: 40,
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
}));
