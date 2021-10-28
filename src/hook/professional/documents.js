import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useProfessionalDocs = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);

  const getProfessionalsDocs = async ({ id_user }, params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v1/users/${id_user}/documents`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setTotal(response.data.total);
      setTimeout(() => {
        setLoading(false);
      }, 250);
    } catch (error) {
      setLoading(false);
    }
  };

  const createDocument = async ({ id_user, file }) => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append('file', file);
      data.append('type', 5575);
      data.append('description', file?.name);
      const response = await requestIntercept(
        api.post,
        `/v1/users/${id_user}/documents`,
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

  const getDelete = async ({ id_user, id_document }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(
        api.delete,
        `/v1/users/${id_user}/documents/${id_document}`
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

  const uploadImage = async ({ id_user, file }) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append('picture', file);
      const response = await api.post(`/v1/users/${id_user}/picture`, data);
      if (response.status !== 200) {
        throw response;
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    total,
    deleteloading,
    getProfessionalsDocs,
    uploadImage,
    createDocument,
    getDelete,
  };
};
