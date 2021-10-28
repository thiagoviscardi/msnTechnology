import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useSpecialties = () => {
  const { requestIntercept } = useAuth();
  const [specialties, setSpecialties] = useState({
    dataSpecialties: [],
    loadingSpecialties: false,
    error: null,
    totalSpecialties: 0,
  });
  const [specialtiesId, setSpecialtiesId] = useState({
    dataSpecialtiesId: [],
    loadingSpecialtiesId: false,
    erroIdr: null,
    totalSpecialtiesId: 0,
  });

  const getSpecialties = async (page, perPage, search) => {
    setSpecialties({ ...specialties, loadingSpecialties: true });
    try {
      const response = await requestIntercept(api.get, '/v1/specialties', {
        page,
        per_page: perPage,
        search,
      });

      if (response.status !== 200) {
        throw response;
      }
      setSpecialties({
        ...specialties,
        dataSpecialties: response.data.data,
        loadingSpecialties: false,
      });
    } catch (err) {
      setSpecialties({ ...specialties, error: err, loadingSpecialties: false });
    }
  };
  const getSpecialtiesID = async (page, perPage, id, unit_id) => {
    setSpecialtiesId({ ...specialtiesId, loadingSpecialtiesId: true });
    try {
      const response = await requestIntercept(
        api.get,
        `/v1/units/${id}/specialties`,
        {
          page,
          per_page: perPage,
          unit_id,
        }
      );

      if (response.status !== 200) {
        throw response;
      }
      setSpecialtiesId({
        ...specialtiesId,
        dataSpecialtiesId: response.data.data,
        loadingSpecialtiesId: false,
      });
    } catch (err) {
      setSpecialtiesId({
        ...specialtiesId,
        error: err,
        loadingSpecialtiesId: false,
      });
    }
  };

  return {
    specialties,
    specialtiesId,
    // func
    getSpecialties,
    getSpecialtiesID,
  };
};

export default useSpecialties;
