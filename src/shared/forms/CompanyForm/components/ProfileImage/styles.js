import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const useStyles = makeStyles(() => ({
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

export const ProfilePicImage = styled('img')`
  && {
    position: absolute;
    border-radius: 50%;
    object-fit: cover;
    width: 104px;
    height: 104px;
  }
`;
