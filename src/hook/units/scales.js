import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useUnitScales = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getList = async ({ unit_id }, params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v1/units/${unit_id}/scales`,
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

  return {
    data,
    total,
    loading,
    getList,
  };
};
