import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useCompany = () => {
  const { requestIntercept } = useAuth();
  const [companies, setCompanies] = useState({
    dataCompanies: [],
    loadingCompanies: false,
    errorCompanies: null,
    totalCompanies: 0,
    messageCompanies: '',
    statusCompanies: '',
  });

  const [company, setCompany] = useState({
    companyDetail: {},
    loading: false,
    error: null,
  });
  const [companyEditId, setCompanyEditId] = useState({
    listEditId: {},
    error: null,
    total: 0,
  });

  const [logoCompany, setLogoComapny] = useState({
    logo: {},
    logoLoading: false,
    logoError: null,
  });
  const [CompanyRegister, setCompanyRegister] = useState({
    CompanyRegister: {},
    CompanyRegisterLoading: false,
    CompanyRegisterError: null,
    companyMessage: '',
  });

  const getCompanies = async (page, perPage, search) => {
    setCompanies({ ...companies, loadingCompanies: true });
    try {
      const response = await requestIntercept(api.get, '/v1/companies', {
        page,
        per_page: perPage,
        search,
      });
      if (response.status !== 200) {
        throw response;
      }
      setCompanies({
        ...companies,
        loadingCompany: false,
        dataCompany: response.data.data,
        totalCompany: response.data.total,
      });
    } catch (err) {
      setCompanies({ ...companies, loadingCompany: false, errorCompany: err });
    }
  };

  const getCompany = async (id) => {
    setCompany({ ...company, loading: true });
    try {
      const response = await requestIntercept(api.get, `/v1/companies/${id}`);
      if (response.status !== 200) {
        throw response;
      }
      setCompany({
        ...company,
        loading: false,
        companyDetail: response.data.data,
      });
    } catch (err) {
      setCompany({ ...company, loading: false, error: err });
    }
  };
  const editCompanyId = async (id) => {
    const { cnpj, name, socialName } = id;
    try {
      const response = await api.put(`/v1/companies/${id}`, {
        name,
        social_name: socialName,
        cnpj,
      });
      if (response.status !== 200) {
        throw response;
      }
      setCompanyEditId({
        ...companyEditId,
        listEditId: response.data.data,
      });
    } catch (err) {
      setCompanyEditId({});
    }
  };
  const registerCompany = async (data) => {
    const {
      address: { codePost, complement, district, number, street },
      cellPhone,
      cnpj,
      description,
      email,
      name,
      socialName,
    } = data;
    setCompanyRegister({
      ...CompanyRegister,
      CompanyRegisterLoading: true,
    });
    try {
      const response = await api.post('/v1/companies', {
        name,
        email,
        description,
        cnpj,
        social_name: socialName,
        cell_phone: cellPhone,
        address: { code_post: codePost, complement, district, number, street },
      });
      if (response.status !== 200) {
        throw response;
      }
      setCompanyRegister({
        ...CompanyRegister,
        CompanyRegister: response.data.data,
        CompanyRegisterLoading: false,
        companyMessage: response.data.msg,
      });
    } catch (err) {
      setCompanyRegister({
        ...CompanyRegister,
        CompanyRegisterError: err,
        CompanyRegisterLoading: false,
        companyMessage: 'Algo deu errado',
      });
    }
  };

  const registerLogoCompany = async (file) => {
    const picture = file;
    const id = 61;
    setLogoComapny({
      ...logoCompany,
      logoLoading: true,
    });
    try {
      const response = await api.post(`/v1/companies/${id}/images`, {
        picture,
      });
      if (response.status !== 200) {
        throw response;
      }
      setLogoComapny({
        ...logoCompany,
        logo: response.data.data,
        logoLoading: false,
      });
    } catch (err) {
      setLogoComapny({ ...logoCompany, logoError: err, logoLoading: false });
    }
  };
  const DeleteCompany = async (id) => {
    try {
      const response = await requestIntercept(
        api.delete,
        `/v1/companies/${id}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setCompanies((old) => [...old.filter((item) => item.id !== id)]);
    } catch (err) {
      setCompanies({});
    }
  };

  return {
    companies,
    company,
    CompanyRegister,

    // func
    getCompanies,
    editCompanyId,
    getCompany,
    registerCompany,
    registerLogoCompany,
    DeleteCompany,
  };
};

export default useCompany;
