import React from "react";
import { Button, Carousel } from "react-bootstrap";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "../constants/colors";

function Chart({ volume, color, xAxisDataKey, yAxisDataKey }) {
  return (
    <>
      <ResponsiveContainer width={"100%"} height={200}>
        <BarChart data={[volume]}>
          <CartesianGrid strokeDasharray="7 5" vertical={false} />
          <XAxis hide dataKey={xAxisDataKey} axisLine={false} />
          <YAxis tickCount={4} axisLine={false} interval="preserveEnd" />
          <Tooltip />
          <Bar
            dataKey={yAxisDataKey}
            fill={color}
            radius={[3, 3, 3, 3]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
function CustomCarousel({
  slides,
  getTitle,
  color,
  xAxisDataKey,
  yAxisDataKey,
}) {
  const [activeVolumeIndex, setActiveVolumeIndex] = React.useState(0);

  const title = React.useMemo(
    () => getTitle(activeVolumeIndex),
    [activeVolumeIndex, getTitle]
  );
  const resetActiveVolume = () => {
    if (slides?.length) {
      setActiveVolumeIndex(slides.length - 1);
    }
  };
  React.useEffect(() => {
    resetActiveVolume();
  }, [slides]);
  return (
    <div className="hourlyMarketVolumeWrapper">
      <div className="chartTitle">
        {!!title && (
          <span className="d-block mx-auto text-center h5">{title}</span>
        )}
      </div>
      <Carousel
        activeIndex={activeVolumeIndex}
        controls={false}
        indicators={false}
      >
        {slides?.map((volume, index) => (
          <Carousel.Item key={volume[xAxisDataKey]}>
            <Chart
              volume={volume}
              color={colors[color]}
              xAxisDataKey={xAxisDataKey}
              yAxisDataKey={yAxisDataKey}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="d-flex justify-content-center align-items-center sliderHandlerWrapper">
        {slides?.map((item, index) => (
          <Button
            key={index}
            variant={`outline-${color}`}
            className={`w-4 h-4 mx-1 rounded-circle p-0 border-4 ${
              activeVolumeIndex === index ? "active" : ""
            }`}
            onClick={() => setActiveVolumeIndex(index)}
          ></Button>
        ))}
      </div>
    </div>
  );
}
function ChartCarousel({ data, getTitle, color, xAxisDataKey, yAxisDataKey }) {
  return (
    <CustomCarousel
      slides={data}
      color={color}
      getTitle={getTitle}
      xAxisDataKey={xAxisDataKey}
      yAxisDataKey={yAxisDataKey}
    ></CustomCarousel>
  );
}

export default ChartCarousel;
