import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    backgroundColor: '#fafafa',
    borderRadius: 4,
    width: 450,
    // minHeight: 328,
    height: 'auto',
    '@media (min-width: 610px)': {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 600px)': {
      width: '90%',
      top: `30%`,
      left: '50%',
      transform: `translate(-50%)`,
    },
  },
  containerCheckbox: {
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'nowrap',
    paddingTop: 12,
  },
  groupTopModal: {
    padding: 5,
  },
  label: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 12,
    margin: '10px 0',
  },
}));

export const ContainerModal = styled.div``;

export const ContainerSpecialties = styled.div`
  margin: 10px 10px 40px 10px;
`;
