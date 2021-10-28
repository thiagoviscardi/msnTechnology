import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  left_column_modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: 10,
    width: '152px',
    height: '448px',
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    textAlign: 'center',
    minWidth: '30%',
  },
  right_column_modal: {
    minWidth: '70%',
    paddingLeft: 24,
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '12%',
    borderRadius: 30,
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderColor: '#A2A5A8',
    height: 10,
    marginTop: 10,
  },
}));

export const ModalContainer = styled(Paper)`
  border-radius: 10px;
  width: 488px;
  height: 448px;
  display: flex;
  justify-content: space-between;
`;
