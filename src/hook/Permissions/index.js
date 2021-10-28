import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const usePermissions = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getList = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v1/permissions`,
        params
      );
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

  const getOne = async ({ id }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(api.get, `/v1/permissions/${id}`);
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

  const getCreate = async ({ data }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.post,
        `/v1/permissions`,
        data
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }

      setData(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getUpdate = async ({ id, data }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.put,
            `/v1/permissions/${id}`,
            data
          );
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          setTimeout(() => {
            setLoading(false);
            resolve();
          }, 500);
        } catch (error) {
          setLoading(false);
          reject('Falha ao editar! Tente novamente em instantes.');
        }
      })();
    });

  const getDelete = async ({ id }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(
        api.delete,
        `/v1/permissions/${id}`
      );
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

  const toggleStatus = async ({ id, status }) => {
    try {
      const response = await requestIntercept(
        api.put,
        `/v1/permissions/${id}`,
        { status }
      );
      if (response.status !== 201) {
        throw response;
      }
    } catch (error) {
      // setDeleteLoading(false);
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
    toggleStatus,
  };
};
