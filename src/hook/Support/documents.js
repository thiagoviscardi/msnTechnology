import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useSupportDocuments = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);

  const createDocument = ({ id, file }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const data = new FormData();
          data.append('file', file);
          data.append('type', 5575);
          data.append('description', file?.name);
          const response = await requestIntercept(
            api.post,
            `/v1/helps/${id}/docs`,
            data
          );
          if (response.status !== 200) {
            throw response;
          }
          setData(response.data.data);
          setTotal(response.data.total);
          setLoading(false);
          resolve(response.data.data);
        } catch (error) {
          setLoading(false);
          reject('Falha ao cadastrar documento!');
        }
      })();
    });

  const getDelete = async ({ id, id_document }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(
        api.delete,
        `/v1/helps/${id}/docs/${id_document}`
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
    createDocument,
    getDelete,
  };
};
