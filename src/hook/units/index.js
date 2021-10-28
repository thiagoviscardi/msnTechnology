import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';
import useUnit from 'hook/unit';
import { useUnitDocuments } from 'hook/units/documents';

export const useUnits = () => {
  const { requestIntercept } = useAuth();
  const { registerLogoUnit } = useUnit();
  const { createDocument } = useUnitDocuments();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getList = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(api.get, `/v1/units`, params);
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setTotal(response.data.total);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
    }
  };

  const getOne = async ({ id }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(api.get, `/v1/units/${id}`);
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

  const formatDataRequest = (data) => {
    const {
      address,
      cell_phone,
      cnpj,
      description,
      email,
      name,
      setting_timezone,
      social_name,
      tolerance,
    } = data;

    return {
      address: {
        ...address,
        geolocation: address?.geolocation ? 1 : 0,
        latitude: address?.latitude || '',
        longitude: address?.longitude || '',
        distance: address?.distance || 0,
      },
      cell_phone,
      cnpj,
      description,
      email,
      name,
      setting_timezone,
      social_name,
      tolerance,
    };
  };

  const getCreate = async ({ data }) => {
    try {
      setLoading(true);

      const response = await requestIntercept(
        api.post,
        `/v1/units`,
        formatDataRequest(data)
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }

      if (data?.file) {
        registerLogoUnit({ unit_id: response.data.data.id, file: data?.file });
      }

      if (data?.docs && data?.docs.length > 0) {
        data?.docs.map((file) => {
          createDocument({ id_unit: response.data.data.id, file });
        });
      }

      setData(response.data.data);
      setTotal(response.data.total);
      setStatus(response.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getUpdate = async ({ id, data }) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.put,
        `/v1/units/${id}`,
        formatDataRequest(data)
      );
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }

      setData(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
      setStatus(response.status);
    } catch (error) {
      setLoading(false);
      setStatus(error);
    }
  };

  const getDelete = async ({ id, filter }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(api.delete, `/v1/units/${id}`);
      if (response.status !== 200) {
        throw response;
      }
      getList(filter);
      setData((oldData) => [...oldData.filter((item) => item.id !== id)]);
      setTotal(total - 1);
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  const toggleStatus = async ({ id, status }) => {
    try {
      const response = await requestIntercept(api.put, `/v1/units/${id}`, {
        status: status ? 1 : 0,
      });
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
    toggleStatus,
    setStatus,
    getList,
    getOne,
    getDelete,
    getCreate,
    getUpdate,
  };
};
