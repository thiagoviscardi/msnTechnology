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
    marginBottom: 24,
  },

  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  addSpecialty: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: '#24B8EC',
    textTransform: 'none',
    padding: 0,
    marginTop: 10,
  },
  chipContainerHospital: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    marginRight: 16,
    marginBottom: 30,
  },
  chipHospital: {
    marginRight: 16,
    padding: 0,
    height: '40px',
    borderRadius: '50px',
  },
}));
export const DefaultContainer = styled.div`
  padding-top: 7%;
  text-align: flex-start;
  margin-left: 15%;
  @media (max-width: 1920px) {
    padding-top: 7%;
    margin-left: 15%;
  }
  @media (max-width: 1440px) {
    padding-top: 7%;
    margin-left: 18%;
  }
  @media (max-width: 1366px) {
    padding-top: 7%;
    margin-left: 19%;
  }
  @media (max-width: 1024px) {
    padding-top: 12%;
    margin-left: 25%;
  }
  @media (max-width: 768px) {
    padding-top: 15%;
    margin-left: 33%;
  }
`;

export const FormContainer = styled.div`
  max-width: 1528px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1920px) {
    max-width: 1528px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 1440px) {
    max-width: 1128px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 1366px) {
    max-width: 1058px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 1440px) {
    max-width: 1500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 768px) {
    max-width: 498px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
