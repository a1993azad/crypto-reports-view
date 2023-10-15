import React from "react";
import FetchWithCache from "../utils/FetchWithCache";
import { getHourlyHistoricalData } from "../services/cryptoEndpoints";

function HourlyPrice({ cryptocurrencySymbol, currencySymbol }) {
  const [loading, setLoading] = React.useState(false);
  const [hourlyPriceData, setHourlyPriceData] = React.useState(null);
  const apiRef = React.useRef();
  const getHourlyPriceData = async () => {
    try {
      setLoading(true);
      const res = await apiRef.current.fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const initAPI = () => {
    apiRef.current = new FetchWithCache(
      getHourlyHistoricalData({ cryptocurrencySymbol, currencySymbol })
    );
  };

  React.useEffect(() => {
    initAPI();
    getHourlyPriceData();
    return () => {
      if (apiRef.current && "cancelFetch" in apiRef.current) {
        apiRef.current.cancelFetch();
      }
    };
  }, [cryptocurrencySymbol, currencySymbol]);
  return <div>HourlyPrice</div>;
}

export default HourlyPrice;
