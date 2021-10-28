import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useUnit = () => {
  const { requestIntercept } = useAuth();
  const [units, setUnits] = useState({
    dataUnits: [],
    loadingUnits: false,
    errorUnits: null,
    totalUnits: 0,
    messageUnits: '',
    statusUnits: '',
  });
  const [unit, setUnit] = useState({
    unitDetail: '',
    loading: false,
    error: null,
  });
  const [logoUnit, setlogoUnit] = useState({
    logo: {},
    logoLoading: false,
    logoError: null,
  });
  const [unitRegister, setUnitRegister] = useState({
    unitRegister: {},
    unitRegisterLoading: false,
    unitRegisterError: null,
    unitRegisterMessage: '',
    unitRegisterStatus: '',
  });
  const [deleteUnitLoading, setDeleteUnitLoading] = useState(false);

  const getUnits = async (page, perPage, search, company_id) => {
    setUnits({ ...units, loadingUnits: true });
    try {
      const response = await requestIntercept(api.get, '/v1/units', {
        page,
        per_page: perPage,
        company_id,
        search,
      });
      if (response.status !== 200) {
        throw response;
      }
      setUnits({
        ...units,
        loadingUnits: false,
        dataUnits: response.data.data,
        totalUnits: response.data.total,
      });
    } catch (err) {
      setUnits({ ...units, loadingUnits: false, errorUnits: err });
    }
  };

  const getUnit = async (id) => {
    setUnit({ ...unit, loading: true });
    try {
      const response = await requestIntercept(api.get, `/v1/units/${id}`);
      if (response.status !== 200) {
        throw response;
      }
      setUnit({
        ...unit,
        loading: false,
        unitDetail: response.data.data,
      });
    } catch (err) {
      setUnit({ ...unit, loading: false, error: err });
    }
  };

  const registerUnit = async (data) => {
    const {
      address: { codePost, complement, district, number, street, city },
      cellPhone,
      cnpj,
      description,
      email,
      name,
      socialName,
    } = data;
    setUnitRegister({
      ...unitRegister,
      unitRegisterLoading: true,
    });
    try {
      const response = await api.post('/v1/units', {
        name,
        email,
        description,
        cnpj,
        social_name: socialName,
        cell_phone: cellPhone,
        address: {
          code_post: codePost,
          complement,
          district,
          city: { id: city.id },
          number,
          street,
        },
      });
      if (response.status !== 200) {
        throw response;
      }
      setUnitRegister({
        ...unitRegister,
        unitRegister: response.data.data,
        unitRegisterLoading: false,
        unitRegisterMessage: response.data.msg,
        unitRegisterStatus: response.status,
      });
    } catch (err) {
      setUnitRegister({
        ...unitRegister,
        unitRegisterError: err,
        unitRegisterLoading: false,
        unitRegisterMessage: err,
      });
    }
  };

  const editUnit = async (data, id) => {
    const {
      address: { codePost, complement, district, number, street, city, state },
      cellPhone,
      cnpj,
      description,
      email,
      name,
      socialName,
      geoCheck,
      distance,
    } = data;
    setUnitRegister({
      ...unitRegister,
      unitRegisterLoading: true,
    });
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      navigator.geolocation.getCurrentPosition(async function (position) {
        const response = await api.put(`/v1/units/${id}`, {
          name,
          email,
          description,
          cnpj,
          social_name: socialName,
          cell_phone: cellPhone,
          setting_timezone: {
            id: 2, // verificar
            code: timezone,
          },
          tolerance: 30, // verificar
          // code_integration: '60', // verificar
          address: {
            geolocation: geoCheck,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            distance,
            code_post: codePost,
            complement,
            district,
            city: {
              id: city.id,
              state: { id: state },
            },
            number,
            street,
          },
        });
        if (response.status !== 200 || response.status !== 201) {
          throw response;
        }
        setUnitRegister({
          ...unitRegister,
          unitRegister: response.data.data,
          unitRegisterLoading: false,
          unitRegisterMessage: response.data.msg,
        });
      });
    } catch (err) {
      setUnitRegister({
        ...unitRegister,
        unitRegisterError: err,
        unitRegisterLoading: false,
        unitRegisterMessage: 'Algo deu errado',
      });
    }
  };

  const deleteUnit = async (id) => {
    setUnits({
      ...units,
      loadingUnits: true,
    });
    setDeleteUnitLoading(true);
    try {
      const response = await api.delete(`/v1/units/${id}`);
      if (response.status !== 200) {
        throw response;
      }
      const notDeletedUnits = units.dataUnits.filter((item) => item.id !== id);
      setUnits({
        ...units,
        dataUnits: [...notDeletedUnits],
        loadingUnits: false,
        messageUnits: response.data.msg,
        statusUnits: response.status,
      });
      setDeleteUnitLoading(false);
    } catch (err) {
      setUnits({
        ...units,
        loadingUnits: false,
        errorUnits: err,
        messageUnits: err,
      });
      setDeleteUnitLoading(false);
    }
  };

  const registerLogoUnit = async ({ unit_id, file }) => {
    setlogoUnit({
      ...logoUnit,
      logoLoading: true,
    });
    try {
      const data = new FormData();
      data.append('picture', file);
      const response = await api.post(`/v1/units/${unit_id}/picture`, data);
      if (response.status !== 200) {
        throw response;
      }
      setlogoUnit({
        ...logoUnit,
        logo: response.data.data,
        logoLoading: false,
      });
    } catch (err) {
      setlogoUnit({ ...logoUnit, logoError: err, logoLoading: false });
    }
  };

  return {
    units,
    unit,
    unitRegister,
    logoUnit,
    // func
    getUnits,
    getUnit,
    registerUnit,
    editUnit,
    deleteUnit,
    deleteUnitLoading,
    registerLogoUnit,
  };
};

export default useUnit;
