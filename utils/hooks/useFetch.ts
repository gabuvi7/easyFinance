/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { fetchData } from '../../lib/fetchData';

interface DataReceived {
  onDataReceived: (data: any) => void;
}

interface UseFetchParams<T> {
  url: string;
  options?: any;
  doInitialCall?: boolean;
  maxRetry?: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  onDataReceived?: (data: T) => void;
}

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  fetchDataManually: (newOptions?: any, dataReceived?: DataReceived) => Promise<void>;
}

export function useFetch<T>({
  url,
  options,
  doInitialCall = true,
  maxRetry = 0,
  onSuccess,
  onError,
}: UseFetchParams<T>): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const retryCountRef = useRef(0);
  const optionsRef = useRef(options);

  const fetchDataManually = async (
    newOptions?: any,
    dataReceived?: DataReceived
  ): Promise<void> => {
    setLoading(true);
    return fetchData<T>(url, { ...optionsRef.current, ...newOptions })
      .then((dataFetched) => {
        setData(dataFetched);
        retryCountRef.current = 0; // reset retry count when fetch succeeds
        if (dataReceived) dataReceived.onDataReceived(dataFetched); // Invoke the onDataReceived callback
        onSuccess?.();
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
