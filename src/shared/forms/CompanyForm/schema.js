import * as Yup from 'yup';
import validators from 'utils/validators';

export const schema = Yup.object().shape({
  name: Yup.string().required('Obrigatório'),
  email: Yup.string().email('Email inválido').required('Obrigatório'),
  social_name: Yup.string().required('Obrigatório'),
  cnpj: Yup.string()
    .min(13, 'CNPJ incompleto')
    .test(...validators.cnpjInvalid('CNPJ inválido'))
    .required('Obrigatório'),
  cell_phone: Yup.string()
    .min(10, 'Telefone Incompleto')
    .required('Obrigatório'),
  description: Yup.string().required('Obrigatório'),
  contract: Yup.string(),
  address: Yup.object().shape({
    code_post: Yup.number().typeError('Obrigatório').required('Obrigatório'),
    street: Yup.string().required('Obrigatório'),
    number: Yup.number().typeError('Apenas numeros').required('Obrigatório'),
    district: Yup.string().required('Obrigatório'),
    complement: Yup.string().required('Obrigatório'),
    city: Yup.object().shape({
      id: Yup.number().typeError('Obrigatório').required('Obrigatório'),
      state: Yup.object().shape({
        id: Yup.number().typeError('Obrigatório').required('Obrigatório'),
      }),
    }),
  }),
});
