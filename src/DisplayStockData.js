import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import DummyData from "./DummyData.js";

const DisplayStockData = () => {
  const [data, setData] = useState(DummyData[0]);

  const options = {
    chart: {
      zoomType: "none",
    },
    title: {
      text: "",
    },
    rangeSelector: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    yAxis: [
      {
        title: {
          text: "OHLC",
        },
        height: "100%",
        lineWidth: 2,
      },
      {
        title: {
          text: "Volume",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      },
    ],
    tooltip: {
      enabled: false,
    },
    series: [
      {
        type: "candlestick",
        name: "Stock Prices",
        data: data,
        dataGrouping: {
          units: [
            ["day", [1]],
            ["week", [1]],
            ["month", [1, 2, 3, 4, 6]],
          ],
        },
      },
      {
        type: "column",
        name: "Volume",
        data: data.map((d) => [d.day, d.volume]),
        yAxis: 1,
        dataGrouping: {
          units: [
            ["day", [1]],
            ["week", [1]],
            ["month", [1, 2, 3, 4, 6]],
          ],
        },
      },
    ],
  };

  const handleRefresh = () => {
    const randomIndex = Math.floor(Math.random() * DummyData.length);
    setData(DummyData[randomIndex]);
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default DisplayStockData;