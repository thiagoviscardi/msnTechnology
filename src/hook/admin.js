import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useAdmin = () => {
  const { requestIntercept } = useAuth();
  const [professional, setProfessional] = useState({
    dataProfessional: [],
    loadingProfessional: false,
    errorProfessional: null,
    totalProfessional: 0,
    messageProfessional: '',
    statusProfessional: '',
  });

  const getAllProfessional = async (page, perPage, unitId, dateStart) => {
    setProfessional({
      ...professional,
      loadingProfessional: true,
    });
    try {
      const response = await requestIntercept(
        api.get,
        '/v1/agendas/operation',
        {
          page,
          per_page: perPage,
          date_start: dateStart,
          unit_id: unitId,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setProfessional({
          ...professional,
          dataprofessional:
            response.data.data.units.length === 1
              ? response.data.data.units[0].agendas
              : [],
          loadingprofessional: false,
          totalprofessional: response.data.total,
          messageprofessional: response.data.msg,
          statusprofessional: response.status,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setProfessional({
        ...professional,
        errorProfessional: null,
        messageProfessional: 'Algo deu errado',
        loadingProfessional: false,
      });
    }
  };

  const [adminRegister, setAdminRegister] = useState({
    adminRegisterData: {},
    adminRegisterLoading: false,
    adminRegisterError: null,
    adminMessage: '',
  });

  const registerAdmin = async (data) => {
    const { name, lastName, cpf, cellPhone, email } = data;
    setAdminRegister({
      ...adminRegister,
      adminRegisterLoading: true,
    });
    try {
      const response = await api.post('/v1/admin', {
        name,
        last_name: lastName,
        email,
        cpf,
        cell_phone: cellPhone,
      });
      if (response.status !== 200) {
        throw response;
      }
      setAdminRegister({
        ...adminRegister,
        adminRegisterData: response.data.data,
        adminRegisterLoading: false,
        adminMessage: response.data.msg,
      });
    } catch (err) {
      setAdminRegister({
        ...adminRegister,
        adminRegisterError: err,
        adminRegisterLoading: false,
        adminMessage: 'Algo deu errado',
      });
    }
  };

  return {
    professional,
    registerAdmin,
    // func
    getAllProfessional,
  };
};

export default useAdmin;
