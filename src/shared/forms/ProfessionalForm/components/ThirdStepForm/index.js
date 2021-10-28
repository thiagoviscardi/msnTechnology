import React, { memo, useEffect } from 'react';
import { useStyles, InputContainer, InputItem } from './styles';
import { Typography } from '@material-ui/core';
import { FastField, Field } from 'formik';
import CustomTextField from 'shared/component/forms/CustomTextField';
import CustomSelect from 'shared/component/forms/CustomSelect';
import { PixFields } from './PixFields';
import CustomSelectBanks from 'shared/component/forms/CustomSelectBanks';
import CustomMaskField from 'shared/component/forms/CustomMaskField';

function ThirdStepForm({
  values,
  errors,
  touched,
  isEdit,
  handleBlur = () => {},
  handleChange = () => {},
  setFieldValue = () => {},
  setFieldTouched = () => {},
}) {
  const classes = useStyles();

  const getFormatedLabel = (item) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  };

  const accountTypeOptions = [
    { label: 'Corrente', value: 'Corrente' },
    { label: 'Poupança', value: 'Poupanca' },
  ];

  const getInitialAccountType = (type) => {
    return accountTypeOptions.find((item) => item.value === type);
  };

  const docTypeOptions = [
    { label: 'PESSOA JURÍDICA', value: 'CNPJ' },
    { label: 'PESSOA FÍSICA', value: 'CPF' },
  ];

  const getInitialDocType = (doc) => {
    return docTypeOptions.find((item) => item.value === doc);
  };

  useEffect(() => {
    if (isEdit && !values.bank) {
      setFieldValue('bank.bank.id', '');
      setFieldValue('bank.bank.label', '');
      setFieldValue('bank.agency', '');
      setFieldValue('bank.agency_check', '');
      setFieldValue('bank.account', '');
      setFieldValue('bank.account_check', '');
      setFieldValue('bank.type', '');
      setFieldValue('bank.doc_type', '');
      setFieldValue('bank.doc_number', '');
      setFieldValue('bank.account_holder', '');
      setFieldValue('bank.pix_type', '');
      setFieldValue('bank.pix_key', '');
    }
  }, [values, isEdit]);

  return (
    <>
      <Typography className={classes.textHeader}>Dados bancários</Typography>

      <InputContainer>
        <InputItem>
          <Field
            name="bank.bank.id"
            style={{ width: '100%' }}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            placeholder={'Banco'}
            menuList={() => ({ height: 116, overflowY: 'auto' })}
            variant="outlined"
            value={
              values && values?.bank && values?.bank?.bank?.id !== ''
                ? getFormatedLabel(values.bank.bank)
                : null
            }
            errors={
              errors && errors.bank && errors.bank.bank && errors.bank.bank.id
            }
            handleChange={(val) => {
              setFieldValue('bank.bank.id', val.value);
              setFieldValue('bank.bank.name', val.label);
            }}
            component={CustomSelectBanks}
          />
        </InputItem>
      </InputContainer>

      <InputContainer>
        <InputItem>
          <FastField
            placeholder="Agência"
            style={{ width: '100%' }}
            name="bank.agency"
            variant="outlined"
            errors={errors && errors.bank && errors.bank.agency}
            component={CustomTextField}
          />
        </InputItem>
        <InputItem style={{ flexGrow: 0 }}>
          <FastField
            placeholder="Dígito da Agência"
            style={{ width: '100%' }}
            name="bank.agency_check"
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
            errors={errors && errors.bank && errors.bank.agency_check}
            component={CustomTextField}
          />
        </InputItem>
      </InputContainer>

      <InputContainer>
        <InputItem id="bankAccount">
          <FastField
            placeholder="Conta"
            style={{ width: '100%' }}
            name="bank.account"
            variant="outlined"
            errors={errors && errors.bank && errors.bank.account}
            component={CustomTextField}
          />
        </InputItem>
        <InputItem style={{ flexGrow: 0 }} id="bankAccountCheck">
          <FastField
            placeholder="Dígito da Conta"
            style={{ width: '100%' }}
            name="bank.account_check"
            variant="outlined"
            type="number"
            inputProps={{ min: 0 }}
            errors={errors && errors.bank && errors.bank.account_check}
            component={CustomTextField}
          />
        </InputItem>
      </InputContainer>

      <InputContainer>
        <InputItem id="bankAccountHolder">
          <FastField
            label="Nome do titular"
            style={{ width: '100%' }}
            name="bank.account_holder"
            variant="outlined"
            errors={errors && errors.bank && errors.bank.account_holder}
            component={CustomTextField}
          />
        </InputItem>
        <InputItem id="bankAccountType">
          <Field
            name="bank.type"
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            placeholder="Operação"
            label="Operação"
            value={
              values && values.bank && values.bank.type !== ''
                ? getInitialAccountType(values.bank.type)
                : null
            }
            options={accountTypeOptions}
            handleChange={(val) => {
              setFieldValue('bank.type', `${val.value}`);
            }}
            errors={errors && errors.bank && errors.bank.type}
            menuList={() => ({ height: 80, overflowY: 'auto' })}
            component={CustomSelect}
          />
        </InputItem>
      </InputContainer>

      <Typography className={classes.textHeader}>Tipo da Conta</Typography>
      <InputContainer>
        <InputItem id="bankAccountType">
          <Field
            label="Tipo da conta"
            name="bank.doc_type"
            data-cy="bank_doc_type"
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            placeholder="tipo de conta"
            value={
              values && values.bank && values.bank.doc_type !== ''
                ? getInitialDocType(values.bank.doc_type)
                : null
            }
            handleChange={(val) => {
              setFieldValue('bank.doc_type', `${val.value}`);
            }}
            errors={errors && errors.bank && errors.bank.doc_type}
            options={docTypeOptions}
            menuList={() => ({ height: 80, overflowY: 'auto' })}
            component={CustomSelect}
          />
        </InputItem>
        <InputItem id="bankAccountHolder">
          <FastField
            label={values?.bank?.doc_type === 'CPF' ? 'CPF' : 'CNPJ'}
            style={{ width: '100%' }}
            name="bank.doc_number"
            errors={errors && errors.bank && errors.bank.doc_number}
            variant="outlined"
            component={CustomMaskField}
            value={values?.bank?.doc_number}
            touched={touched}
            mask=""
            format={
              values?.bank?.doc_type === 'CPF'
                ? '###.###.###-##'
                : '##.###.###/####-##'
            }
            onChange={handleChange}
          />
        </InputItem>
      </InputContainer>

      <PixFields
        values={values}
        errors={errors}
        handleBlur={handleBlur}
        touched={touched}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
      />
    </>
  );
}

export default memo(ThirdStepForm);
