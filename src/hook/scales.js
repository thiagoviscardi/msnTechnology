import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useScales = () => {
  const { requestIntercept } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [scales, setScales] = useState({
    dataScales: {},
    loadingScales: false,
    errorScales: null,
    totalScales: 0,
  });

  const [scalesFilter, setScalesFilter] = useState({
    dataScalesFilter: [],
    loadingScales: false,
    errorScales: null,
    totalScales: 0,
  });

  const [scalesTimesFilter, setTimesFilterScales] = useState({
    dataTimesScalesFilter: [],
    loadingScales: false,
    totalScales: 0,
    errorTimesScales: null,
  });

  const [specificScaleFilter, setSpecificScaleFilter] = useState({
    dataSpecificScale: [],
    loadingScales: false,
    totalScales: 0,
    errorSpecificScale: null,
  });

  const [timeScalesEdit, setTimeScalesEdit] = useState({
    retornoScala: {},
    statusTimeScales: '',
    error: null,
    total: 0,
  });

  const [scalesEdit, setScalesEdit] = useState({
    retornoScala: {},
    error: null,
    total: 0,
  });

  const [timeCreateScheduleId, setCreateScheduleId] = useState({
    retornoCreateScala: {},
    error: null,
    total: 0,
  });

  const [loadingChange, setLoadingChange] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [status, setStatus] = useState(false);

  const getFilterScales = async (page, perPage, unitId, dateStart, search) => {
    setScalesFilter({
      ...scalesFilter,
      loadingScales: true,
    });
    try {
      const response = await requestIntercept(
        api.get,
        `/v1/units/${unitId}/scales`,
        {
          page,
          per_page: perPage,
          date_start: dateStart,
          unit_id: unitId,
          search,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setScalesFilter({
          ...scalesFilter,
          dataScalesFilter: response.data.data,
          loadingScales: false,
          totalScales: response.data.total,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setScalesFilter({
        ...scalesFilter,
        errorShifts: null,
        messageShifts: 'Algo deu errado',
        loadingShifts: false,
      });
    }
  };

  const getTimesFilterScales = async (unitId, id) => {
    setTimesFilterScales({
      ...scalesTimesFilter,
      loadingScales: true,
    });
    try {
      const response = await requestIntercept(
        api.get,
        `/v1/units/${unitId}/scales/${id}/schedules`,
        {
          per_page: '9999',
        }
      );
      if (response.status === 200 || response.status === 201) {
        setTimesFilterScales({
          ...scalesTimesFilter,
          dataTimesScalesFilter: response.data.data,
          loadingScales: false,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setTimesFilterScales({
        ...scalesTimesFilter,
        errorShifts: null,
        messageShifts: 'Algo deu errado',
        loadingScales: false,
      });
    }
  };

  const editTimesScalesId = async (scale) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      const {
        hour_end,
        hour_start,
        id,
        price,
        price_partner,
        quantity_professional,
        scale_id,
        status,
        week_day,
      } = scale;
      try {
        requestIntercept(api.put, `/v1/schedules/${id}`, {
          hour_end,
          hour_start,
          id,
          price,
          price_partner,
          quantity_professional,
          scale_id,
          status,
          week_day,
        }).then((response) => {
          if (response.status !== 201 && response.status !== 200) {
            throw response;
          }
          setLoading(false);
          setTimeScalesEdit({
            ...timeScalesEdit,
            statusTimeScales: response.status,
            retornoScala: response.data.data,
          });
          resolve();
        });
      } catch (err) {
        setLoading(false);
        setTimeScalesEdit({});
        reject();
      }
    });
  };

  const getSpecificScale = async (unitId, id) => {
    return new Promise((resolve, reject) => {
      try {
        requestIntercept(api.get, `/v1/units/${unitId}/scales/${id}`).then(
          (response) => {
            if (response.status !== 201 && response.status !== 200) {
              throw response;
            }
            setSpecificScaleFilter({
              ...specificScaleFilter,
              dataSpecificScale: response.data.data,
            });
            resolve(response.data.data);
          }
        );
      } catch (err) {
        setSpecificScaleFilter({});
        reject();
      }
    });
  };

  const editScalesId = async (scale, unitId) => {
    return new Promise((resolve, reject) => {
      const {
        budget,
        coordinator_id,
        date_end,
        date_start,
        group,
        id,
        name,
        signature_is_automatic,
        signature_is_required,
        specialty,
        status,
        technical_manager_id,
        type_remuneration,
        scale_type,
        unit,
        specialty_id,
        group_id,
      } = scale;
      try {
        requestIntercept(api.put, `/v1/units/${unitId}/scales/${id}`, {
          budget,
          coordinator_id,
          date_end,
          date_start,
          group,
          id,
          name,
          signature_is_automatic,
          signature_is_required,
          specialty,
          scale_type,
          status,
          technical_manager_id,
          type_remuneration,
          unit,
          specialty_id,
          group_id,
        })
          .then((response) => {
            if (response.status !== 201 && response.status !== 200) {
              throw response;
            }
            setScalesEdit({
              ...scalesEdit,
              retornoScala: response.data.data,
            });
            setStatus(response.status);
            resolve(response);
          })
          .catch((error) => {
            setStatus(error.status);
            reject(error);
          });
      } catch (err) {
        setStatus(err.status);
        setScalesEdit({ error: err });
        reject(err);
      }
    });
  };

  const deleteSchedules = async (schedules) => {
    return new Promise((resolve, reject) => {
      try {
        setDeleteLoading(true);
        api
          .delete('/v1/schedules', {}, { data: { schedules } })
          .then((response) => {
            if (response.status !== 201 && response.status !== 200) {
              throw response;
            }
            setDeleteLoading(false);
            resolve(response);
          })
          .catch((error) => {
            setStatus(error);
            reject(error);
          });
      } catch (err) {
        setDeleteLoading(false);
        reject(err);
      }
    });
  };

  const deleteScale = async (unit_id, scale_id) => {
    return new Promise((resolve, reject) => {
      try {
        setDeleteLoading(true);
        api
          .delete(`v1/scales/${unit_id}/${scale_id}`)
          .then((response) => {
            if (response.status !== 201 && response.status !== 200) {
              throw response;
            }
            setMessage(response.data.msg);
            setDeleteLoading(false);
            resolve(response);
          })
          .catch((error) => {
            setMessage(error.data.msg);
            setStatus(error);
            reject(error);
          });
      } catch (err) {
        setDeleteLoading(false);
        reject(err);
      }
    });
  };

  const createScheduleId = async (scale) => {
    const { scaleId, schedules } = scale;
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.post,
        `/v1/schedules/${scaleId}`,
        [...schedules],
        null,
        true
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
      setStatus(response.status);
      setCreateScheduleId({
        ...timeCreateScheduleId,
        retornoCreateScala: response.data.data,
      });
    } catch (err) {
      setCreateScheduleId({});
      setLoading(false);
      setStatus(err);
    }
  };

  const createScale = async (scaleData, unit_id) => {
    const {
      budget,
      coordinator_id,
      group_id,
      name,
      price,
      procedure_id,
      professional_type,
      scale_type,
      signature_is_automatic,
      signature_is_required,
      specialty_id,
      status,
      technical_manager_id,
      type_remuneration,
      unit,
    } = scaleData;
    try {
      setLoading(true);
      const response = await api.post(`/v1/units/${unit_id}/scales`, {
        budget,
        coordinator_id,
        group_id,
        name,
        price,
        procedure_id,
        professional_type,
        scale_type,
        signature_is_automatic,
        signature_is_required,
        specialty_id,
        status,
        technical_manager_id,
        type_remuneration,
        unit,
      });
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
      setLoading(false);
      setStatus(response.status);
    } catch (err) {
      setLoading(false);
    }
  };

  const changeScalesId = async (id, unitId) => {
    setLoadingChange(true);
    return new Promise((resolve, reject) => {
      try {
        api
          .patch(`/v1/units/${unitId}/scales/${id}/change`)
          .then((response) => {
            if (response.status !== 201 && response.status !== 200) {
              throw response;
            }
            setLoadingChange(false);
            resolve(response);
          })
          .catch((error) => {
            setLoadingChange(false);
            setStatus(error);
            reject(error);
          });
      } catch (err) {
        setLoadingChange(false);
        setStatus(err);
        setScalesEdit({ error: err });
        reject(err);
      }
    });
  };

  const getAllScales = async (
    orderliesDone,
    orderliesRunning,
    orderliesNext,
    orderliesLate,
    orderliesCancelled,
    id
  ) => {
    setScales({
      ...scales,
      loadingScales: true,
    });
    try {
      const response = await requestIntercept(
        api.get,
        `/v1/agendas/${id}/daily-orderlies`,
        {
          orderlies_done: orderliesDone,
          orderlies_running: orderliesRunning,
          orderlies_next: orderliesNext,
          orderlies_late: orderliesLate,
          orderlies_cancelled: orderliesCancelled,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setScales({
          ...scales,
          dataScales: response.data.data,
          loadingScales: false,
          totalScales: response.data.total,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setScales({
        ...scales,
        errorScales: null,
        messageScales: 'Algo deu errado',
        loadingScales: false,
      });
    }
  };

  return {
    scales,
    scalesFilter,
    scalesTimesFilter,
    specificScaleFilter,
    timeScalesEdit,
    timeCreateScheduleId,
    status,
    loadingChange,
    deleteLoading,
    loading,
    message,
    // func
    setTimeScalesEdit,
    setMessage,
    changeScalesId,
    getAllScales,
    getFilterScales,
    getTimesFilterScales,
    getSpecificScale,
    editTimesScalesId,
    editScalesId,
    createScheduleId,
    createScale,
    setStatus,
    deleteSchedules,
    deleteScale,
  };
};

export default useScales;
