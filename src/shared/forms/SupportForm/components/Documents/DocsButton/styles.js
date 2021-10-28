import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
  documentsText: {
    marginLeft: 10,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#24B8EC',
  },
  docsContainer: {
    border: '1px solid #24B8EC',
    boxSizing: 'border-box',
    borderRadius: 4,
    width: 226,
  },
  docsTitleBox: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 31,
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
