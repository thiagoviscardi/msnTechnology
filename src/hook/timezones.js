import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useTimezones = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getList = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v1/settings/timezones`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }

      const { data, total } = response.data;

      const formatedLabels = data.map((timezone) => ({
        label: timezone.name,
        value: timezone.id,
      }));

      setData(formatedLabels);
      setTotal(total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    total,
    getList,
  };
};
