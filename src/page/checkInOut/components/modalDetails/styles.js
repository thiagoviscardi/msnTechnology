import { makeStyles, Paper } from '@material-ui/core';
import styled from 'styled-components';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  rowModal: {
    display: 'flex',
    flexDirection: 'column',
    height: '448px',
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '12%',
    borderRadius: 30,
  },
  detailsTextName: {
    fontFamily: 'Open Sans',
    marginTop: 16,
    fontSize: 18,
    color: '#505255',
  },
  detailsTextGroup: {
    fontFamily: 'Open Sans',
    marginTop: 8,
    fontSize: 14,
    color: '#505255',
  },
  textShifts: {
    marginBottom: 7,
    fontSize: 14,
    color: '#505255',
    width: '176px',
  },
  detailsTextCompany: {
    fontFamily: 'Open Sans',
    marginTop: 8,
    fontSize: 12,
    color: '#A2A5A8',
    border: '1px solid #A2A5A8',
    borderRadius: '100px',
    width: '136px',
    height: 24,
  },
  seeMore: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    color: '#24B8EC',
    textTransform: 'none',
    marginTop: 24,
  },
  iconDateContainer: {
    width: 128,
  },
  green: {
    color: '#008A00',
  },
  orange: {
    color: 'orange',
  },
  red: {
    color: 'red',
  },
  dateRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginRight: 0,
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderColor: '#A2A5A8',
  },
  textTitle: {
    fontSize: '16px',
    marginBottom: '10px',
    fontFamily: 'Open Sans',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#505255',
  },
  textTitleHour: {
    fontSize: '12px',
    fontFamily: 'Open Sans',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A2A5A8',
  },
  blueColor: {
    color: '#24B8EC',
    fontSize: 17,
    marginRight: 5,
    marginLeft: 2,
  },
  grayColor: {
    color: '#A2A5A8',
    fontSize: 17,
    marginRight: 5,
    marginLeft: 2,
  },
  textHourForecast: {
    fontFamily: 'Open Sans',
    fontSize: '12px',
    color: '#A2A5A8',
  },
  textHourWork: {
    fontFamily: 'Open Sans',
    fontSize: '12px',
    color: '#24B8EC',
  },
  titleModal: {
    fontFamily: 'Open Sans',
    fontSize: '12px',
    fontweight: 400,
    color: '#505255',
    width: 304,
    height: 17,
    marginLeft: 24,
  },
  iconButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  circleContainer: {
    marginLeft: 20,
    marginRight: 60,
    width: 96,
    height: 96,
  },
  progressText: {
    textAlign: 'center',
    color: appColors.PRIMARY_COLOR,
    fontSize: 24,
  },
  scrollContainer: {
    maxHeight: 180,
    overflowY: 'scroll',
    marginTop: 12,
    marginBottom: 12,
  },
  loadingContainer: {
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
  textWorkHour: {
    fontFamily: 'Open Sans',
    fontSize: '12px',
    color: '#A2A5A8',
  },
  link_to_schedule: {
    textDecoration: 'none',
    width: '144px',
    color: '#24B8EC',
    fontSize: '12px',
    borderBottom: '1px solid #E9E9E9',
    paddingBottom: '.5rem',
  },
}));

export const ModalContainer = styled(Paper)`
  border-radius: 10px;
  width: 750px;
  height: 448px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1024px) {
    width: 900px;
  }
  @media (max-width: 768px) {
    width: 700px;
  }
`;

export const PrevistTime = styled.div`
  font-family: 'Open Sans';
  font-size: 12px;
  font-style: normal;
  color: ${appColors.CIRURGICAL};
`;

export const WorkedHours = styled.div`
  font-family: 'Open Sans';
  font-size: 12px;
  font-style: normal;
  color: ${appColors.PRIMARY_COLOR};
`;
