import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useScpecialties = () => {
  const { requestIntercept } = useAuth();
  const [specialties, setSpecialties] = useState({
    dataSpecialties: [],
    loadingSpecialties: false,
    error: null,
    totalSpecialties: 0,
  });
  const [specialtiesFilter, setSpecialtiesFilter] = useState({
    dataSpecialtiesFilter: [],
    loadingSpecialtiesFilter: false,
    errorSpecialtiesFilter: null,
    totalSpecialtiesFilter: 0,
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

  const getFilterSpecialties = async (page, perPage, id) => {
    setSpecialtiesFilter({
      ...specialtiesFilter,
      loadingSpecialtiesFilter: true,
    });
    try {
      const response = await requestIntercept(
        api.get,
        `/v1/units/${id}/specialties`,
        {
          page,
          per_page: perPage,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setSpecialtiesFilter({
          ...specialtiesFilter,
          dataSpecialtiesFilter: response.data.data,
          loadingSpecialtiesFilter: false,
          totalSpecialtiesFilter: response.data.total,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setSpecialtiesFilter({
        ...specialtiesFilter,
        errorShifts: null,
        messageShifts: 'Algo deu errado',
        loadingSpecialtiesFilter: false,
      });
    }
  };

  return {
    specialties,
    specialtiesFilter,

    // func
    getSpecialties,
    getFilterSpecialties,
  };
};

export default useScpecialties;
