import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useRequests = () => {
  const { requestIntercept } = useAuth();
  const [requests, setRequests] = useState({
    data: [],
    loading: false,
    error: null,
    total: 0,
    statusRequest: '',
    messageRequest: '',
  });
  const [docsList, setDocsList] = useState({
    list: [],
    loadingDocsList: false,
    errorDocsList: null,
    totalDocsList: 0,
  });

  const getRequests = async (
    page,
    perPage,
    search,
    status,
    groupId,
    unitId
  ) => {
    setRequests({ ...requests, loading: true });
    try {
      const response = await requestIntercept(api.get, '/v1/users', {
        page,
        per_page: perPage,
        search,
        status,
        group_id: groupId,
        unit_id: unitId,
      });
      if (response.status !== 200) {
        throw response;
      }
      setRequests({
        ...requests,
        data: response.data.data,
        loading: false,
        total: response.data.total,
        statusRequest: response.status,
        messageRequest: response.data.msg,
      });
    } catch (err) {
      setRequests({
        ...requests,
        error: err,
        loading: false,
        messageRequest: 'Algo deu errado',
      });
    }
  };

  const getUserDocs = async (page, perPage, doctorId) => {
    setDocsList({ ...docsList, loadingDocsList: true });
    try {
      const response = await requestIntercept(
        api.get,
        `v1/users/${doctorId}/documents`,
        {
          page,
          per_page: perPage,
        }
      );
      if (response.status !== 200) {
        throw response;
      }
      setDocsList({
        ...docsList,
        list: response.data.data,
        loadingDocsList: false,
        totalDocsList: response.data.total,
      });
    } catch (err) {
      setDocsList({ ...docsList, errorDocsList: err, loadingDocsList: false });
    }
  };

  const updateUserRequest = async (idUser, status) => {
    setRequests({ ...requests, loading: true });
    try {
      const response = await requestIntercept(
        api.put,
        `/v1/users/moderator/${idUser}`,
        { status }
      );
      if (response.status !== 200) {
        throw response;
      }
      const listUsersUpdated = requests.data.filter(
        (item) => item.id !== idUser
      );
      setRequests({
        ...requests,
        data: [...listUsersUpdated],
        loading: false,
        total: response.data.total,
        statusRequest: response.status,
        messageRequest: response.data.msg,
      });
    } catch (err) {
      setRequests({
        ...requests,
        error: err,
        loading: false,
        messageRequest: err,
      });
    }
  };

  return {
    requests,
    docsList,

    // func
    setRequests,
    getRequests,
    getUserDocs,
    updateUserRequest,
  };
};

export default useRequests;
