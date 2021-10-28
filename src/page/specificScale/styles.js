import appColors from 'utils/appColors';
import { makeStyles, withStyles, Tabs, Tab } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  container_pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  rowContainer: {
    marginTop: 120,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  progressContainer: {
    flex: 1,
    textAlign: 'center',
    marginTop: 150,
  },
  emptyMessage: {
    fontFamily: 'Poppins',
    fontSize: 48,
    fontStyle: 'normal',
    fontWeight: 500,
    color: '#D8D8DA',
  },
  messageContainer: {
    textAlign: 'center',
    marginTop: '12%',
  },
  pageButton: {
    width: 48,
    height: 32,
    background: '#ffffff',
    borderRadius: 6,
  },
  pageNumber: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#fff',
    marginTop: 3,
  },
  tableDiv: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    marginTop: 22,
  },
  chip: {
    marginRight: 16,
    padding: 0,
    height: '40px',
    borderRadius: '50px',
  },
  pageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
}));

export const AntTabs = withStyles({
  root: {
    marginLeft: 12,
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

export const ScreenContainer = styled.div`
  margin-left: 50px;
  @media (min-width: 1601px) {
    margin-left: 40px;
  }
  @media (max-width: 1600px) {
    margin-left: 20px;
  }
  @media (max-width: 1440px) {
    margin-left: 45px;
  }
  @media (max-width: 1024px) {
    padding-left: 50px;
    margin-top: 5px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;
