import appColors from 'utils/appColors';
import { withStyles, Tabs, Tab } from '@material-ui/core';

export const AntTabs = withStyles({
  root: {
    marginLeft: 0,
  },
  indicator: {
    backgroundColor: appColors.PRIMARY_COLOR,
  },
})(Tabs);

export const AntTab = withStyles((theme) => ({
  root: {
    '@media (min-width: 1025px)': {
      maxWidth: 300,
      whiteSpace: 'nowrap',
    },
    marginRight: 12,
    '& > span': {
      display: 'block',
      '@media (min-width: 1025px)': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    '&:hover': {
      color: appColors.PRIMARY_COLOR,
      opacity: 1,
    },
    '&$selected': {
      color: appColors.PRIMARY_COLOR,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: appColors.PRIMARY_COLOR,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);
