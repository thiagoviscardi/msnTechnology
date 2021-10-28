import * as Yup from 'yup';
import validators from 'utils/validators';

export const schema = Yup.object().shape({
  name: Yup.string().required('Obrigatório'),
  cpf: Yup.string()
    .min(11, 'cpf incompleto')
    .test(...validators.cpfInvalid('cpf inválido'))
    .required('Obrigatório'),
  cell_phone: Yup.string()
    .min(10, 'Telefone Incompleto')
    .required('Obrigatório'),
  email: Yup.string().email('Email inválido').required('Obrigatório'),
  company: Yup.object().shape({
    id: Yup.string().typeError('Obrigatório!').required('Obrigatório'),
  }),
  group: Yup.object().shape({
    id: Yup.string().typeError('Obrigatório!').required('Obrigatório'),
  }),
  units: Yup.array().required('Obrigatório'),
});
