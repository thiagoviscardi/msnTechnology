import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  alertText: {
    color: 'red',
    marginTop: 9,
  },
}));

export const ContainerModal = styled.div``;

export const TableLegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;

  div {
    background: ${({ color }) => color};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
    content: '';
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  font-size: 13px;
  color: red;
  margin-left: 10px;
`;
