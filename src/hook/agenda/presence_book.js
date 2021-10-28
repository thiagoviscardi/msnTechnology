import { useState } from 'react';
import api from 'service/api';
import { useAuth } from '../auth';

export const useBookPresence = () => {
  const { requestIntercept } = useAuth();

  const [loading, setLoading] = useState(false);

  const getJoinedStringScales = (scales) => {
    let joinedStringScales = scales
      .map((item) => item.value)
      .join('&scale_id=');
    return (joinedStringScales =
      scales.length > 0 ? `scale_id=${joinedStringScales}` : '');
  };

  const getAgendaPdf = async (params, scales) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);

          const requestUrl = `${api.getBaseURL()}/v1/agendas/pdf?${getJoinedStringScales(
            scales
          )}&unit_id=${params.unit_id}&year=${params.year}&month=${
            params.month
          }`;

          const response = await requestIntercept(
            api.get,
            `${requestUrl}`,
            params
          );

          if (response.status !== 200) throw response.data;

          window.open(requestUrl, '_self');

          setTimeout(() => {
            setLoading(false);
            resolve('success');
          }, 500);
        } catch (error) {
          setLoading(false);
          reject('Nenhuma agenda encontrada neste período!');
        }
      })();
    });

  return {
    loading,
    getAgendaPdf,
  };
};
