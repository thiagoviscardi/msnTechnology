import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';
import { useSupportDocuments } from 'hook/Support/documents';

export const useSupport = () => {
  const { requestIntercept } = useAuth();
  const { createDocument } = useSupportDocuments();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getList = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(api.get, `/v1/helps`, params);
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getOne = async ({ id }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(api.get, `/v1/helps/${id}`);
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          setData(response.data.data);
          setTotal(response.data.total);
          setLoading(false);
          resolve(response.data.data);
        } catch (error) {
          setLoading(false);
          reject('Falha ao buscar!');
        }
      })();
    });

  const getCreate = async ({ data, docs }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(api.post, `/v1/helps`, data);
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }

      if (docs && docs.length > 0) {
        docs.map((file) => {
          createDocument({ id: response.data.data.id, file });
        });
      }

      setData(response.data.data);
      setTotal(response.data.total);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
    }
  };

  const getUpdate = async ({ id, data }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(api.put, `/v1/helps/${id}`, data);
      if (response.status !== 200) {
        throw response;
      }

      setData(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
    }
  };

  const getDelete = async ({ id }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(api.delete, `/v1/helps/${id}`);
      if (response.status !== 200) {
        throw response;
      }
      setData((oldData) => [...oldData.filter((item) => item.id !== id)]);
      setTotal(total - 1);
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  return {
    data,
    total,
    loading,
    deleteLoading,
    getList,
    getOne,
    getDelete,
    getCreate,
    getUpdate,
  };
};
