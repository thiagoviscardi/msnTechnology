import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  textHeader: {
    fontSize: 16,
    marginTop: 40,
    marginBottom: 20,
  },
  textSubHeader: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  textExport: {
    fontFamily: 'Poppins',
    fontSize: '12px',
    marginLeft: 11,
    textAlign: 'center',
    textTransform: 'none',
    color: '#0F83AD',
    '&:hover': {
      color: 'white',
    },
    radioContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
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
