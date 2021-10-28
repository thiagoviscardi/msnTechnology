import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  messageContainer: {
    height: 56,
    width: 360,
    borderRadius: 4,
    marginLeft: 24,
    background: '#E5E5E5',
    display: 'flex',
    padding: '12px 8px',
  },
  messageLogo: {
    fontFamily: 'Nunito Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    marginLeft: 10,
    color: '#8B8E93',
  },
}));
