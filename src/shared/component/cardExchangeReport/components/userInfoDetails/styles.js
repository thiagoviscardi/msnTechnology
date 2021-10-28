import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  data: {
    marginLeft: 10,
    maxWidth: 228,
  },
  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 130,
  },
  specialty: {
    fontSize: '12px',
    width: '128px',
    height: '16px',
    color: '#8B8E93',
    marginBottom: 8,
  },
  schedule: {
    fontSize: '12px',
    width: 90,
    height: '16px',
    color: '#8B8E93',
  },
}));
