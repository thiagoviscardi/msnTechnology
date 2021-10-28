import * as Yup from 'yup';

export const schema = Yup.object().shape({
  title: Yup.string()
    .max(40, 'O título deve ter no máximo 40 caracteres!')
    .required('Obrigatório'),
  text: Yup.string()
    .max(120, 'O conteúdo deve ter no máximo 120 caracteres!')
    .required('Obrigatório'),
});
