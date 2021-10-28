import { useState, useCallback } from 'react';
import api from 'service/api';
import { useAuth } from './auth';

export const useExchanges = () => {
  const { requestIntercept } = useAuth();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getJoinedStringCustomFilter = (custom_filter) => {
    let joinedCustomFilter = custom_filter
      .map((item) => item.id)
      .join('&custom_filter=');

    return (joinedCustomFilter =
      custom_filter.length > 0 ? `&custom_filter=${joinedCustomFilter}` : '');
  };

  const getJoinedStringScale = (scales) => {
    let joinedStringScales = scales.map((item) => item.id).join('&scale=');

    return (joinedStringScales =
      scales.length > 0 ? `&scale=${joinedStringScales}` : '');
  };

  const getExchanges = useCallback(async (params) => {
    try {
      setLoading(true);
      const {
        filter,
        date_start,
        date_end,
        unit_id,
        page,
        per_page,
        search,
        custom_filter,
        scales,
      } = params;

      const response = await requestIntercept(
        api.get,
        `/v2/admin/reports/exchanges?filter=${filter}${getJoinedStringCustomFilter(
          custom_filter
        )}${getJoinedStringScale(scales)}`,
        { date_start, date_end, unit_id, page, per_page, search }
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
  }, []);

  return {
    loading,
    data,
    total,
    getExchanges,
  };
};
