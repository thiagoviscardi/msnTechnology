import { useState } from 'react';
import api from 'service/api';
import { useAuth } from '../auth';
import moment from 'moment';

export const useAgendaValidation = () => {
  const { requestIntercept } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(0);

  const putAgendaValidation = ({ agenda_id }, formData) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.put,
            `v1/agendas/${agenda_id}/validate`,
            formData
          );

          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          setTimeout(() => {
            setLoading(false);
            resolve(response.data.data);
          }, 200);
        } catch (error) {
          setLoading(false);
          setError(error);
          reject('error');
        }
      })();
    });

  const verifyIsPossibleSubstitution = (params) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          const response = await requestIntercept(
            api.get,
            `/v2/admin/agendas/check_month_day`,
            params
          );

          const { data, status } = response;

          const {
            data: { blocked_days },
          } = data;

          if (status !== 200 && status !== 201) {
            throw response;
          }

          const exists = blocked_days.some(
            (item) =>
              moment(item.day).format('YYYY-MM-DD') ===
              moment(params.date_start).format('YYYY-MM-DD')
          );

          resolve(exists);
        } catch (err) {
          reject(false);
        }
      })();
    });

  const putAgendaSubstitution = (
    { agenda_id, substitution, date_agenda_start, date_agenda_end },
    formData
  ) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          const { user } = formData;
          const hour_start = new Date(date_agenda_start);
          const hour_end = new Date(date_agenda_end);

          const params = {
            date_start: date_agenda_start,
            date_end: date_agenda_end,
            user_id: user?.id,
            hour_start: hour_start.getHours(),
            hour_end: hour_end.getHours(),
          };

          setLoading(true);
          const canChange = await verifyIsPossibleSubstitution(params);

          if (canChange) {
            setLoading(false);
            return reject(
              `O profissional selecionado já possui plantão agendado para essa data e horário.`
            );
          }

          const response = await requestIntercept(
            api.put,
            `v1/agendas/${agenda_id}?substitution=${substitution}`,
            formData
          );

          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          setTimeout(() => {
            setLoading(false);
            resolve(response.data.data);
          }, 200);
        } catch (error) {
          setLoading(false);
          setError(error);
          reject('error');
        }
      })();
    });

  const putAgendaPaymentAtSight = ({ agenda_id, comment }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.put,
            `v1/agendas/${agenda_id}/at_sight`,
            { at_sight: 1, comment }
          );

          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }
          setTimeout(() => {
            setLoading(false);
            resolve(response.data.data);
          }, 200);
        } catch (error) {
          setLoading(false);
          setError(error);
          reject('error');
        }
      })();
    });

  return {
    loading,
    error,
    putAgendaValidation,
    putAgendaSubstitution,
    putAgendaPaymentAtSight,
  };
};
