import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import styled from 'styled-components';
import appColors from 'utils/appColors';

export const StyledFormControlLabel = styled.div`
  .MuiFormControlLabel-root {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
`;

export const ButtonSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 21,
    padding: 1,
  },
  switchBase: {
    color: 'white',
    '& + $track': {
      backgroundColor: '#DEDEDE',
      opacity: 1,
      border: 'none',
    },
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: appColors.PRIMARY_COLOR,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: appColors.PRIMARY_COLOR,
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 19,
    height: 17,
    marginLeft: 5,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => (
  <StyledSwitch>
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  </StyledSwitch>
));

const StyledSwitch = styled.div`
  .MuiSwitch-sizeSmall .MuiSwitch-switchBase {
    padding: 2px;
  }
`;
