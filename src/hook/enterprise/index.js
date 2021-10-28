import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useEnterprise = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getList = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v1/enterprises`,
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
      const response = await requestIntercept(api.get, `/v1/enterprises/${id}`);
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
        `/v1/enterprises`,
        data
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }

      setData(response.data.data);
      setLoading(false);
      setStatus(response.status);
    } catch (error) {
      setLoading(false);
    }
  };

  const getUpdate = async ({ id, data }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.put,
        `/v1/enterprises/${id}`,
        data
      );
      if (response.status !== 200) {
        throw response;
      }

      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setStatus(error);
    }
  };

  const getDelete = async ({ id }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(
        api.delete,
        `/v1/enterprises/${id}`
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
      if (response.status !== 200 && response.status !== 201) {
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
    status,
    setStatus,
    getList,
    getOne,
    getDelete,
    getCreate,
    getUpdate,
    toggleStatus,
  };
};
