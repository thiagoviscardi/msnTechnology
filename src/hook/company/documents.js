import { useState } from 'react';
import api from 'service/api';

export const useCompanyDocuments = () => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async ({ company_id, file }) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append('image', file);
      const response = await api.post(
        `/v1/companies/${company_id}/images`,
        data
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return {
    loading,
    uploadImage,
  };
};
