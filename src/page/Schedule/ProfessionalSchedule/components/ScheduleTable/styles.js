import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export const TableContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 1856px) {
    overflow-x: scroll;
    ::-webkit-scrollbar-track {
      background-color: #f4f4f4;
    }
    ::-webkit-scrollbar {
      width: 1px;
      height: 5px;
      background: #f4f4f4;
    }
    ::-webkit-scrollbar-thumb {
      background: #a2a5a8;
      border-radius: 10px;
    }
  }
`;
