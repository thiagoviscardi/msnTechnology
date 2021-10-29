import { makeStyles, Typography } from '@material-ui/core';
import styled from 'styled-components';
import appColors from 'utils/appColors';
export const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'scroll',
    marginTop: 30,
    '@media (min-width: 1921px)': {
      maxWidth: '83vw',
    },
    '@media (max-width: 1920px)': {
      maxWidth: '83vw',
    },
    '@media (max-width: 1660px)': {
      maxWidth: '81vw',
    },
    '@media (max-width: 1600px)': {
      maxWidth: '80vw',
    },
    '@media (max-width: 1440px)': {
      maxWidth: '78vw',
    },
    '@media (max-width: 1400px)': {
      maxWidth: '78vw',
    },
    '@media (max-width: 1360px)': {
      maxWidth: '76vw',
    },
    '@media (max-width: 1024px)': {
      maxWidth: '70vw',
    },
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  },
  rootClose: {
    overflowX: 'scroll',
    marginTop: 30,
    '@media (min-width: 1921px)': {
      maxWidth: '83vw',
    },
    '@media (max-width: 1920px)': {
      maxWidth: '100vw',
    },
    '@media (max-width: 1660px)': {
      maxWidth: '100vw',
    },
    '@media (max-width: 1600px)': {
      maxWidth: '92vw',
    },
    '@media (max-width: 1500px)': {
      maxWidth: '90vw',
    },
    '@media (max-width: 1440px)': {
      maxWidth: '90vw',
    },
    '@media (max-width: 1400px)': {
      maxWidth: '90vw',
    },
    '@media (max-width: 1360px)': {
      maxWidth: '90vw',
    },
    '@media (max-width: 1024px)': {
      maxWidth: '85vw',
    },
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginTop: 40,
    marginLeft: 20,
  },
  table: {
    maxWidth: '100%',
  },
  textRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 150,
  },
  selectField: {
    width: 360,
    marginTop: 12,
  },
  editScaleField: {
    marginTop: '1em',
    marginLeft: '1em',
  },
  rootSelect: {
    display: 'flex',
  },
  radioContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  ScalesRegistration: {
    paddingLeft: '5%',
  },
  textWeek: {
    color: '#505255',
    height: '16px',
    minWidth: '96px',
    fontSize: '16px',
    marginRight: 96,
  },
  tableRow: {
    backgroundColor: '#E5E5E5',
    width: 1528,
    height: 128,
    borderRadius: 4,
    marginTop: 16,
    alignItems: 'center',
  },
  tableAddScales: {
    padding: '8px 20px',
    borderWidth: '2px',
    borderStyle: 'dashed',
    border: ' 1px solid #A2A5A8',
    width: '100%',
    height: 72,
    borderRadius: 4,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
    textTransform: 'none',
  },
  textAddTable: {
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    marginTop: 5,
    color: '#A2A5A8',
    height: '24px',
    width: '128px',
    display: 'flex',
    flexDirection: 'column',
  },
  iconAdd: {
    fontSize: 24,
    marginTop: 5,
    color: '#A2A5A8',
  },
  textHospital: {
    fontFamily: 'Open Sans',
    fontSize: '18px',
    fontStyle: 'normal',
    fontHeight: 400,
    marginBottom: 72,
  },
  hours: {
    marginRight: 20,
  },
  textPrice: {
    height: '24px',
    width: '96px',
    color: '#505255',
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
  },
  textHours: {
    height: '8px',
    width: '71px',
    color: '#A2A5A8',
    marginBottom: 8,
  },
  numberHours: {
    height: '16px',
    width: '55px',
    fontSize: '18px',
    marginBottom: 16,
    color: '#505255',
  },
  textHoursCard: {
    height: '16px',
    width: '72px',
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Open Sans',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#A2A5A8',
    marginLeft: 16,
  },
  card: {
    backgroundColor: 'white',
    width: 176,
    height: 96,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 16,
  },
  textField: {
    marginRight: 32,
    marginTop: 11,
    height: '48px',
    width: '360px',
  },
  iconButton: {
    width: 10,
    height: 10,
    color: ' #A2A5A8',
  },
  addCard: {
    height: 96,
    width: 176,
    borderRadius: 6,
    border: '1px solid #A2A5A8',
    borderWidth: '2px',
    borderStyle: 'dashed',
    color: '#A2A5A8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textTransform: 'none',
  },
  insideCard: {
    marginTop: 8,
  },
  titleCard: {
    fontFamily: 'Open Sans',
    fontSize: '12px',
    fontStyle: 'normal',
    textAlign: 'left',
    height: '16px',
    width: '150px',
    color: ' #A2A5A8',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  rootButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 56,
    marginBottom: 100,
  },
  buttonCancel: {
    height: '32px',
    width: 200,
    borderRadius: '4px',
    border: '1px solid #A2A5A8',
    textTransform: 'none',
    color: '#A2A5A8',
    fontSize: 12,
    marginRight: 24,
  },
  buttonSave: {
    height: '32px',
    width: '152px',
    borderRadius: '4px',
    backgroundColor: appColors.SECUNDARY_COLOR,
    color: 'white',
    textTransform: 'none',
    fontSize: 12,
  },
  modalScale: {
    width: '176px',
    height: '80px',
    borderRadius: 4,
    alignItems: 'center',
    boxShadow: 'none',
    backgroundColor: 'white',
    border: 'none',
  },
  modal: {
    display: 'flex',
    borderRadius: 4,
    position: 'absolute',
    padding: 20,
    height: 'auto',
    '@media (min-width: 1441px)': {
      height: 'auto',
      width: '40%',
      top: `30%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 1440px)': {
      height: 'auto',
      width: '40%',
      top: `50%`,
      left: `45%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 1024px)': {
      width: '90%',
      top: `30%`,
      left: '50%',
      transform: `translate(-50%)`,
    },
  },
}));

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 14px;
  margin-bottom: 7px;
  align-items: center;
  /* && ~ .MuiTypography-root {
    margin-top: 14px;
    margin-bottom: 14px;
  } */
`;

export const InputItem = styled.div`
  flex-grow: ${(props) => props.flexGrow || 1};
  margin: 3px 10px 0 0;
  min-width: 150px;
  flex: 1;
  align-content: stretch;
  flex-direction: column;
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
