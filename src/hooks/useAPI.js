import React from "react";
import FetchWithCache from "../utils/FetchWithCache";

function useAPI() {
  const [loading, setLoading] = React.useState(false);
  const apiRef = React.useRef();
  const fetchAPI = async () => {
    try {
      setLoading(true);
      return await apiRef.current.fetchData();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const setFetchParams = (params) => {
    if (!apiRef.current) {
      apiRef.current = new FetchWithCache(params);
    } else {
      apiRef.current.set({ ...params });
    }
  };
  const cancelFetch = () => {
    if (apiRef.current && "cancelFetch" in apiRef.current) {
      apiRef.current.cancelFetch();
    }
  };
  React.useEffect(() => {
    return () => {
      cancelFetch();
    };
  }, [1]);
  return [loading, fetchAPI, setFetchParams, cancelFetch];
}

export default useAPI;
