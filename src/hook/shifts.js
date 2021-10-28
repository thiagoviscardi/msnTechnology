import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useShifts = () => {
  const { requestIntercept } = useAuth();
  const [shifts, setShifts] = useState({
    dataShifts: [],
    loadingShifts: false,
    errorShifts: null,
    totalShifts: 0,
    messageShifts: '',
    statusShifts: '',
  });
  const [scales, setScales] = useState({
    dataScales: {},
    loadingScales: false,
    errorScales: null,
    totalScales: 0,
  });

  let scaleQry = '';
  let situationStatusQry = '';

  const getAllShifts = async ({
    page,
    perPage,
    search,
    unitId,
    dateStart,
    dateEnd,
    filter,
    scaleId,
    situationStatus,
  }) => {
    setShifts({
      ...shifts,
      loadingShifts: true,
    });
    if (filter === 'universal') {
      scaleQry = '';
      situationStatusQry = '';
    }
    scaleId.forEach((scale) => {
      scaleQry = `${scaleQry}&scale_id=${scale.id}`;
    });
    situationStatus.forEach((situationStatus) => {
      if (situationStatus.id === 12) {
        situationStatusQry = `${situationStatusQry}&custom_filter=${situationStatus.id}&custom_filter=21&custom_filter=32`;
      }
      if (situationStatus.id === 13) {
        situationStatusQry = `${situationStatusQry}&custom_filter=${situationStatus.id}&custom_filter=33`;
      }
      if (situationStatus.id === 14) {
        situationStatusQry = `${situationStatusQry}&custom_filter=${situationStatus.id}&custom_filter=34`;
      }
    });
    try {
      const response = await requestIntercept(
        api.get,
        `/v2/admin/agendas/operations?page=${page}&per_page=${perPage}${scaleQry}${situationStatusQry}`,
        {
          filter,
          search,
          date_start: dateStart,
          date_end: dateEnd,
          unit_id: unitId,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setShifts({
          ...shifts,
          dataShifts: response.data.data,
          loadingShifts: false,
          totalShifts: response.data.pagination.total_items,
          messageShifts: response.data.msg,
          statusShifts: response.status,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setShifts({
        ...shifts,
        dataShifts: [],
        errorShifts: null,
        messageShifts: 'Algo deu errado',
        loadingShifts: false,
      });
    }
  };

  const getAllScalesStatus = async (unitId, dateStart, dateEnd) => {
    setScales({
      ...scales,
      loadingScales: true,
    });
    try {
      const response = await requestIntercept(
        api.get,
        `/v2/admin/agendas/operations/dashboard`,
        { unit_id: unitId, date_start: dateStart, date_end: dateEnd }
      );
      if (response.status === 200) {
        setScales({
          ...scales,
          dataScales: response.data.data,
          loadingScales: false,
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
    shifts,
    scales,

    // func
    getAllShifts,
    getAllScalesStatus,
  };
};
export default useShifts;
