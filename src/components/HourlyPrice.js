import React from "react";
import { getHourlyHistoricalData } from "../services/cryptoEndpoints";
import useAPI from "../hooks/useAPI";
import { Card } from "react-bootstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import formatTime from "../utils/formatTime";
import colors from "../constants/colors";
import Loading from "./Loading";
import useCrypto from "../hooks/useCrypto";

function getRanges(Data) {
  const max = {
    value: 0,
    index: 0,
  };
  const min = {
    value: 0,
    index: 0,
  };
  Data.map((data, index) => {
    const { high = 0, low = 0 } = data;
    if (max.value < high) {
      max.value = high;
      max.index = index;
    }
    if (min.value > low) {
      min.value = high;
      min.index = index;
    }
  });
  const now = new Date().getTime() / 1000;
  return {
    max: {
      from: formatTime(Data[max.index].time),
      to: formatTime(Data[max.index + 1]?.time ?? now),
    },
    min: {
      from: formatTime(Data[min.index].time),
      to: formatTime(Data[min.index]?.time ?? now),
    },
  };
}
function getChartData(Data) {
  return Data.map((data) => {
    const average = ((data.high + data.low) / 2).toFixed(2);
    const { high = 0, low = 0, time } = data;

    return {
      time: formatTime(time),
      higher: high.toFixed(2),
      lower: low.toFixed(2),
      average,
    };
  });
}
function HourlyPrice({ cryptocurrencySymbol, currencySymbol }) {
  const { indexes, setRanges } = useCrypto();
  const [hourlyPriceData, setHourlyPriceData] = React.useState(null);
  const [loading, fetchAPI, setFetchParams] = useAPI();

  const getHourlyPriceData = async () => {
    try {
      setFetchParams(
        getHourlyHistoricalData({ cryptocurrencySymbol, currencySymbol })
      );
      const res = await fetchAPI();
      if (Array.isArray(res?.Data?.Data)) {
        setHourlyPriceData(getChartData(res.Data.Data));
        setRanges(getRanges(res.Data.Data));
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getHourlyPriceData();
  }, [cryptocurrencySymbol, currencySymbol]);

  return (
    <Card className="rounded-4">
      <Card.Body>
        {loading ? (
          <Loading height={300} />
        ) : (
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart data={hourlyPriceData}>
              <CartesianGrid strokeDasharray="7 5" vertical={false} />
              <XAxis dataKey="time" axisLine={false} />
              <YAxis tickCount={4} axisLine={false} />
              <Tooltip />
              {indexes.higher && (
                <Bar
                  dataKey="higher"
                  fill={colors.green}
                  radius={[3, 3, 3, 3]}
                  barSize={10}
                />
              )}
              {indexes.average && (
                <Bar
                  dataKey="average"
                  fill={colors.yellow}
                  radius={[3, 3, 3, 3]}
                  barSize={10}
                />
              )}
              {indexes.lower && (
                <Bar
                  dataKey="lower"
                  fill={colors.red}
                  radius={[3, 3, 3, 3]}
                  barSize={10}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  );
}

export default HourlyPrice;
