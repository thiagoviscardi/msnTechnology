import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: '14%',
    marginTop: '8%',
  },
  closeBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    background: '#F5F5F5',
    padding: 0,
    margin: 0,
  },
  icon: {
    fontSize: 20,
    color: '#24B8EC',
  },
  text: {
    fontSize: 14,
    color: '#24B8EC',
    fontFamily: 'Poppins',
    fontWeight: '500',
    marginLeft: '12px',
  },

  buttonFilter: {
    height: '30px',
    marginTop: 2,
    width: '96px',
    borderRadius: '4px',
    background: '#0F83AD',
    color: '#fff',
    textTransform: 'none',
    fontSize: 14,
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerSearch: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: 180,
    height: 20,
  },
  inputSearch: {
    flex: 1,
    padding: 3,
  },
  searchIcon: {
    color: '#24B8EC',
    fontSize: 18,
  },
}));

export const ModalFilter = styled.form`
  padding: 12px;
  width: 430px;
  height: 288px;
  margin-top: ${({ top }) => (top ? top : '')};
  margin-left: ${({ left }) => (left ? left : '')};
  background-color: #fafafa;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
