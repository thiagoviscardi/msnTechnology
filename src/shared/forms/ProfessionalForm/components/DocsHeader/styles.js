import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  documentsTitles: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
  },
  docsButton: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#24B8EC',
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

export const NameContainer = styled.div`
  width: 392px;
  @media (max-width: 1920px) {
    width: 392px;
  }
  @media (max-width: 1440px) {
    width: 290px;
  }
  @media (max-width: 1366px) {
    width: 290px;
  }
`;
