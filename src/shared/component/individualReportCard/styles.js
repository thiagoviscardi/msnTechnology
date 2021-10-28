import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    textAlign: 'center',
  },
  qtdText: {
    fontFamily: 'Poppins',
    fontSize: '48px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '56px',
    textAlign: 'center',
  },
  show: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '18px',
    textAlign: 'center',
    marginTop: 16,
    color: appColors.PRIMARY_COLOR,
    textTransform: 'none',
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const StyledIndividualReportCard = styled(Paper)`
  margin: 10px;
  padding: 14px;
  width: 358px;
  min-height: 184px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${appColors.SECUNDARY_COLOR};
    color: white;
  }
  @media (max-width: 1920px) {
    width: 353px;
    height: 150px;
    margin: 3px;
  }
  @media (max-width: 1440px) {
    width: 353px;
    height: 150px;
    margin: 3px;
  }
  @media (max-width: 1366px) {
    width: 343px;
    height: 170px;
    margin: 6px;
  }
  @media (max-width: 1024px) {
    width: 169px;
    height: 150px;
    margin: 6px;
  }
  @media (max-width: 768px) {
    width: 470px;
    min-height: 300px;
    text-align: center;
    marginleft: 4px;
  }
`;
