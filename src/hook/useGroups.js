import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useUser = () => {
  const { requestIntercept } = useAuth();

  const [groups, setGroups] = useState({
    dataGroup: [],
    loadingGroup: false,
    error: null,
  });

  const getGroups = async (type, perPage, page) => {
    setGroups({ ...groups, loadingGroup: true });
    try {
      const response = await requestIntercept(api.get, 'v1/groups', {
        type,
        per_page: perPage,
        page,
      });
      if (response.status !== 200) {
        throw response;
      }
      setGroups({
        ...groups,
        dataGroup: response.data.data,
        loadingGroup: false,
      });
    } catch (err) {
      setGroups({ ...groups, loadingGroup: false, error: err });
    }
  };

  return {
    groups,

    // func
    getGroups,
  };
};

export default useUser;
