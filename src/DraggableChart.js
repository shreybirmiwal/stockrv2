import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Draggable from 'highcharts-draggable-points';

const DraggableChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const initialData = [];
    for (let i = 0; i < 10; i++) {
      initialData.push(Math.random() * 100);
    }
    setData(initialData);
  }, []);

  useEffect(() => {
    Draggable(Highcharts);
  }, []);

  const options = {
    title: {
      text: 'Draggable Chart'
    },
    series: [{
      data: data
    }]
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};

export default DraggableChart;
