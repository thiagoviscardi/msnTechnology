import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  title: {
    fontSize: '18px',
    fontFamily: 'Poppins',
  },
  subTitle: {
    fontSize: '14px',
    marginRight: '14px',
    fontFamily: 'Nunito Sans',
    color: '#A2A5A8',
  },
}));

export const StyledIndividualReportCard = styled(Paper)`
  margin: 16px;
  min-width: 349px;
  max-width: 358px;
  min-height: 136px;
  height: 136px;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  border-radius: 10px;
  &:hover {
    background: #0f83ad;
    color: white;
  }
  @media (max-width: 1920px) {
    width: 268px;
    margin: 12px;
  }
  @media (max-width: 1440px) {
    min-width: 300px;
    margin: 9px;
  }
  @media (max-width: 1366px) {
    width: 268px;
    margin: 9px;
  }
  @media (max-width: 1024px) {
    width: 158px;
    margin: 12px;
  }
  @media (max-width: 768px) {
    width: 108px;
    margin: 9px;
    text-align: center;
  }
`;
