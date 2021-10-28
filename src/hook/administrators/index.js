import { useState } from 'react';
import api from 'service/api';
import { useAdministratorsDocs } from 'hook/administrators/documents';
import { useAuth } from 'hook/auth';

export const useAdministrators = () => {
  const { requestIntercept } = useAuth();
  const { uploadImage } = useAdministratorsDocs();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const getList = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v2/admin/users/administrators`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }
      setData(response?.data?.data);
      setTotal(response?.data?.pagination?.total_items);
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
            `/v2/admin/users/administrators?user_id=${id}`
          );
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }

          const response_permissions = await requestIntercept(
            api.get,
            `/v1/users/${id}/permissions`
          );
          if (response_permissions.status !== 200) {
            throw response_permissions;
          }
          setData({
            ...response?.data?.data,
            permissions: response_permissions.data.data.filter(
              (item) => item?.status === 1
            ),
          });
          setLoading(false);
          resolve(response.data.data);
        } catch (error) {
          setLoading(false);
          reject('Falha ao buscar!');
        }
      })();
    });

  const getCreate = ({ data, fileLogo, permissions = [] }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(api.post, `/v1/users`, data);
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          if (fileLogo) {
            uploadImage({ user_id: response.data.data.id, file: fileLogo });
          }

          if (permissions.length > 0)
            toggleStatusPermission({
              user_id: response.data.data.id,
              permissions,
            });

          setData(response.data.data);
          setLoading(false);
          setStatus(response.status);
          resolve();
        } catch (error) {
          setLoading(false);
          reject('Falha ao cadastrar!');
        }
      })();
    });

  const getUpdate = ({ id, data, permissions }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.put,
            `/v1/users/${id}`,
            data
          );
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }

          toggleStatusPermission({ user_id: id, permissions });

          setTimeout(() => {
            setData(response.data.data);
            setLoading(false);
            resolve(response.data.data);
          }, 500);
        } catch (error) {
          setLoading(false);
          reject('Erro, tente novamente mais tarde!');
        }
      })();
    });

  const getDelete = async ({ id, params }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(api.delete, `/v1/users/${id}`);
      if (response.status !== 200) {
        throw response;
      }
      setData((oldData) => [...oldData.filter((item) => item.id !== id)]);
      getList(params);
      setTotal(total - 1);
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  const toggleStatusPermission = async ({ user_id, permissions }) => {
    try {
      const response = await requestIntercept(
        api.put,
        `/v1/users/${user_id}/permissions`,
        permissions
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
    status,
    loading,
    deleteLoading,
    toggleStatusPermission,
    getList,
    getOne,
    getDelete,
    getCreate,
    getUpdate,
  };
};
