import React, { useState, useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Draggable from 'highcharts-draggable-points';
import DraggableChart from './DraggableChart';

const StockChart = () => {
  const [data, setData] = useState([
    [Date.parse('2022-01-01'), 100],
    [Date.parse('2022-01-02'), 120],
    [Date.parse('2022-01-03'), 130],
    [Date.parse('2022-01-04'), 110],
    [Date.parse('2022-01-05'), 115],
    [Date.parse('2022-01-06'), 125],
    [Date.parse('2022-01-07'), 130],
    [Date.parse('2022-01-08'), 135],
    [Date.parse('2022-01-09'), 140],
    [Date.parse('2022-01-10'), 145],
  ]);
  const chartRef = useRef(null);
  const draggableChartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && draggableChartRef.current) {
      const lastValue = data[data.length - 1][1];
      const draggableChart = draggableChartRef.current.getChart();
      draggableChart.series[0].setData([[1, lastValue]]);
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current) {
      Draggable(Highcharts);
    }
  }, [chartRef]);

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
    }
  };

  const handleRefresh = () => {
    const newData = [];
    for (let i = 0; i < 10; i++) {
      newData.push([Date.parse('2022-01-01') + i * 24 * 3600 * 1000, Math.random() * 100]);
    }
    setData(newData);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', height: '100%' }}>
        <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
      </div>
      <div style={{ width: '50%', height: '100%', backgroundColor: '#f6f6f6', position: 'relative' }}>
        <DraggableChart startingValue={2} ref={draggableChartRef} />
      </div>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default StockChart;
