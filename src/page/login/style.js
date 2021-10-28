import { makeStyles } from '@material-ui/core/styles';
import { appImages } from 'asset';
import styled from 'styled-components';

export const styles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  logo: {
    marginBottom: 25,
  },
  logoLogin: {
    marginBottom: 85,
  },
  image: {
    backgroundColor: '#fff',
    backgroundImage: `url(${appImages.onboard})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(20, 35, 20, 10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const ContainerLogo = styled.div`
  position: absolute;
`;

export const InsideContainerLogo = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const ContainerLogin = styled.div`
  text-align: flex-start;
  background-color: #a6a6a6;
  text-align: center;
  width: 65%;
  margin-left: 10%;
  margin-top: 10%;
  @media (max-width: 1920px) {
    padding-top: 4%;
  }
  @media (max-width: 1440px) {
    padding-top: 8%;
  }
  @media (max-width: 1366px) {
    padding-top: 5%;
  }
  @media (max-width: 1024px) {
    padding-top: 7%;
  }
  @media (max-width: 1600px) {
    padding-top: 7%;
  }
  @media (max-width: 1024px) {
    padding-top: 7%;
  }
`;
export default styles;
