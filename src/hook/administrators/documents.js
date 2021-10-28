import { useState } from 'react';
import api from 'service/api';

export const useAdministratorsDocs = () => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async ({ user_id, file }) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append('picture', file);
      const response = await api.post(`/v1/users/${user_id}/picture`, data);
      if (response.status !== 200) {
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
