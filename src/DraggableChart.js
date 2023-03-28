import React, { useState, useEffect } from 'react';
import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import draggable from "highcharts/modules/draggable-points";

import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  more(Highcharts);
  draggable(Highcharts);
}

const DraggableChart = () => {

  const [data, setData] = useState([
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 6],
    [5, 7],
    [6, 8],
    [7, 9],
    [8, 1],
    [9, 2],
    [10, 3],
  ]);

  return (
    <div>
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"chart"}
      options = {{
    chart: {
      type: 'line',
      backgroundColor: '#ffffcc',
    },
    xAxis: {
      title: {
        text: null,
      },
      visible: false,
    },
    yAxis: {
      title: {
        text: null,
      },
      visible: false,
    },
    series: [
      {
        name: '',
        data: data,
        lineWidth: 2,
      },
    ],
    title: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        dragDrop: {
          draggableX: false,
          draggableY: true,
        },
      },
    },
  }}
    />
  </div>
  );
};

export default DraggableChart;
