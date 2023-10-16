import React from "react";
import { getHourlyExchangeVolume } from "../services/cryptoEndpoints";
import useAPI from "../hooks/useAPI";
import { Card } from "react-bootstrap";
import Loading from "./Loading";
import labels from "../constants/labels";
import formatTime from "../utils/formatTime";
import "../assets/scss/hourlyMarketVolume.scss";
import ChartCarousel from "./ChartCarousel";

function HourlyMarketVolume({ cryptocurrencySymbol }) {
  const [hourlyMarketVolumes, setHourlyMarketVolumes] = React.useState(null);
  const [loading, fetchAPI, setFetchParams] = useAPI();

  const getHourlyMarketVolume = async () => {
    try {
      setFetchParams(getHourlyExchangeVolume({ cryptocurrencySymbol }));
      const res = await fetchAPI();
      if (Array.isArray(res?.Data)) {
        const chartData = res.Data.map((data) => {
          return {
            time: formatTime(data.time),
            volume: data.volume.toFixed(2),
          };
        });
        setHourlyMarketVolumes(chartData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTitle = (activeVolumeIndex) =>
    hourlyMarketVolumes?.length && activeVolumeIndex >= 0
      ? labels.marketVolumeOf(hourlyMarketVolumes[activeVolumeIndex]?.time)
      : "";

  React.useEffect(() => {
    getHourlyMarketVolume();
  }, [cryptocurrencySymbol]);

  return (
    <Card className=" rounded-4">
      <Card.Body>
        {loading ? (
          <Loading height={300} />
        ) : (
          <>
            <ChartCarousel
              data={hourlyMarketVolumes}
              color="green"
              getTitle={getTitle}
              xAxisDataKey="time"
              yAxisDataKey="volume"
            />
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default HourlyMarketVolume;
