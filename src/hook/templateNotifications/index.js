import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';

export const useTemplateNotifications = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const getList = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v2/notifications`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getOne = async ({ id }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v2/notifications/${id}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getCreate = ({ data }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.post,
            `/v2/notifications`,
            data
          );
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }

          setData(response.data.data);
          setLoading(false);
          resolve();
        } catch (error) {
          setLoading(false);
          reject('Falha ao cadastrar!');
        }
      })();
    });

  const getUpdate = ({ id, data }) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          const response = await requestIntercept(
            api.put,
            `/v2/notifications/${id}`,
            data
          );
          if (response.status !== 200 && response.status !== 201) {
            throw response;
          }

          setData(response.data.data);
          setTimeout(() => {
            setLoading(false);
            resolve();
          }, 500);
        } catch (error) {
          setLoading(false);
          reject('Falha ao editar!');
        }
      })();
    });

  const getDelete = async ({ mainFilter, id }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(
        api.delete,
        `/v2/notifications/${id}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setData((oldData) => [...oldData.filter((item) => item.id !== id)]);
      setTotal(total - 1);
      setDeleteLoading(false);
      getList(mainFilter);
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  const sendNotification = async ({ notificationId, userId }) => {
    setLoading(true);
    try {
      const response = await requestIntercept(
        api.post,
        'v2/notifications/send_notification',
        {
          template_notification_id: notificationId,
          user_id: userId,
        },
        null,
        true
      );
      if (response.status !== 200) {
        throw response;
      }
      setStatus(response.status);
      setMessage(response.data.msg);
      setLoading(false);
    } catch (error) {
      setStatus(error.status);
      setMessage(error?.data?.msg);
      setLoading(false);
    }
  };

  const toggleStatus = async ({ id, status, data }) => {
    try {
      const response = await requestIntercept(
        api.put,
        `/v2/notifications/${id}`,
        {
          ...data,
          status: status ? 1 : 0,
        }
      );
      if (response.status !== 200) {
        throw response;
      }
    } catch (error) {
      // setDeleteLoading(false);
    }
  };

  return {
    data,
    total,
    loading,
    deleteLoading,
    status,
    message,
    setStatus,
    setData,
    getList,
    getOne,
    getCreate,
    getUpdate,
    getDelete,
    sendNotification,
    toggleStatus,
  };
};
