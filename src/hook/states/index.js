import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useStates = () => {
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
        `/v2/admin/states`,
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

  const getOne = async ({ id }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.get,
            `/v2/admin/states/${id}`
          );
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          setData(response.data.data);
          setLoading(false);
          resolve(response.data.data);
        } catch (error) {
          setLoading(false);
          reject('Falha ao buscar!');
        }
      })();
    });

  const getCreate = async ({ data }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.post,
        `/v2/admin/states`,
        data
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }

      setData(response.data.data);
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
      const response = await requestIntercept(
        api.put,
        `/v2/admin/states/${id}`,
        data
      );
      if (response.status !== 200) {
        throw response;
      }

      setData(response.data.data);
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
      const response = await requestIntercept(
        api.delete,
        `/v2/admin/states/${id}`
      );
      if (!response && response?.status !== 200) {
        throw response;
      }
      setData((oldData) => [...oldData.filter((item) => item.id !== id)]);
      setTotal(total - 1);
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  const toggleStatus = async ({ id, status, data }) => {
    try {
      const response = await requestIntercept(
        api.put,
        `/v2/admin/states/${id}`,
        {
          ...data,
          status: status ? 1 : 0,
        }
      );
      if (response.status !== 201 && response.status !== 200) {
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
