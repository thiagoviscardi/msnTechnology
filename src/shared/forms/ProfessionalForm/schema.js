import * as Yup from 'yup';
import validators from 'utils/validators';

const validateProfessionalType = (
  value,
  { professional_type, regulation_agency }
) => {
  return !!(
    (!value &&
      professional_type === 'multiprofissional' &&
      !regulation_agency) ||
    (professional_type === 'doctor' &&
      regulation_agency === 'crm' &&
      value &&
      value !== '') ||
    (!value && professional_type !== 'doctor' && regulation_agency === 'crm') ||
    (!!value && professional_type !== 'doctor' && regulation_agency !== 'crm')
  );
};

export const schema = Yup.object().shape({
  // FIRST STEP
  name: Yup.string().required('Obrigatório'),
  last_name: Yup.string(),
  email: Yup.string().email('Email inválido').required('Obrigatório'),
  rg: Yup.string().required('Obrigatório'),
  cpf: Yup.string()
    .min(11, 'cpf incompleto')
    .test(...validators.cpfInvalid('cpf inválido'))
    .required('Obrigatório'),
  cell_phone: Yup.string()
    .min(10, 'Telefone Incompleto')
    .required('Obrigatório'),
  birth_date: Yup.string().min(6, 'data incorreta').required('obrigatório'),
  nationality: Yup.object().shape({
    id: Yup.number().required('Obrigatório'),
  }),
  civil_status: Yup.string().required('obrigatório'),
  genre: Yup.string().required('Selecione'),
  address: Yup.object().shape({
    code_post: Yup.string().required('Obrigatório'),
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

  // SECOND STEP
  professional_type: Yup.string(),
  profile_receiving: Yup.number(),
  profile_receiving_type: Yup.number(),
  crm: Yup.object().shape({
    regulation_agency: Yup.string(),
    professional_type: Yup.string(),
    number: Yup.string().test(
      'professional_type',
      'Campo obrigatório!',
      function (value) {
        return validateProfessionalType(value, this.parent);
      }
    ),
    state: Yup.string().test(
      'professional_type',
      'Campo obrigatório!',
      function (value) {
        return validateProfessionalType(value, this.parent);
      }
    ),
  }),
  company: Yup.object().shape({
    id: Yup.number().typeError('Obrigatório').required('Obrigatório'),
  }),
  group: Yup.object().test(
    'professional_type',
    'Campo obrigatório!',
    function (value) {
      return (
        this.parent.professional_type === 'doctor' ||
        (this.parent.professional_type !== 'doctor' && value && value?.id)
      );
    }
  ),
  specialties: Yup.array().test(
    'professional_type',
    'Campo obrigatório!',
    function (value) {
      return (
        this.parent.professional_type !== 'doctor' ||
        (this.parent.professional_type === 'doctor' &&
          value &&
          value.length > 0)
      );
    }
  ),
  units: Yup.array().required('Obrigatório'),

  // THIRD STEP
  bank: Yup.object().shape({
    bank: Yup.object()
      .shape({
        id: Yup.number(),
      })
      .nullable(),
    agency: Yup.string().nullable(),
    agency_check: Yup.string().nullable(),
    account: Yup.string().nullable(),
    account_check: Yup.string().nullable(),
    type: Yup.string().nullable(),
    doc_type: Yup.string().nullable(),
    doc_number: Yup.string().nullable(),
    account_holder: Yup.string().nullable(),
    pix_type: Yup.string().nullable(),
    pix_key: Yup.string().nullable(),
  }),

  // FOURTH STEP
  password: Yup.string().min(6, 'Digite pelo menos 6 caracteres'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas devem ser iguais'
  ),
});
