import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: '14%',
    marginTop: '9%',
    borderRadius: 30,
  },
}));

export const ModalContainer = styled(Paper)`
  background-color: #ffffff;
  overflow-y: auto;
  padding: 12px;
  width: 250px;
  height: 288px;
  margin-left: 0.6%;
  @media (max-width: 1756px) {
    margin-left: 5%;
    margin-top: 2%;
  }
  @media (max-width: 1024px) {
    margin-left: 14%;
    margin-top: 9%;
  }
  @media (max-width: 768px) {
    margin-left: 24%;
    margin-top: 12%;
    width: 473px;
  }
`;
