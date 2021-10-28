import appColors from 'utils/appColors';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  rootz: {
    display: 'flex',
    marginBottom: 25,
    marginTop: 0,
  },
  textFieldValue: {
    width: '168px',
    height: '48px',
    marginBottom: 10,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  radioContainer: {
    marginTop: 20,
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderColor: '#A2A5A8',
  },
  titlesPaper: {
    fontSize: '16px',
    fontStyle: 'normal',
    color: '#505255',
  },
  titlesPaperValues: {
    fontSize: '16px',
    fontStyle: 'normal',
    marginBottom: 24,
    color: '#505255',
    marginTop: 35,
  },
  paperSchedule: {
    width: '96px',
    height: '48px',
    marginRight: 24,
    color: '#F5F5F5',
    marginBottom: 10,
  },
  scheduleDuration: {
    width: '96px',
    height: '48px',
    borderRadius: 4,
    marginRight: 24,
    marginBottom: 10,
  },
  checkBoxRoot: {
    marginTop: 24,
  },
  ScheduleVagas: {
    width: '66px',
    height: '48px',
    marginBottom: 12,
  },
  textValue: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#A2A5A8',
  },
  titleButton: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#0F83AD',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#0F83AD',
  },
  button: {
    height: '32px',
    width: '200px',
    left: '380px',
    borderRadius: '4px',
    background: '#BBE9F9',
    textTransform: 'none',
    marginRight: 24,
  },
}));

export const PaperContainerScales = styled(Paper)`
  background-color: white;
  padding: 24px;
  width: 616px;
  min-height: 536px;
  @media (max-width: 1920px) {
    margin-left: 3.5%;
  }
  @media (max-width: 1440px) {
    margin-left: 9%;
    margin-top: 3%;
  }
  @media (max-width: 1366px) {
    margin-left: 9%;
    margin-top: 3%;
  }
  @media (max-width: 1024px) {
    margin-left: 14%;
    margin-top: 9%;
  }
  @media (max-width: 768px) {
    margin-left: 24%;
    margin-top: 12%;
    width: 473px;
  }
`;

export const TypographyAfter = styled(Typography)`
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #24b8ec;
`;

export const TypographyBefore = styled(Typography)`
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #a2a5a8;
`;
// const InputContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;
// const FormContainer = styled.div`
//   margin: 0;
// `;

// const InputItem = styled.div`
//   width: 96px;
//   height: 48px;
//   marginright: 24;
//   color: #f5f5f5;
//   margin: 0 10px;
// // `;

// export { InputContainer, InputItem, FormContainer };
