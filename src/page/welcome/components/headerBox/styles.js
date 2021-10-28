import { makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  title: {
    fontSize: '36px',
    color: appColors.GRAY_TEXT_COLOR,
    fontFamily: 'Poppins',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  box: {
    display: 'flex',
    marginBottom: 35,
    alignItems: 'center',
    width: 370,
    justifyContent: 'space-around',
  },
  icon: { width: 13.33 },

  linkStyle: {
    textDecoration: 'none',
    color: appColors.GRAY_TEXT_COLOR,
    display: 'flex',
    alignItems: 'center',
    '&:hover': { color: appColors.PRIMARY_COLOR },
  },
}));
