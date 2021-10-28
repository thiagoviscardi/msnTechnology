import React from 'react';
import api from 'service/api';
import { useAuth } from './auth';
import moment from 'moment';

function formatDateStart(dateStart) {
  if (dateStart === moment().format('YYYY-MM-DD')) {
    dateStart = moment().format('YYYY-MM-DD HH:mm:ss');
  } else {
    dateStart = `${dateStart} 23:59:59`;
  }

  return dateStart;
}

const useDashboardBi = () => {
  const { requestIntercept } = useAuth();
  const [dashboardBi, setDashboardBi] = React.useState({
    dataBi: '',
    dataBiTotalMounth: '',
    loadingBi: false,
    totalBi: 0,
    errorBi: null,
  });

  const [dashboardBiDetail, setDashboardBiDetail] = React.useState({
    dataBiDetail: {},
    loadingBiDetail: false,
    totalBiDetail: 0,
    errorBiDetail: null,
  });

  const getDashboardBi = async (day) => {
    setDashboardBi({ ...dashboardBi, loadingBi: true });

    let dateStart = formatDateStart(day);

    try {
      const response = await requestIntercept(api.get, '/v1/dashboard/bi', {
        date: dateStart,
      });
      if (response.status !== 200 && response.status !== 201) {
        throw response;
      }
      setDashboardBi({
        ...dashboardBi,
        dataBi: response.data.data,
        loadingBi: false,
      });
      const responseRefresh = await requestIntercept(
        api.get,
        '/v1/dashboard/bi/total_month',
        {
          date: dateStart,
        }
      );
      if (responseRefresh.status !== 200 && responseRefresh.status !== 201) {
        throw responseRefresh;
      }
      setDashboardBi({
        ...dashboardBi,
        dataBi: response.data.data,
        dataBiTotalMounth: responseRefresh.data.data,
        loadingBi: false,
      });
    } catch (err) {
      setDashboardBi({ ...dashboardBi, loadingBi: false, errorBi: err });
    }
  };

  const getDashboardBiDetail = async (id, typeShift, day) => {
    setDashboardBiDetail({ ...dashboardBiDetail, loadingBiDetail: true });

    let dateStart = formatDateStart(day);
    const unit_id = id;
    const type = typeShift;
    try {
      const response = await requestIntercept(
        api.get,
        '/v1/dashboard/bi/detail',
        {
          date: dateStart,
          unit_id,
          type,
        }
      );
      if (response.status !== 200) {
        throw response;
      }
      setDashboardBiDetail({
        ...dashboardBiDetail,
        dataBiDetail: response.data.data,
        loadingBiDetail: false,
        totalBiDetail: response.data.total,
      });
    } catch (err) {
      setDashboardBiDetail({
        ...dashboardBiDetail,
        loadingBiDetail: false,
        errorBiDetail: err,
      });
    }
  };

  return {
    getDashboardBi,
    getDashboardBiDetail,
    dashboardBi,
    dashboardBiDetail,
  };
};

export default useDashboardBi;
