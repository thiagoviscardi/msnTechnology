import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';
import useUnit from 'hook/unit';
import { useUnitDocuments } from 'hook/units/documents';
import { useHistory } from 'react-router-dom';

export const useSpecialty = () => {
  const { requestIntercept } = useAuth();
  const { registerLogoUnit } = useUnit();
  const { createDocument } = useUnitDocuments();
  const history = useHistory();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getList = async (params) => {
    try {
      setLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v2/admin/specialties`,
        params
      );
      if (response.status !== 200) {
        throw response;
      }
      setData(response.data.data);
      setTotal(response.data.pagination.total_items);
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
        `/v2/admin/specialties/${id}`
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

  const getCreate = async ({ data }) => {
    try {
      setLoading(true);
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
      const response = await requestIntercept(
        api.post,
        `/v2/admin/specialties`,
        {
          address: { ...address, geolocation: address?.geolocation ? 1 : 0 },
          cell_phone,
          cnpj,
          description,
          email,
          name,
          setting_timezone,
          social_name,
          tolerance,
        }
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
      setLoading(false);
      setTimeout(() => {
        history.push(`/cadastros/profissional`);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setStatus(error);
    }
  };

  const getUpdate = async ({ id, data }) => {
    try {
      setLoading(true);
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
      const response = await requestIntercept(
        api.put,
        `/v2/admin/specialties/${id}`,
        {
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
        }
      );
      if (response.status !== 200) {
        throw response;
      }

      setData(response.data.data);
      setTotal(response.data.total);
      setLoading(false);
      setStatus(201);
    } catch (error) {
      setLoading(false);
      setStatus(error);
    }
  };

  const getDelete = async ({ id }) => {
    try {
      setDeleteLoading(true);
      const response = await requestIntercept(
        api.get,
        `/v2/admin/specialties/${id}`
      );
      if (response.status !== 200) {
        throw response;
      }
      setData((oldData) => [...oldData.filter((item) => item.id !== id)]);
      setTotal(total - 1);
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
    }
  };

  return {
    data,
    total,
    loading,
    deleteLoading,
    status,
    setStatus,
    getList,
    getOne,
    getDelete,
    getCreate,
    getUpdate,
  };
};
