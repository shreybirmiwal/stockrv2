import React, { useState, useEffect } from 'react';
import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import draggable from "highcharts/modules/draggable-points";

import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  more(Highcharts);
  draggable(Highcharts);
}

const DraggableChart = ({data, setData}) => {

  const [dataDrag, setDataDrag] = useState([
    [0, data[0].open],
    [1, data[0].open],
    [2, data[0].open],
    [3, data[0].open],
    [4, data[0].open],
    [5, data[0].open],
    [6, data[0].open],
    [7, data[0].open],
    [8, data[0].open],
    [9, data[0].open],
    [10, data[0].open],
  ]);

  useEffect(() => {
    setDataDrag(
      [
        [0, data[0].open],
        [1, data[0].open],
        [2, data[0].open],
        [3, data[0].open],
        [4, data[0].open],
        [5, data[0].open],
        [6, data[0].open],
        [7, data[0].open],
        [8, data[0].open],
        [9, data[0].open],
        [10, data[0].open],
      ]
    )

  }, data); 



  return (
    <div style={{ height: "100vh" }}>
    <HighchartsReact

      containerProps={{ style: { height: "90%" } }}

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
      min: data[0].absMin,
      max: data[0].absMax,
    },
    series: [
      {
        name: '',
        data: dataDrag,
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
