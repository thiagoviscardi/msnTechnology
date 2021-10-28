import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  title: {
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'left',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'left',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export const StyledDetailsReportCard = styled(Paper)`
  padding: 10px;
  min-height: 624px;
  border-radius: 4px;
`;
