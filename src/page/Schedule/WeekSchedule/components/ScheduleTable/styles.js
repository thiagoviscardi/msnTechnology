import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  subtitle: {
    fontSize: 12,
  },
  schedule: {
    fontSize: 18,
    fontWeight: 400,
  },
  remaining_vacancies: {
    fontSize: 12,
    marginTop: 16,
    '@media (max-width: 1024px)': {
      marginBottom: 10,
    },
  },
}));

export const TableContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 1024px) {
    overflow-x: scroll;
  }
`;
