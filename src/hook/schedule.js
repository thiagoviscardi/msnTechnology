import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useSchedule = () => {
  const { requestIntercept } = useAuth();
  const [schedule, setSchedule] = useState({
    data: {},
    loading: false,
    error: null,
    total: 0,
  });

  const createSchedule = async ({ per_page = 1000 }) => {
    const price = 700;
    const hourStart = '07:00:00';
    const hourEnd = '13:00:00';
    const user = 1;
    const unit = 27;
    const scale = 670;
    const schedule = 226;

    try {
      const response = await requestIntercept(
        api.post,
        `/v1/agendas/create_agenda?per_page=${per_page}`,
        {
          price,
          hour_start: hourStart,
          hour_end: hourEnd,
          user,
          unit,
          scale,
          per_page,
          schedule,
        }
      );
      if (response.status !== 200) {
        throw response;
      }
      setSchedule({ ...schedule, list: response.data });
    } catch (err) {
      setSchedule({});
    }
  };
  const Delete = async (id) => {
    try {
      const response = await requestIntercept(
        api.delete,
        `/v1/agendas/${id}`,
        {}
      );
      if (response.status !== 200) {
        throw response;
      }
      setSchedule({ ...schedule, list: response.data.data });
    } catch (err) {
      setSchedule({});
    }
  };
  return {
    schedule,
    createSchedule,
    Delete,
  };
};
export default useSchedule;
