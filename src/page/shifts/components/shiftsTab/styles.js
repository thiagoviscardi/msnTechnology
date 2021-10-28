import { withStyles, Tabs, Tab } from '@material-ui/core';
import appColors from 'utils/appColors';

export const AntTabs = withStyles({
  root: {
    marginLeft: 12,
    marginTop: 30,
  },
  indicator: {
    backgroundColor: appColors.PRIMARY_COLOR,
  },
})(Tabs);

export const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 90,
    marginRight: 12,
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
