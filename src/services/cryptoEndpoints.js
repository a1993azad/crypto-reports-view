import api from "../configs/api"
import getAPIKey from '../utils/getAPIKey';


const headers={authorization:getAPIKey()}
const BASE_URL=`https://min-api.cryptocompare.com`

export const getHourlyHistoricalData=({
    cryptocurrencySymbol,
    currencySymbol,
    limit=10
})=>{
    return {
        url:`${BASE_URL}/data/v2/histohour?fsym=${cryptocurrencySymbol}&tsym=${currencySymbol}&limit=${limit}`,
        method:'GET',
        cacheTime:api.cryptoCacheConfigs.ttl,
        headers
    }
}
export const getHourlyExchangeVolume=({
    cryptocurrencySymbol,
    limit=10
})=>{
    return {
        url:`${BASE_URL}/data/exchange/histohour?tsym=${cryptocurrencySymbol}&limit=${limit}`,
        method:'GET',
        cacheTime:api.cryptoCacheConfigs.ttl,
        headers
    }
}