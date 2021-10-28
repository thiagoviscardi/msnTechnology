import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';
import { useProfessionalDocs } from './documents';

export const useProfessional = () => {
  const { requestIntercept } = useAuth();

  const { createDocument, uploadImage } = useProfessionalDocs();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getProfessionals = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v2/admin/users`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setTotal(response.data.pagination.total_items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const processProcessResponse = (values) => {
    return {
      ...values,
      enterprise:
        values?.enterprise && Object.keys(values?.enterprise).length > 0
          ? values?.enterprise
          : { id: '' },
    };
  };

  const getOne = ({ id }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(api.get, `/v1/users/${id}`);
          if (response?.status !== 200) {
            throw response;
          }

          setData(processProcessResponse(response.data.data));
          setTotal(response.data.total);
          setLoading(false);
          resolve(response.data.data);
        } catch (error) {
          setLoading(false);
          reject(error);
        }
      })();
    });

  const formatDataRequest = (data) => {
    return {
      ...data,
      regulation_agency:
        data.crm.regulation_agency === 'crm'
          ? 'CRM'
          : data.crm.regulation_agency,
      crm: {
        ...data.crm,
        state: {
          id: data.crm.state,
        },
      },
      group: {
        id: data.group.id === '' ? 3 : data.group.id,
      },
      bank: data?.bank?.bank?.id === '' ? null : { ...data.bank },
    };
  };

  const getCreate = async ({ data, docs, fileLogo }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.post,
        `/v1/users`,
        formatDataRequest(data)
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
      if (data?.password)
        changePassword({ id: response.data.data.id, password: data.password });

      if (fileLogo) {
        uploadImage({ id_user: response.data.data.id, file: fileLogo });
      }

      if (docs && docs.length > 0) {
        docs.map((file) => {
          createDocument({ id_user: response.data.data.id, file });
        });
      }

      setData(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setStatus(error);
    }
  };

  const getUpdate = async ({ id, data }) => {
    try {
      setLoading(true);

      const response = await requestIntercept(
        api.put,
        `/v1/users/${id}`,
        formatDataRequest(data)
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }

      if (data?.password) changePassword({ id, password: data.password });

      setData(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
      setStatus(201);
    } catch (error) {
      setLoading(false);
      setStatus(error);
    }
  };

  const changePassword = async ({ id, password }) => {
    try {
      const response = await requestIntercept(api.put, `/v1/users/${id}/pass`, {
        password,
      });
      if (response.status !== 200) {
        throw response;
      }
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  const deleteProfessional = async ({ id_professional, params }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(
        api.delete,
        `/v1/users/${id_professional}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setData((oldData) => [
        ...oldData.filter((item) => item.id !== id_professional),
      ]);
      getProfessionals(params);
      setTotal(total - 1);
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  const toggleStatus = async ({ id, status }) => {
    try {
      const response = await requestIntercept(
        api.patch,
        `/v2/admin/users/${id}?status=${status ? 'active' : 'deactive'}`
      );
      if (response.status !== 200) {
        throw response;
      }
    } catch (error) {
      // setDeleteLoading(false);
    }
  };

  return {
    loading,
    data,
    total,
    status,
    deleteLoading,
    setStatus,
    getProfessionals,
    deleteProfessional,
    getCreate,
    getOne,
    getUpdate,
    toggleStatus,
  };
};
