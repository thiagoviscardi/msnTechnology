import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import appColors from 'utils/appColors';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    backgroundColor: '#fafafa',
    borderRadius: 4,
    padding: 20,
    height: 'auto',
    '@media (min-width: 1441px)': {
      height: 'auto',
      width: '40%',
      top: `30%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 1440px)': {
      height: 'auto',
      width: '40%',
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    },
    '@media (max-width: 1024px)': {
      width: '90%',
      top: `30%`,
      left: '50%',
      transform: `translate(-50%)`,
    },
  },
  closeButton: {
    width: 14,
    height: 14,
  },
}));

export const ContainerTopModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerModal = styled.div``;

export const ContainerFormModal = styled.div``;

export const TitleModal = styled.div`
  flex: 1;
  font-family: 'Open Sans';
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: ${appColors.SILENCE};
`;

export const CloseModal = styled.div``;
