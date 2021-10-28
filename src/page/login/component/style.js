// const { makeStyles } = require('@material-ui/core');
import styled from 'styled-components';
import TextField from '../../../../node_modules/@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

// const useStyles = makeStyles((theme) => ({
//   text: {
//     minHeight: 100,
//     minWidth: 300,
//   },
//   error: {
//     height: 40,
//     textAlign: 'center',
//     color: 'red',
//   },
//   submit: {
//     color: 'white',
//     background: theme.palette.primary.main,
//     height: 50,
//     marginBottom: 20,
//     '&:hover': {
//       background: theme.palette.primary.dark,
//     },
//   },
// }));

// export default useStyles;

export const LabelInput = styled.div`
  font-size: 26px;
  text-align: left;
  margin-left: 0;
  color: #fff;
`;

export const ContainerLogin = styled.div`
  width: 500px;
`;

export const Error = styled.div`
  height: 40;
  text-align: center;
`;

export const TextFieldLogin = styled(TextField)`
  display: block;
  margin-left: auto;
  margin-top: auto;
  background-color: #36437d;
`;

export const RecuperarSenha = styled.a`
  display: block;
  text-align: left;
  margin-top: 25px;
  font-size: 14px;
  text-decoration: none;
  color: #fff;
`;

export const ButtonLogin = styled(Button)`
  display: block;
  text-align: left;
  margin-top: 25px;
  text-decoration: none;
  color: #fff;
  background-color: #36437d;
  text-align: center;
  height: 70px;
  width: 183px;
  border-radius: 10px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 50px;
`;

export const AutoCadastro = styled(Button)`
  display: block;
  text-align: center;
  text-decoration: none;
  color: #fff;
  font-size: 12px;
  margin: 0 auto;
  margin-top: 25px;
`;

export const CarouselLogin = styled(Carousel)`
  margin-top: 10%;
  @media (max-width: 1200px) {
    padding-top: 4%;
    display: none;
  }
`;
