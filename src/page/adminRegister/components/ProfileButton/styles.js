import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  logoText: {
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#8B8E93',
  },
  logoButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#A2A5A8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 104,
    height: 104,
    borderRadius: 104 / 2,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
}));

export const HoverButton = styled.div`
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const StyledInput = styled.input`
  && {
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;
