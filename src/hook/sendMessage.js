import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

export const useSendMessage = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getSendMessage = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.post,
        `/v1/reports/notifications`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    success,
    getSendMessage,
  };
};
