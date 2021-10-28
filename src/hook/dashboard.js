import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

export const useDashboard = () => {
  const { requestIntercept } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDashboardInfo = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v2/admin/dashboard`,
        params
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
      setDashboardData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    dashboardData,
    getDashboardInfo,
  };
};
