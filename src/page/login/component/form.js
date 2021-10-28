import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CircularProgress } from '@material-ui/core';
import {
  LabelInput,
  Error,
  TextFieldLogin,
  RecuperarSenha,
  ButtonLogin,
  AutoCadastro,
} from './style';

const validationSchema = yup.object({
  email: yup
    .string('Digite seu e-mail')
    .email('Digite um e-mail válido')
    .required('Preencha este campo'),
  password: yup
    .string('Digite sua senha')
    .min(6, 'Digite no mínimo 6 dígitos')
    .required('Preencha este campo'),
});

const LoginForm = ({ handleSubmit, error, loading }) => {
  // const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={formik.handleSubmit}>
      <LabelInput>E-mail</LabelInput>
      <TextFieldLogin
        fullWidth
        variant="outlined"
        id="email"
        name="email"
        // label="Email"
        // placeholder="Insira seu e-mail cadastrados"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <LabelInput>Senha</LabelInput>
      <TextFieldLogin
        fullWidth
        variant="outlined"
        id="password"
        name="password"
        // label="Senha"
        // placeholder="Utilize letras, números e símbolos"
        InputProps={{
          // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end" onClick={handleClickShowPassword}>
              <IconButton aria-label="toggle password visibility">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <RecuperarSenha>Recuperar senha</RecuperarSenha>
      <ButtonLogin
        id="Entrar"
        // className={classes.submit}
        variant="contained"
        fullWidth
        type="submit"
      >
        {loading ? <CircularProgress style={{ color: 'white' }} /> : 'Entrar'}
      </ButtonLogin>
      <AutoCadastro>Realizar Auto Cadastro</AutoCadastro>

      <Error>{error && <div>{error}</div>}</Error>
    </form>
  );
};

export default LoginForm;
