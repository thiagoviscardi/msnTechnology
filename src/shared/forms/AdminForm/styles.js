import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    paddingBottom: 40,
    backgroundColor: appColors.BACKGROUND_COLOR,
  },
  registerTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
  },
  imageContainer: {
    marginTop: 48,
    marginBottom: 48,
    display: 'flex',
    alignItems: 'center',
  },
  dataHospital: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
    marginTop: 48,
  },
  address: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
    marginTop: 48,
  },
  geoContainer: {
    border: '1px solid #A2A5A8',
    height: 123,
    width: '100%',
    padding: 24,
    marginBottom: 5,
    '@media (max-width: 1024px)': {
      height: 'auto',
      marginTop: 20,
      marginBottom: 50,
    },
  },
  geo_inputs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 1024px)': {
      flexWrap: 'wrap',
    },
    height: 48,
  },
  title_geolocation: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
    marginBottom: 10,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 400,
    color: appColors.SILENCE,
    marginTop: 18,
  },
}));

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 14px;
  margin-bottom: 7px;
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

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 15px;
`;
