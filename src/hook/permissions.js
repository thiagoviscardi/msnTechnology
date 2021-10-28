import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const usePermissions = () => {
  const { requestIntercept } = useAuth();
  const [permissions, setPermissions] = useState({
    dataPermissions: [],
    loadingPermissions: false,
    errorPermissions: null,
    totalPermissions: 0,
  });
  const getPermissions = async (perPage, page, search) => {
    setPermissions({ ...permissions, loadingPermissions: true });
    try {
      const response = await requestIntercept(api.get, '/v1/permissions', {
        per_page: perPage,
        page,
        search,
      });
      if (response.status !== 200) {
        throw response;
      }
      setPermissions({
        ...permissions,
        loadingPermissions: false,
        dataPermissions: response.data.data,
        totalPermissions: response.data.total,
      });
    } catch (err) {
      setPermissions({
        ...permissions,
        loadingPermissions: false,
        errorPermissions: err,
      });
    }
  };

  const registerPermission = async (data) => {
    const { name, permission } = data;
    setPermissions({
      ...permissions,
      loadingPermissions: true,
    });
    try {
      const response = await api.post('/v1/permissions', {
        name,
        permission,
      });
      if (response.status !== 200) {
        throw response;
      }
      setPermissions({
        ...permissions,
        dataPermissions: response.data.data,
        loadingPermissions: false,
        errorPermissions: response.data.msg,
      });
    } catch (err) {
      setPermissions({
        ...permissions,
        dataPermissions: err,
        loadingPermissions: false,
        errorPermissions: 'Algo deu errado',
      });
    }
  };
  const Delete = async (id) => {
    try {
      const response = await requestIntercept(
        api.delete,
        `/v1/permissions/${id}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setPermissions((old) => [...old.filter((item) => item.id !== id)]);
    } catch (err) {
      setPermissions({});
    }
  };
  return {
    permissions,
    // func
    getPermissions,
    registerPermission,
    Delete,
  };
};

export default usePermissions;
