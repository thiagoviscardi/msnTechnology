import { useState } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

const useReport = (
  { page = 1, perPage = 12 } = {
    page: 1,
    perPage: 12,
  }
) => {
  const { requestIntercept } = useAuth();
  const [reports, setReports] = useState({
    list: [],
    loading: false,
    error: null,
    pagination: '',
    status: '',
    msg: '',
    page,
    perPage,
  });
  const [reportsCheck, setReportsCheck] = useState({
    data: [],
    loadingCheckReports: false,
    error: null,
    pagination: '',
    status: '',
    msg: '',
    page,
    perPage,
  });
  const [checkWithDetails, setCheckWithDetails] = useState({
    listCheckDetails: [],
    loadingCheckDetails: false,
    errorCheckDetails: null,
    paginationCheckDetails: '',
    statusCheckDetails: '',
    msgCheckDetails: '',
  });
  const [reportsWithDetails, setReportsWithDetails] = useState({
    listWithDetails: '',
    loadingWithDetails: false,
    errorWithDetails: null,
    paginationWithDetails: '',
    statusWithDetails: '',
    msgWithDetails: '',
  });
  let scaleQry = '';
  let situationStatusQry = '';

  const getCheckInReports = async ({
    page,
    perPage,
    search,
    unitId,
    dateStart,
    dateEnd,
    filter,
    situationStatus,
    scaleId,
  }) => {
    if (filter === 'universal') {
      scaleQry = '';
      situationStatusQry = '';
    }
    setReportsCheck({ ...reportsCheck, loadingCheckReports: true });
    scaleId.forEach((scale) => {
      scaleQry = `${scaleQry}&scale_id=${scale.id}`;
    });
    situationStatus.forEach((situationStatus) => {
      situationStatusQry = `${situationStatusQry}&custom_filter=${situationStatus.id}`;
    });
    setReportsCheck({
      loadingCheckReports: true,
      error: false,
    });
    try {
      const response = await requestIntercept(
        api.get,
        `/v2/admin/reports/checkin?page=${page}&per_page=${perPage}${scaleQry}${situationStatusQry}`,
        {
          filter,
          search,
          unit_id: unitId,
          date_start: dateStart,
          date_end: dateEnd,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setReportsCheck({
          ...reports,
          data: response.data.data,
          loadingCheckReports: false,
          pagination: response.data.pagination.total_items,
          status: response.status,
          msg: response.data.msg,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setReportsCheck({
        loadingCheckReports: false,
        status: err.status,
        msg: err.msg,
      });
    }
  };
  const getCheckInReportsDetails = async ({
    page,
    perPage,
    unitId,
    dateStart,
    dateEnd,
    filter,
    userId,
  }) => {
    setCheckWithDetails({ ...checkWithDetails, loadingCheckDetails: true });
    try {
      const response = await requestIntercept(
        api.get,
        `/v2/admin/reports/checkin?page=${page}&per_page=${perPage}&date_start=${dateStart}&date_end=${dateEnd}&order=date_start&order_by=desc`,
        {
          filter,
          unit_id: unitId,
          user_id: userId,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setCheckWithDetails({
          ...checkWithDetails,
          listCheckDetails: response.data.data,
          loadingCheckDetails: false,
          paginationCheckDetails: response.data.pagination.total_items,
          statusCheckDetails: response.status,
          msgCheckDetails: response.data.msg,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setCheckWithDetails({
        ...checkWithDetails,
        loadingCheckDetails: false,
        statusCheckDetails: err.status,
        msgCheckDetails: err.msg,
      });
    }
  };

  const getReports = async ({
    page,
    perPage,
    search,
    unitId,
    dateStart,
    dateEnd,
    filter,
    situationStatus,
    scaleId,
  }) => {
    if (filter === 'universal') {
      scaleQry = '';
      situationStatusQry = '';
    }
    setReports({ ...reports, loading: true });
    scaleId.forEach((scale) => {
      scaleQry = `${scaleQry}&scale_id=${scale.id}`;
    });
    situationStatus.forEach((situationStatus) => {
      situationStatusQry = `${situationStatusQry}&custom_filter=${situationStatus.id}`;
    });
    try {
      const response = await requestIntercept(
        api.get,
        `/v2/admin/reports?page=${page}&per_page=${perPage}${scaleQry}${situationStatusQry}`,
        {
          filter,
          search,
          date_start: dateStart,
          date_end: dateEnd,
          unit_id: unitId,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setReports({
          ...reports,
          list: response.data.data,
          loading: false,
          pagination: response.data.pagination,
          status: response.status,
          msg: response.data.msg,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setReports({
        loading: false,
        status: err.status,
        msg: err.msg,
      });
    }
  };

  const getReportsWithDetails = async ({
    page,
    perPage,
    unitId,
    dateStart,
    dateEnd,
    filter,
    userId,
    scaleId,
    situationStatus,
  }) => {
    if (filter === 'universal') {
      scaleQry = '';
      situationStatusQry = '';
    }
    scaleId.forEach((scale) => {
      scaleQry = `${scaleQry}&scale_id=${scale.id}`;
    });
    situationStatus.forEach((situationStatus) => {
      situationStatusQry = `${situationStatusQry}&custom_filter=${situationStatus.id}`;
    });
    setReportsWithDetails({ ...reportsWithDetails, loadingWithDetails: true });
    try {
      const response = await requestIntercept(
        api.get,
        `/v2/admin/reports/details?page=${page}&per_page=${perPage}${scaleQry}${situationStatusQry}`,
        {
          filter,
          date_start: dateStart,
          date_end: dateEnd,
          unit_id: unitId,
          user_id: userId,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setReportsWithDetails({
          ...reportsWithDetails,
          listWithDetails: response.data.data,
          loadingWithDetails: false,
          paginationWithDetails: response.data.pagination,
          statusWithDetails: response.status,
          msgWithDetails: response.data.msg,
        });
      } else {
        throw response;
      }
    } catch (err) {
      setReportsWithDetails({
        loadingWithDetails: false,
        statusWithDetails: err.status,
        msgWithDetails: err.msg,
      });
    }
  };

  return {
    reports,
    reportsCheck,
    reportsWithDetails,
    checkWithDetails,
    // func
    getCheckInReports,
    getReports,
    getReportsWithDetails,
    getCheckInReportsDetails,
  };
};

export default useReport;
