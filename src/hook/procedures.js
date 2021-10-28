import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useProcedures = () => {
  const { requestIntercept } = useAuth();
  const [procedures, setProcedures] = useState({
    dataProcedures: [],
    loading: false,
    error: null,
    total: 0,
  });

  const [unitProcedures, setUnitProcedure] = useState([]);

  const getProcedures = async ({ per_page = 100 }) => {
    try {
      const response = await requestIntercept(
        api.get,
        `/v1/procedures?per_page=${per_page && per_page}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setProcedures({ ...procedures, dataProcedures: response.data.data });
    } catch (err) {
      setProcedures({});
    }
  };

  const getUnitsProcedures = async ({ scale_id }) => {
    try {
      const response = await requestIntercept(
        api.get,
        `/v1/units/procedure/${scale_id}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setUnitProcedure(response.data.data);
    } catch (err) {
      setProcedures({});
    }
  };

  const getCreateUnitsProcedures = async ({ scale_id, procedures }) => {
    try {
      const response = await requestIntercept(api.post, `/v1/units/procedure`, {
        scale_id,
        procedures,
      });
      if (response.status !== 200) {
        throw response;
      }
    } catch (err) {
      setProcedures({});
    }
  };

  const getUpdateUnitsProcedures = async ({ scale_id, procedures }) => {
    try {
      const response = await requestIntercept(api.put, `/v1/units/procedure`, {
        scale_id,
        procedures,
      });
      if (response.status !== 200) {
        throw response;
      }
    } catch (err) {
      setProcedures({});
    }
  };

  const getDeleteUnitsProcedures = async ({ procedure_id }) => {
    try {
      const response = await requestIntercept(
        api.delete,
        `/v1/units/procedure/${procedure_id}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setUnitProcedure((old) => [
        ...old.filter((item) => item.id !== procedure_id),
      ]);
    } catch (err) {
      setProcedures({});
    }
  };

  return {
    procedures,
    unitProcedures,
    getProcedures,
    getUpdateUnitsProcedures,
    getCreateUnitsProcedures,
    getUnitsProcedures,
    getDeleteUnitsProcedures,
  };
};

export default useProcedures;
