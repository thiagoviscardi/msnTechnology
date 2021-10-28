import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  title: {
    fontSize: 16,
    fontWeight: 400,
    color: '#8B8E93',
    textAlign: 'left',
    marginBottom: 16,
  },
}));

export const StyledDetailsReportCard = styled(Paper)`
  margin: 18px;
  padding: 15px;
  width: 228px;
  max-width: 228px;
  border-radius: 10px;
  @media (max-width: 1831px) {
    width: 353px;
    margin: 11px;
  }
  @media (max-width: 1750px) {
    width: 228px;
    margin: 0px 15px 25px 0px;
  }
  @media (max-width: 1024px) {
    width: 210px;
    margin: 10px;
  }
  @media (max-width: 768px) {
    width: 300px;
    margin: 9px;
    align-self: center;
  }
`;
