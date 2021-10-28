export const initialValues = {
  /** first step */
  name: '',
  last_name: '',
  email: '',
  cpf: '',
  rg: '',
  cell_phone: '',
  birth_date: '',
  nationality: {
    id: '',
  },
  civil_status: '',
  genre: '',
  address: {
    code_post: '',
    street: '',
    number: '',
    district: '',
    complement: '',
    city: {
      id: '',
      state: {
        id: '',
      },
    },
  },

  /** second step */
  professional_type: 'doctor',
  profile_receiving: 1,
  profile_receiving_type: 1,
  crm: {
    professional_type: 'doctor',
    regulation_agency: 'crm',
    number: '',
    validate: '',
    state: '',
  },

  enterprise: {
    id: '',
  },
  company: {
    id: '',
  },
  group: {
    id: '',
  },

  specialties: [],
  units: [],

  /** third step */
  bank: {
    bank: {
      id: '',
    },
    agency: '',
    agency_check: '',
    account: '',
    account_check: '',
    type: '',
    doc_type: '',
    doc_number: '',
    account_holder: '',
    pix_type: '',
    pix_key: '',
  },

  // FOURTH STEP
  password: '',
  passwordConfirmation: '',
};
