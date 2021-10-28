import { create } from 'apisauce';

const apiUrl = {
  hml: 'http://localhost:4011',
  prod: 'https://api.apps.plantaoextra.com',
};

const api = create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.NODE_ENV === 'production' ? apiUrl.prod : apiUrl.hml,
  headers: {
    Authorization: '',
  },
});

export default api;
