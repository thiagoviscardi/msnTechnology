import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';
// import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  container_layout: {
    margin: '100px 25px 0px 25px',
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: 'solid 1px #E9E9E9',
    background: '#FFFFFF',
    boxSizing: 'border-box',
    borderRadius: 30,
    width: 776,
    height: 48,
    padding: 5,
    marginLeft: 0,
  },
  cards: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
    flexWrap: 'wrap',
    margin: '20px 0px 0 30px',
  },

  title: {
    color: '#505255',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 36,
    width: '30%',
    height: 50,
    marginLeft: 0,
  },

  SearchIcon: {
    marginLeft: '2%',
    marginTop: '0.5%',
    color: '#24B8EC',
    marginRight: '3%',
  },

  CloseIcon: {
    marginTop: '0.5%',
    marginRight: '1%',
    marginLeft: '5%',
    color: '#A2A5A8',
  },
}));

export const ScreenContainer = styled.div``;
