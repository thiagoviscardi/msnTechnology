import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import appColors from 'utils/appColors';
const drawerWidth = 240;

export const styles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export const DefaultContainer = styled.div`
  padding-top: 7%;
  text-align: flex-start;
  margin-left: 14%;
  @media (max-width: 1750px) {
    padding-top: 9%;
    margin-left: 18%;
  }
  @media (max-width: 1024px) {
    padding-top: 12%;
    margin-left: 25%;
  }
  @media (max-width: 768px) {
    padding-top: 21%;
    margin-left: 33%;
  }
`;
