import appColors from 'utils/appColors';
import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  title: {
    fontSize: '14px',
    color: appColors.GRAY_TEXT_COLOR,
  },
  qtdText: {
    fontSize: '36px',
    color: appColors.GRAY_TEXT_COLOR,
  },
}));

export const StyledReportCard = styled(Paper)`
  margin: 18px;
  width: 358px;
  height: 128px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 1920px) {
    width: 353px;
    height: 128px;
    margin: 11px;
  }
  @media (max-width: 1440px) {
    width: 353px;
    height: 128px;
    margin: 11px;
  }
  @media (max-width: 1366px) {
    width: 343px;
    height: 128px;
    margin: 14px;
  }
  @media (max-width: 1024px) {
    width: 350px;
    margin: 12px;
    height: 128px;
  }
  @media (max-width: 768px) {
    width: 226px;
    height: 128px;
    text-align: center;
    margin: 12px;
  }
`;
