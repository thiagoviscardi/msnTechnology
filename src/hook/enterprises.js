import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useEnterprise = () => {
  const { requestIntercept } = useAuth();

  const [enterpriseError, setEnterpriseError] = useState(null);
  const [enterpriseTotal, setEnterpriseTotal] = useState(0);
  const [enterpriseLoading, setEnterpriseLoading] = useState(false);
  const [enterpriseList, setEnterpriseList] = useState([]);

  const [enterpriseEdit, setEnterpriseEdit] = useState({
    list: [],
    error: null,
    total: 0,
  });
  const [enterpriseEditId, setEnterpriseEditId] = useState({
    listEditId: {},
    error: null,
    total: 0,
  });

  const [deleteLoading, setDeleteLoading] = useState(false);

  const getEnterpriseId = async (id) => {
    try {
      setEnterpriseEdit({
        ...enterpriseEdit,
        loading: true,
      });
      const response = await requestIntercept(api.get, `/v1/enterprises/${id}`);
      if (response.status !== 200) {
        throw response;
      }
      setEnterpriseEdit({
        ...enterpriseEdit,
        list: response.data.data,
        loading: false,
      });
    } catch (err) {
      setEnterpriseEdit({
        ...enterpriseEdit,
        loading: false,
      });
    }
  };
  const editEnterpriseId = async (id) => {
    const {
      address: { codePost, complement, district, number, street, cityId },
      cnpj,
      description,
      name,
    } = id;
    try {
      const response = await api.put(`/v1/enterprises/${id}`, {
        name,
        description,
        cnpj,
        address: {
          code_post: codePost,
          complement,
          district,
          number,
          street,
          city_id: cityId,
        },
      });
      if (response.status !== 200) {
        throw response;
      }
      setEnterpriseEditId({
        ...enterpriseEditId,
        listEditId: response.data.data,
      });
    } catch (err) {
      setEnterpriseEditId({});
    }
  };
  const [enterpriseRegister, setEnterpriseRegister] = useState({
    enterpriseRegister: {},
    enterpriseRegisterLoading: false,
    enterpriseRegisterError: null,
    enterpriseRegisterMessage: '',
  });

  const getEnterprise = async (perPage, page, search) => {
    try {
      setEnterpriseLoading(true);
      const response = await requestIntercept(api.get, '/v1/enterprises', {
        page,
        per_page: perPage,
        search,
      });
      if (response.status !== 200) {
        throw response;
      }
      setEnterpriseTotal(response.data.total);
      setEnterpriseLoading(false);
      setEnterpriseList([...response.data.data]);
    } catch (err) {
      setEnterpriseLoading(false);
      setEnterpriseError({
        enterpriseError: null,
      });
    }
  };

  const registerEnterprise = async (data) => {
    const {
      address: { codePost, complement, district, number, street, cityId },
      cnpj,
      description,
      name,
    } = data;
    setEnterpriseRegister({
      ...enterpriseRegister,
      enterpriseRegisterLoading: true,
    });
    try {
      const response = await api.post('/v1/enterprises', {
        name,
        description,
        cnpj,
        address: {
          code_post: codePost,
          complement,
          district,
          number,
          street,
          city_id: cityId,
        },
      });
      if (response.status !== 200) {
        throw response;
      }
      setEnterpriseRegister({
        ...enterpriseRegister,
        enterpriseRegister: response.data.data,
        enterpriseRegisterLoading: false,
        enterpriseRegisterMessage: response.data.msg,
      });
    } catch (err) {
      setEnterpriseRegister({
        ...enterpriseRegister,
        enterpriseRegister: err,
        enterpriseRegisterLoading: false,
        enterpriseRegisterMessage: 'Algo deu errado',
      });
    }
  };

  const Delete = async (id) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(
        api.delete,
        `/v1/enterprises/${id}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setDeleteLoading(false);
      setEnterpriseList((old) => [...old.filter((item) => item.id !== id)]);
    } catch (err) {
      setEnterpriseList({});
      setDeleteLoading(false);
    }
  };

  const toggleStatus = async ({ id, status, data }) => {
    try {
      const response = await requestIntercept(
        api.put,
        `/v1/enterprises/${id}`,
        {
          ...data,
          status: status ? 1 : 0,
        }
      );
      if (response.status !== 200) {
        throw response;
      }
    } catch (error) {
      // setDeleteLoading(false);
    }
  };

  return {
    enterpriseError,
    enterpriseEdit,
    enterpriseList,
    enterpriseLoading,
    enterpriseTotal,
    deleteLoading,
    toggleStatus,
    getEnterprise,
    registerEnterprise,
    Delete,
    getEnterpriseId,
    editEnterpriseId,
  };
};

export default useEnterprise;
