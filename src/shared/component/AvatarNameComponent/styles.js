import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  avatar_view: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: { marginRight: 10, width: 35, height: 35 },
  name: {
    fontSize: 16,
  },
}));
