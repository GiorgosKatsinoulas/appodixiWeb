import { useState, useEffect } from 'react';

type RequestFunction = (initialValue?: any) => Promise<any>;

export function useRequest(
  requestFn: RequestFunction,
  initialValue: any,
  startRequest: boolean
) {
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [requestData, setRequestData] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      setIsRequesting(true);
      try {
        const data = await requestFn(initialValue);
        setRequestData(data);
      } catch (error) {
        setError({ message: error || 'Failed to fetch data.' });
      }
      setIsRequesting(false);
    }
    if (startRequest) {
      // Only execute if startFetching is true
      fetchData();
    }
  }, [requestFn, initialValue, startRequest]);

  return {
    isRequesting,
    requestData,
    setRequestData,
    error,
  };
}
