import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useCities = () => {
  const { requestIntercept } = useAuth();
  const [cities, setCities] = useState({
    data: [],
    loading: false,
    error: null,
    total: 0,
  });

  const getCities = async (stateId, params) => {
    setCities({ ...cities, loading: true });

    try {
      const response = await requestIntercept(api.get, '/v2/admin/cities', {
        state_id: stateId,
        ...params,
      });

      if (response.status !== 200) {
        throw response;
      }
      setCities({
        ...cities,
        data: response.data.data,
        total: response.data.pagination.total_items,
        loading: false,
      });
    } catch (err) {
      setCities({ ...cities, error: err, loading: false });
    }
  };

  return {
    cities,

    // func
    getCities,
  };
};

export default useCities;
