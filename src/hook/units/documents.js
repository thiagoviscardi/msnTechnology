import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useUnitDocuments = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);

  const getDocuments = async ({ id }, params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v1/units/${id}/documents`,
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

  const createDocument = async ({ id_unit, file }) => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append('file', file);
      data.append('type', 5575);
      data.append('description', file?.name);
      const response = await requestIntercept(
        api.post,
        `/v1/units/${id_unit}/documents`,
        data
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

  const getDelete = async ({ id_unit, id_document }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(
        api.delete,
        `/v1/units/${id_unit}/documents/${id_document}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setTotal(response.data.total);
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  return {
    loading,
    data,
    total,
    deleteloading,
    getDocuments,
    createDocument,
    getDelete,
  };
};
