import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    marginTop: 32,
  },
  chip: {
    marginRight: 16,
    padding: 0,
    height: '40px',
    borderRadius: '50px',
  },
  chipContainerHospital: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    marginBottom: 30,
  },
  chipHospital: {
    marginRight: 16,
    padding: 0,
    height: '40px',
    borderRadius: '50px',
    marginTop: 16,
  },
  buttonContainer: {
    display: ' flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 24,
    marginTop: 40,
  },
  buttonCancel: {
    display: 'flex',
    width: '152px',
    height: '32px',
    borderRadius: '4px',
    border: ' 1px solid #A2A5A8',
    marginRight: 24,
  },
  textCancel: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    width: '152px',
    textTransform: 'none',
    color: '#A2A5A8',
  },
  buttonBack: {
    display: 'flex',
    width: '152px',
    height: '32px',
    borderRadius: '4px',
    border: ' 1px solid #0F83AD',
    marginRight: 24,
  },
  textBack: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    width: '152px',
    textAlign: 'center',
    textTransform: 'none',
    color: '#0F83AD',
  },
  buttonNext: {
    width: '152px',
    height: '32px',
    borderRadius: '4px',
    background: '#BBE9F9',
    border: ' 1px solid #BBE9F9',
    marginRight: 88,
  },
  textNext: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    textAlign: 'center',
    width: '130px',
    textTransform: 'none',
    color: '#0F83AD',
  },
  textHeader: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    width: '150px',
    color: '#505255',
    marginTop: 45,
  },
  addSpecialty: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: '#24B8EC',
    padding: 0,
    textTransform: 'none',
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    color: '#505255',
    marginTop: 48,
    marginBottom: 32,
  },
}));

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
  @media (max-width: 1024px) {
    max-width: 728px;
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
