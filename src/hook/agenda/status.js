import { useState } from 'react';
import api from 'service/api';
import { useAuth } from '../auth';

export const useAgendaStatus = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(0);

  const splitHour = (hour) => {
    const splited = hour.split(':');
    return splited[0];
  };

  const formatParamsRequest = (params) => {
    return {
      user_id: params.user_id,
      date_end: params.date_end,
      date_start: params.date_start,
      hour_start: splitHour(params.hour_start),
      hour_end: splitHour(params.hour_end),
    };
  };

  const getAgendaStatus = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        '/v2/admin/agendas/check_month_day',
        formatParamsRequest(params)
      );
      const response_2 = await requestIntercept(
        api.get,
        `/v2/admin/agendas/check_week_day`,
        {
          hour_start: params?.hour_start,
          hour_end: params?.hour_end,
          user_id: params?.user_id,
          year: params?.year,
          month: params?.month,
          scale_id: params?.scale_id,
        }
      );
      if (response_2.status !== 200 && response_2.status !== 201) {
        throw response_2;
      }

      setData({ ...response?.data?.data, ...response_2?.data?.data });
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
    getAgendaStatus,
  };
};
