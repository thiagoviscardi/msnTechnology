import appColors from 'utils/appColors';
import { makeStyles, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  titleEscala: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontStyle: 'normaS',
    fontWeight: 400,
  },
  selectField: {
    width: 360,
  },
  selectFieldProfessional: {
    marginRight: 20,
    width: 360,
  },
  selectFieldProfessionalSeach: {
    marginRight: 10,
    width: 360,
  },
  selectFieldTypeScale: {
    width: 360,
    marginTop: '0.7em;',
  },
  budgetContainer: {
    width: 300,
    marginTop: '0.7em;',
  },
  MuiInputLabel: {
    zIndex: 0,
  },
  rootSelect: {
    marginTop: 10,
    display: 'flex',
  },
  signatureSelect: {
    marginLeft: 5,
  },
  proceduresSelect: {
    marginLeft: 5,
    marginBottom: 20,
  },
  containerDoctor: {
    display: 'flex',
  },
  containerMultiProfessional: {
    marginLeft: 50,
    display: 'flex',
  },
  textRadio: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontStyle: 'normaS',
    fontWeight: 400,
    marginTop: '0.9em',
  },
  textField: {
    width: '360px',
    height: '48px',
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  textFieldValue: {
    width: '168px',
    height: '48px',
    marginRight: 20,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 40,
  },
  radioContainer: {
    marginBottom: 48,
    marginTop: 40,
    marginLeft: 50,
  },
  titlesPaper: {
    fontFamily: 'Nunito Sans',
    fontSize: '16px',
    fontStyle: 'normal',
    marginBottom: 24,
    fontWeight: 400,
    color: '#505255',
  },
  paperSchedule: {
    width: '96px',
    height: '48px',
    marginRight: 24,
  },
  scheduleDuration: {
    width: '96px',
    height: '48px',
    marginRight: 24,
    background: '#F5F5F5',
  },
  ScheduleVagas: {
    width: '64px',
    height: '48px',
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
    color: 'white',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  rootButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 100,
    marginTop: 30,
  },
  buttonCancel: {
    height: 35,
    width: '152px',
    borderRadius: '4px',
    border: '1px solid #A2A5A8',
    textTransform: 'none',
    color: '#A2A5A8',
    fontSize: 12,
    marginRight: 24,
  },
  buttonSave: {
    height: 35,
    width: '152px',
    borderRadius: '4px',
    background: '#BBE9F9',
    textTransform: 'none',
    color: '#0F83AD',
    fontSize: 12,
  },
}));
export const DefaultContainer = styled.div`
  margin-left: 20px;
`;

export const TypographyAfter = styled(Typography)`
  font-family: 'Open Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #24b8ec;
`;

export const TypographyBefore = styled(Typography)`
  font-family: 'Open Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #a2a5a8;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 7px;
  margin-bottom: 7px;
  && ~ .MuiTypography-root {
    margin-top: 14px;
    margin-left: 10px;
    margin-bottom: 14px;
  }
`;

export const InputItem = styled.div`
  flex-grow: ${(props) => props.flexGrow || 1};
  margin: 3px 5px;
  min-width: 150px;
  flex: 1;
  align-content: stretch;
  flex-direction: row;
`;
