import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useProfilePermissions = () => {
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
        `/v1/groups?type=admin`,
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
      const response = await requestIntercept(api.get, `/v1/groups/${id}`);

      if (response.status !== 200) {
        throw response;
      }
      const response_permissions = await requestIntercept(
        api.get,
        `/v1/groups/${id}/permissions?page=1&per_page=100`
      );
      if (
        response_permissions.status !== 200 &&
        response_permissions.status !== 201
      ) {
        throw response;
      }
      setData({
        ...response.data.data,
        permissions: response_permissions.data.data,
      });

      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getCreate = async ({ data, permissions }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(api.post, `/v1/groups`, data);
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }

          setData(response.data.data);
          setTotal(response.data.total);
          toggleStatusPermission({
            group_id: response.data.data.id,
            permissions,
          });

          setTimeout(() => {
            resolve();
            setLoading(false);
          }, 500);
        } catch (error) {
          setLoading(false);
          reject('Falha ao cadastrar');
        }
      })();
    });

  const getUpdate = async ({ id, data, permissions }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.put,
            `/v1/groups/${id}`,
            data
          );
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          toggleStatusPermission({ group_id: id, permissions });
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
      const response = await requestIntercept(api.delete, `/v1/groups/${id}`);
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

  const toggleStatusProfile = async ({ id, status }) => {
    try {
      const response = await requestIntercept(api.put, `/v1/groups/${id}`, {
        status: status ? 1 : 0,
      });
      if (response.status !== 201) {
        throw response;
      }
    } catch (error) {
      // setDeleteLoading(false);
    }
  };

  const toggleStatusPermission = async ({ group_id, permissions }) => {
    try {
      const response = await requestIntercept(
        api.put,
        `/v1/groups/${group_id}/permissions`,
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
    loading,
    deleteLoading,
    getList,
    getOne,
    getDelete,
    getCreate,
    getUpdate,
    toggleStatusProfile,
    toggleStatusPermission,
  };
};
