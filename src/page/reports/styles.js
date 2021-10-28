import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'white',
    borderRadius: 24,
    width: 776,
    img: {
      filter:
        ' invert(61%) sepia(84%) saturate(2014%) hue-rotate(160deg) brightness(100%) contrast(86%)',
    },
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
    flexWrap: 'wrap',
    margin: '20px 0px 0 30px',
  },
  inputWidth: {
    minWidth: '90%',
  },
}));
