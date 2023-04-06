import { useState, useEffect } from 'react';
import { fetchData } from '../../lib/fetchData';

export function useFetch(url: string, options?: any, doInitialCall: boolean = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const fetchDataManually = async (newOptions?: any) => {
    setLoading(true);
    fetchData(url, { ...options, ...newOptions })
      .then((dataFetched) => setData(dataFetched))
      .catch((errorFetched) => setError(errorFetched))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (doInitialCall) fetchDataManually();
  }, [url, options]);

  return { data, loading, error, fetchDataManually };
}
