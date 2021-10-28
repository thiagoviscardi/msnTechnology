import { withStyles, Switch } from '@material-ui/core';

export const AntSwitch = withStyles(() => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    marginLeft: 12,
    marginRight: 12,
  },
  switchBase: {
    padding: 2,
    '&$checked': {
      transform: 'translateX(12px)',
      opacity: 1,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#24B8EC',
        borderColor: '#24B8EC',
      },
      '& $thumb': {
        color: '#dadada',
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
    color: '#a2a5a8',
  },

  track: {
    border: `1px solid #a2a5a8`,
    borderRadius: 16 / 2,
    opacity: 1,
    background: 'transparent',
  },
  checked: {},
}))(Switch);
