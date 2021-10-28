import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useRequests = () => {
  const { requestIntercept } = useAuth();
  const [requests, setRequests] = useState({
    data: [],
    loading: false,
    error: null,
    total: 0,
  });

  const getRequests = async (page, perPage) => {
    setRequests({ ...requests, loading: true });
    try {
      const response = await requestIntercept(api.get, '/v1/users', {
        page,
        per_page: perPage,
      });
      if (response.status !== 200) {
        throw response;
      }
      setRequests({
        ...requests,
        data: response.data.data,
        loading: false,
        total: response.data.total,
      });
    } catch (err) {
      setRequests({ ...requests, error: err, loading: false });
    }
  };

  return {
    requests,

    // func
    getRequests,
  };
};

export default useRequests;
