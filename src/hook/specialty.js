import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useSpecialty = () => {
  const { requestIntercept } = useAuth();
  const [specialty, setSpecialty] = useState({
    dataSpecialty: [],
    loading: false,
    error: null,
    total: 0,
  });

  const getSpecialty = async ({ per_page = 100 }) => {
    try {
      const response = await requestIntercept(
        api.get,
        `/v2/admin/specialties?per_page=${per_page && per_page}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setSpecialty({ ...specialty, dataSpecialty: response.data.data });
    } catch (err) {
      setSpecialty({});
    }
  };
  return {
    specialty,
    getSpecialty,
  };
};

export default useSpecialty;
