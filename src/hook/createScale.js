import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useCreateScale = () => {
  const { requestIntercept } = useAuth();
  const [createScale, setCreateScale] = useState({
    list: {},
    loading: false,
    error: null,
    total: 0,
  });

  const getCreateScale = async () => {
    try {
      const response = await requestIntercept(api.get, '/v1/agendas', {});
      if (response.status !== 200) {
        throw response;
      }
      setCreateScale({ ...createScale, list: response.data.data });
    } catch (err) {
      setCreateScale({});
    }
  };

  return {
    createScale,
    getCreateScale,
  };
};

export default useCreateScale;
