import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 500,
    textAlign: 'center',
    marginTop: 16,
  },
  specialty: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    marginTop: 8,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  company: {
    color: appColors.THIRD_COLOR,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
  },
  unit: {
    color: appColors.THIRD_COLOR,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
  },
  schedule: {
    color: appColors.THIRD_COLOR,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    textAlign: 'center',
    marginTop: 5,
  },
  borderHospital: {
    borderColor: appColors.THIRD_COLOR,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 100,
    width: 148,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  date: {
    marginLeft: 3,
    color: appColors.THIRD_COLOR,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
  },
}));

export const StyledIndividualReportCard = styled(Paper)`
  margin: 16px;
  padding: 12px;
  width: 273px;
  min-height: 312px;
  border-radius: 9px;
  @media (max-width: 1920px) {
    width: 273px;
    min-height: 312px;
  }
  @media (max-width: 1440px) {
    width: 269px;
    min-height: 309px;
    margin: 7px;
  }
  @media (max-width: 1366px) {
    width: 258px;
    min-height: 312px;
    margin: 10px;
    padding: 3px;
  }
  @media (max-width: 1024px) {
    width: 240px;
    min-height: 312px;
    margin: 6px;
  }
  @media (max-width: 768px) {
    width: 200px;
    min-height: 312px;
    margin: 4px;
    margin-left: 40px;
  }
`;
