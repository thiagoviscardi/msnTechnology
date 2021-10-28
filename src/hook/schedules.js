import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

export const useSchedules = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(0);

  const getSchedulesByUnit = async ({ unit_id, scale_id }, params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v1/units/${unit_id}/scales/${scale_id}/schedules`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }
      setData(response?.data?.data);
      setTotal(response?.data?.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    data,
    total,
    error,
    getSchedulesByUnit,
  };
};
