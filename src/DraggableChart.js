import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Draggable from 'highcharts-draggable-points';

HighchartsDrilldown(Highcharts);

const DraggableChart = () => {
  const [data, setData] = useState([
    { name: 'Point 1', x: 1, y: 5 },
    { name: 'Point 2', x: 2, y: 3 },
    { name: 'Point 3', x: 3, y: 4 },
    { name: 'Point 4', x: 4, y: 7 },
    { name: 'Point 5', x: 5, y: 2 },
    { name: 'Point 6', x: 6, y: 8 },
    { name: 'Point 7', x: 7, y: 6 },
    { name: 'Point 8', x: 8, y: 4 },
    { name: 'Point 9', x: 9, y: 5 },
    { name: 'Point 10', x: 10, y: 7 },
  ]);

  const options = {
    chart: {
      backgroundColor: '#f6f6f6'
    },
    xAxis: {
      type: 'datetime',
      visible: false
    },
    yAxis: {
      visible: false
    },
    series: [{
      data: data
    }],
    legend: {
      enabled: false
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    plotOptions: {
        draggable: true // added this line
      }
    
  };

  useEffect(() => {
    Draggable(Highcharts);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default DraggableChart;
