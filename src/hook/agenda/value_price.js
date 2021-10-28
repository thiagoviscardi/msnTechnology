import { useState } from 'react';
import api from 'service/api';
import { useAuth } from '../auth';

export const useAgendaValuePrice = () => {
  const { requestIntercept } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(0);
  const [data, setData] = useState(null);
  const putAgendaValuePrice = ({ agenda_id }, params) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.post,
            `/v1/agendas/${agenda_id}/value_change`,
            params
          );

          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          setLoading(false);
          resolve(response.data.data);
        } catch (error) {
          setLoading(false);
          setError(error);
          reject('error');
        }
      })();
    });
  const getAgendaValuePrice = async ({ agenda_id }, params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v1/agendas/${agenda_id}/value_change`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }

      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    loading,
    error,
    data,
    putAgendaValuePrice,
    getAgendaValuePrice,
  };
};
