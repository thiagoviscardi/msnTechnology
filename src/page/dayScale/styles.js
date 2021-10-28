import appColors from 'utils/appColors';
import { makeStyles, withStyles, Tabs, Tab } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  rowContainer: {
    marginTop: 120,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  buttonHover: {
    '&:hover': {
      backgroundColor: appColors.PRIMARY_COLOR,
    },
  },
  filtro: {},
}));
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

export const DefaultContainer = styled.div`
  padding-top: 4%;
  text-align: flex-start;
  margin-left: 14%;
  @media (max-width: 1920px) {
    padding-top: 4%;
    margin-left: 14%;
  }
  @media (max-width: 1440px) {
    padding-top: 5%;
    margin-left: 18%;
  }
  @media (max-width: 1366px) {
    padding-top: 5%;
    margin-left: 18%;
  }
  @media (max-width: 1024px) {
    padding-top: 7%;
    margin-left: 25%;
  }
  @media (max-width: 768px) {
    padding-top: 7%;
    margin-left: 33%;
  }
`;
