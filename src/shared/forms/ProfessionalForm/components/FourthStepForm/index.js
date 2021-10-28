import React, { memo } from 'react';
import { useStyles, InputContainer, InputItem } from './styles';
import { Typography } from '@material-ui/core';
import { FastField } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';

function FourthStepForm({ errors, isEdit }) {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.textHeader}>Definir senha</Typography>
      {!isEdit && (
        <Typography className={classes.textSubHeader}>
          A senha será enviada por SMS para o celular do profissional.
          <br />
          Se a senha não for preenchida, será gerado uma senha automaticamente.
        </Typography>
      )}

      <InputContainer data-cy="inputContainer_trocar_senha">
        <InputItem>
          <FastField
            placeholder="Senha"
            style={{ width: '100%' }}
            name="password"
            type="password"
            variant="outlined"
            errors={errors && errors.password}
            component={CustomTextField}
          />
        </InputItem>
        <InputItem>
          <FastField
            placeholder="Confirmar Senha"
            style={{ width: '100%' }}
            name="passwordConfirmation"
            variant="outlined"
            type="password"
            errors={errors && errors.passwordConfirmation}
            component={CustomTextField}
          />
        </InputItem>
      </InputContainer>
    </>
  );
}

export default memo(FourthStepForm);
