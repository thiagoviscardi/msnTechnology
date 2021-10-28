import React from 'react';
import { useStyles, InputContainer, InputItem } from './styles';
import { Typography } from '@material-ui/core';
import { FastField } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import CustomMaskField from 'shared/component/forms/CustomMaskField';

import {
  RadioInput,
  RadioInputGroup,
} from 'shared/component/maskedField/checkBox';

export function PixFields({
  values,
  errors,
  touched,
  // handleBlur = () => {},
  handleChange = () => {},
  setFieldValue = () => {},
}) {
  const classes = useStyles();
  const valuePix =
    values && values.bank && values.bank?.pix_type ? values.bank.pix_type : '';
  const [selectedValue, setSelectedValue] = React.useState(valuePix);

  const onChangeKeyPix = (value) => {
    setSelectedValue(value.target.value);
  };

  return (
    <>
      <Typography className={classes.textHeader}>
        Chave Pix (opcional)
      </Typography>
      <InputContainer data-cy="inputContainer1_informacoes_bancarias">
        <InputItem id="pix">
          <RadioInputGroup
            name="bank.pix_type"
            row
            handleChange={(value) => {
              onChangeKeyPix(value);
              setFieldValue('bank.pix_type', value.target.value);
            }}
            value={selectedValue}
          >
            <RadioInput value="email" label="Email" />
            <RadioInput value="cellphone" label="Celular" />
            <RadioInput value="cpf" label="CPF" />
            <RadioInput value="cnpj" label="CNPJ" />
          </RadioInputGroup>
        </InputItem>
      </InputContainer>
      <InputContainer data-cy="inputContainer2_informacoes_bancarias">
        {selectedValue === 'email' && (
          <InputItem style={{ flexGrow: 0.5 }}>
            <FastField
              errors={errors}
              name="bank.pix_key"
              handleChange={handleChange}
              label="Email"
              type="email"
              variant="outlined"
              touched={touched}
              mask=""
              component={CustomTextField}
              value={values?.bank?.pix_key || null}
              style={{ width: '100%' }}
            />
          </InputItem>
        )}
        {selectedValue === 'cellphone' && (
          <InputItem style={{ flexGrow: 0.5 }}>
            <FastField
              name="bank.pix_key"
              data-cy="bank.pix_key"
              label="Telefone"
              value={values?.bank?.pix_key || null}
              handleChange={handleChange}
              errors={errors}
              component={CustomMaskField}
              touched={touched}
              style={{ width: '100%' }}
              format="(##) # ####-####"
              variant="outlined"
              mask=""
              onChange={(e) => {
                setFieldValue('bank.pix_key', e.target.value);
              }}
            />
          </InputItem>
        )}
        {selectedValue === 'cpf' && (
          <InputItem style={{ flexGrow: 0.5 }}>
            <FastField
              name="bank.pix_key"
              label="CPF"
              value={values?.bank?.pix_key || null}
              errors={errors}
              component={CustomMaskField}
              touched={touched}
              style={{ width: '100%' }}
              format="###.###.###-##"
              mask=""
              variant="outlined"
              onChange={(e) => {
                setFieldValue('bank.pix_key', e.target.value);
              }}
            />
          </InputItem>
        )}
        {selectedValue === 'cnpj' && (
          <InputItem style={{ flexGrow: 0.5 }}>
            <FastField
              value={values?.bank?.pix_key}
              label="CNPJ"
              style={{ width: '100%' }}
              format="##.###.###/####-##"
              mask=""
              name="bank.pix_key"
              variant="outlined"
              component={CustomMaskField}
              onChange={(e) => {
                setFieldValue('bank.pix_key', e.target.value);
              }}
            />
          </InputItem>
        )}
      </InputContainer>
    </>
  );
}
