import { useState } from 'react';
import api from 'service/api';
import { useAuth } from 'hook/auth';
import fileDownload from 'js-file-download';

export const useReports = () => {
  const { requestIntercept } = useAuth();

  const [loading, setLoading] = useState(false);

  const getJoinedStringScales = (scales) => {
    let joinedStringScales = scales
      .map((item) => item.value)
      .join('&scale_id=');
    return (joinedStringScales =
      scales.length > 0 ? `scale_id=${joinedStringScales}` : '');
  };

  const getFileDownload = async ({
    docUrl,
    scales,
    params,
    resolve,
    reject,
  }) => {
    const response = await requestIntercept(
      api.get,
      `${docUrl}${getJoinedStringScales(scales)}`,
      params,
      {
        responseType: 'blob',
      }
    );
    if (response?.status !== 200 && response?.status !== 201) {
      setLoading(false);
      reject('Algo deu Errado! Tente novamente mais tarde!');
      throw response;
    }

    const contentType = response.headers['content-type'];
    let filename = 'documento.xlsx';
    const disposition = response.headers['content-disposition'];
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
    fileDownload(response.data, filename, contentType);
    setTimeout(() => {
      setLoading(false);
      resolve();
    }, 400);
  };

  const getExport = ({ type, typeDate, scales }, params) =>
    new Promise((resolve, reject) => {
      (async function () {
        try {
          setLoading(true);
          let docUrl = '';
          // Operacional MP
          if (type === 'operationalMP' && typeDate === 'mensal') {
            docUrl = `/v2/admin/reports/excel/scale/operational?`;
            getFileDownload({
              docUrl,
              scales,
              params: { ...params },
              resolve,
              reject,
            });
          }
          // OPERACIONAL
          if (type === 'operational' && typeDate === 'mensal') {
            docUrl = `/v1/reports/excel/scale?`;
            getFileDownload({
              docUrl,
              scales,
              params: { ...params, type },
              resolve,
              reject,
            });
          }
          // FINANCEIRO
          else if (type === 'financial' && typeDate === 'mensal') {
            docUrl = `${api.getBaseURL()}/v1/reports/excel/financial?`;
            getFileDownload({ docUrl, scales, params, resolve, reject });
          } else if (type === 'financial' && typeDate === 'period') {
            docUrl = `${api.getBaseURL()}/v1/reports/excel/financial?`;
            getFileDownload({ docUrl, scales, params, resolve, reject });
          }
        } catch (error) {
          setLoading(false);
          reject('Algo deu Errado! Tente novamente mais tarde!');
        }
      })();
    });

  return {
    loading,
    getExport,
  };
};
