import React from 'react'
import { getHourlyExchangeVolume } from '../services/cryptoEndpoints';
import FetchWithCache from '../utils/FetchWithCache';

function HourlyMarketVolume({cryptocurrencySymbol}) {
    const [loading, setLoading] = React.useState(false);
    const [hourlyPriceData, setHourlyPriceData] = React.useState(null);
    const apiRef = React.useRef();
    const getHourlyMarketVolume = async () => {
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
        getHourlyExchangeVolume({ cryptocurrencySymbol })
      );
    };
  
    React.useEffect(() => {
      initAPI();
      getHourlyMarketVolume();
      return () => {
        if (apiRef.current && "cancelFetch" in apiRef.current) {
          apiRef.current.cancelFetch();
        }
      };
    }, [cryptocurrencySymbol]);
  return (
    <div>HourlyMarketVolume</div>
  )
}

export default HourlyMarketVolume