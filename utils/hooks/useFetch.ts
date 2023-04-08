/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { fetchData } from '../../lib/fetchData';

interface UseFetchParams {
  url: string;
  options?: any;
  doInitialCall?: boolean;
  maxRetry?: number;
  onError?: (error: any) => void;
}

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  fetchDataManually: (newOptions?: any) => Promise<void>;
}

export function useFetch<T>({
  url,
  options,
  doInitialCall = true,
  maxRetry = 0,
  onError,
}: UseFetchParams): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const retryCountRef = useRef(0);
  const optionsRef = useRef(options);

  const fetchDataManually = async (newOptions?: any) => {
    setLoading(true);
    fetchData<T>(url, { ...optionsRef.current, ...newOptions })
      .then((dataFetched) => {
        setData(dataFetched);
        retryCountRef.current = 0; // reset retry count when fetch succeeds
      })
      .catch((errorFetched) => {
        if (retryCountRef.current < maxRetry) {
          setTimeout(() => {
            retryCountRef.current++;
            fetchDataManually(newOptions);
          }, 1000);
        } else {
          onError?.(errorFetched);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (doInitialCall) fetchDataManually();
  }, [url, doInitialCall]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return { data, loading, fetchDataManually };
}
