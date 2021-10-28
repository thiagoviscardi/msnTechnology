import { makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';

export default makeStyles({
  root: {
    width: '100%',
    backgroundColor: appColors.BACKGROUND_COLOR,
    // backgroundColor: appColors.red,
  },
  container: {
    // maxHeight: 440,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    marginTop: 100,
  },
  pagination_control: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  cardsControl: {
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
});
