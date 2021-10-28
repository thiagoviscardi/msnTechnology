import { useState } from 'react';
import api from 'service/api';
import { useAuth } from '../auth';

export const useAgendaDetails = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(0);

  const getAgendaDetails = async ({ agenda_id }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v1/agendas/${agenda_id}`
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }

      setData(response?.data?.data);
      setTotal(response?.data?.total);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getDetailsSimpleCard = ({ agenda_id }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.get,
            `/v2/admin/agendas/${agenda_id}/simple_card`
          );
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }

          setData(response?.data?.data);
          setTotal(response?.data?.total);
          setTimeout(() => {
            setLoading(false);
            resolve();
          }, 500);
        } catch (error) {
          setLoading(false);
          reject(error);
        }
      })();
    });

  return {
    loading,
    data,
    total,
    error,
    getAgendaDetails,
    getDetailsSimpleCard,
    setData,
  };
};
