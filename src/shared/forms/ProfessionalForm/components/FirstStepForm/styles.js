import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#505255',
    marginBottom: 24,
  },
}));

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 15px;
`;

export const InputContainer = styled.div`
  display: flex;
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
  margin: 3px 15px 0 0;
  min-width: 150px;
  flex: 1;
  align-content: stretch;
  flex-direction: column;
`;
