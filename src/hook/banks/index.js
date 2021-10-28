import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useBanks = () => {
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
        `/v2/admin/banks`,
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

  const getOne = async ({ id }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(api.get, `/v2/admin/banks/${id}`);
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getCreate = ({ data }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const { code, name } = data;
          const response = await requestIntercept(api.post, '/v2/admin/banks', {
            code,
            name,
          });

          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          setData(response.data.data);
          setLoading(false);
          resolve();
        } catch (error) {
          setLoading(false);
          reject('Falha ao cadastrar');
        }
      })();
    });

  const getUpdate = async ({ id, data }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.put,
            `/v2/admin/banks/${id}`,
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
        `/v2/admin/banks/${id}`
      );
      if (response.status !== 204) {
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
      const response = await requestIntercept(api.put, `/v1/banks/${id}`, {
        status,
      });
      if (response.status !== 204) {
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

export default useBanks;
