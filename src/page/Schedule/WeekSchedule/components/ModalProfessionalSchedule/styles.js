import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  loading_container: {
    width: '100%',
    height: 450,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    position: 'absolute',
    backgroundColor: '#fafafa',
    borderRadius: 4,
    '@media (min-width: 1441px)': {
      height: 'auto',
      width: '40%',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 1440px)': {
      height: 'auto',
      width: '50%',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 1024px)': {
      width: '90%',
      top: `30%`,
      left: '50%',
      transform: `translate(-50%)`,
    },
  },
  left_grid: {
    backgroundColor: '#F5F5F5',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
  },
  right_grid: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'space-between',
    padding: '10px 0 10px 20px',
  },
}));

export const ContainerModal = styled.div``;

export const TableLegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;

  div {
    background: ${({ color }) => color};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 8px;
    content: '';
  }
`;
