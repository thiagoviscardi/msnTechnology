import * as Yup from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('Obrigatório'),
  link: Yup.string(),
  description: Yup.string().required('Obrigatório'),
});
