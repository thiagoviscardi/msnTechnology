import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  cancelButton: {
    border: '1px solid #A2A5A8',
    boxSizing: 'border-box',
    borderRadius: 4,
    width: 152,
    marginRight: 24,
  },
  cancelText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#A2A5A8',
  },
  registerButton: {
    background: '#BBE9F9',
    border: '1px solid #BBE9F9',
    borderRadius: 4,
    width: 152,
  },
  registerText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#0F83AD',
  },
}));

export const FormContainer = styled.div``;
