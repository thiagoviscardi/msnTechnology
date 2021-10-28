import { useState } from 'react';
import api from 'service/api';
import { useAuth } from '../auth';

export const useAgenda = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(0);

  const processResponseData = (data, period) =>
    new Promise((resolve, reject) => {
      try {
        if (data && data.length > 0) {
          const processedData = data.map((d) => [
            ...d.map((item) => ({
              ...item,
              ...period,
              schedules: [
                ...item?.schedules.map((sched) => [
                  ...sched.map((s) => ({
                    ...s,
                    agenda: item?.agendas.filter(
                      (ag) => ag.schedule_id === s.id
                    ),
                  })),
                ]),
              ],
            })),
          ]);
          resolve(processedData);
        } else {
          resolve([]);
        }
      } catch (err) {
        reject([]);
      }
    });

  const getAgenda = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v2/admin/agendas`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }

      const processedData = await processResponseData(response?.data?.data, {
        date_start: params.date_start,
        date_end: params.date_end,
      });
      setData(processedData);
      setTotal(response?.data?.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createAgenda = async (formData) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);

          const [hour_end] = formData.hour_end.split(':');
          const [hour_start] = formData.hour_start.split(':');
          const user_id = formData.user.id;
          const { id: unit_id } = formData.unit;
          const { id: scale_id } = formData.scale;

          for (let day of formData.selectedDays) {
            const { date_start, date_end } = day;

            const {
              data: { data },
            } = await requestIntercept(
              api.get,
              '/v2/admin/agendas/check_month_day',
              {
                date_start,
                date_end,
                user_id,
                hour_start,
                hour_end,
              }
            );

            if (data.blocked_days.length) {
              const sameUnit = data.blocked_days.every(
                (schedule) => schedule.unit_id == unit_id
              );

              if (sameUnit) {
                const sameScale = data.blocked_days.some(
                  (schedule) => schedule.scale_id == scale_id
                );

                if (sameScale) {
                  setLoading(false);
                  return reject('ALREADY_SCALED_THIS_HISPITAL');
                }
                if (formData?.confirm) {
                  const response = await requestIntercept(
                    api.post,
                    `/v1/agendas/create_agenda`,
                    { ...formData, confirm: null }
                  );

                  if (response.status !== 200 && response.status !== 201) {
                    throw response;
                  }
                  setLoading(false);

                  return reject('SAME_HOSPITAL_OTHER_SCALE_CREATED');
                }
                setLoading(false);

                return reject('SAME_HOSPITAL_OTHER_SCALE');
              } else {
                setLoading(false);
                return reject('ALREADY_SCALED_OTHER_HISPITAL');
              }
            }
          }

          const response = await requestIntercept(
            api.post,
            `/v1/agendas/create_agenda`,
            formData
          );

          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }

          setLoading(false);
          resolve('success');
        } catch (error) {
          setLoading(false);
          setError(error);
          reject('error');
        }
      })();
    });

  const deleteAgenda = async ({ id, comment }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.delete,
            `/v1/agendas/${id}`,
            {},
            {
              data: {
                comment,
              },
            }
          );

          if (response?.status !== 200 && response?.status !== 201) {
            throw response;
          }
          setTimeout(() => {
            setLoading(false);
            resolve('success');
          }, 500);
        } catch (error) {
          setLoading(false);
          setError(error);
          reject('error');
        }
      })();
    });

  return {
    loading,
    data,
    total,
    error,
    setData,
    getAgenda,
    createAgenda,
    deleteAgenda,
  };
};
