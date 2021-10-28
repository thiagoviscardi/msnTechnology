import styled from 'styled-components';
import appColors from 'utils/appColors';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  buttonStyle: {
    color: appColors.THIRD_COLOR,
    borderColor: appColors.THIRD_COLOR,
    textTransform: 'none',
    '&:hover, &.Mui-focusVisible': { borderColor: appColors.THIRD_COLOR },
    width: 88,
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  filterButtonStyle: {
    backgroundColor: appColors.SECUNDARY_COLOR,
    color: 'white',
    textTransform: 'none',
    width: 136,
    fontFamily: 'Poppins',
    fontSize: 12,
    marginLeft: 16,
  },
  footer: {
    fontFamily: 'Nunito Sans',
    fontSize: '13px',
    color: '#505255',
  },
}));

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 800;
  @media (min-width: 1680px) {
    margin-bottom: 12px;
  }
  @media (max-width: 1440px) {
    margin-bottom: 12px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 12px;
  }
`;
