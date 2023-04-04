import React, { useState, useEffect, useRef } from 'react';
import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import draggable from "highcharts/modules/draggable-points";
import Popup from 'reactjs-popup';

import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
  more(Highcharts);
  draggable(Highcharts);
}

const DraggableChart = ({data, setData}) => {
  const chartRef = useRef(null);
  const [PopOpen, setPopOpen] = useState(false);
  const [accuracyPop, SetAccuracyPop] = useState(0);

  const [userResponce, setUserResponce] = useState([
    data[5].close,data[5].close,data[5].close,data[5].close,data[5].close,data[5].close,data[5].close,data[5].close,data[5].close,data[5].close
  ])
  
  const handleSubmit = () => {
    console.log(userResponce);
    console.log(data[0].next);

    const chart = chartRef.current.chart;
    chart.series[1].setVisible(true);

    var accuracy = determineAcuracy();
    console.log(accuracy)
    //SetAccuracyPop(accuracy)
    //setPopOpen(true)
  }

  const determineAcuracy = () => {
    //should be data[0].next
    //is userResponce


    const numItems = userResponce.length;
    let totalDifference = 0;
    
    for (let i = 0; i < numItems; i++) {
      const difference = Math.abs(data[0].next[i] - userResponce[i]) * 1;
      totalDifference += (difference.toFixed(2)*1);
      //console.log("total " +totalDifference)
    }
    
    const averageDifference = totalDifference / numItems;
    const weightedDiff = 100 - ((averageDifference*100) / (data[0].absMax-data[0].absMin));

    if(weightedDiff !== weightedDiff){
      //if its nAn
      return 0;
    }

    return weightedDiff;

  }


  const [dataDrag, setDataDrag] = useState([
    [0, data[5].close],
    [1, data[5].close],
    [2, data[5].close],
    [3, data[5].close],
    [4, data[5].close],
    [5, data[5].close],
    [6, data[5].close],
    [7, data[5].close],
    [8, data[5].close],
    [9, data[5].close],
    [10, data[5].close],
  ]);

  useEffect(() => {
    setDataDrag(
      [
        [0, data[5].close],
        [1, data[5].close],
        [2, data[5].close],
        [3, data[5].close],
        [4, data[5].close],
        [5, data[5].close],
        [6, data[5].close],
        [7, data[5].close],
        [8, data[5].close],
        [9, data[5].close],
        [10, data[5].close],
      ]
    )

  }, data); 
  

  return (
    <div style={{ height: "100vh" }}>

      <Popup open={PopOpen} onClose={() => setPopOpen(false)}>
        <div>You scored {accuracyPop}%</div>
      </Popup>

    <HighchartsReact

      containerProps={{ style: { height: "90%" } }}

      highcharts={Highcharts}
      ref={chartRef}
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
      min: data[0].absMin-10,
      max: data[0].absMax+10,
      
    },
    series: [
      {
        name: '',
        data: dataDrag,
        lineWidth: 2,
        dragDrop: {
          draggableX: false,
          draggableY: true,
          dragMinY: data[0].absMin-10, // minimum y-value allowed for dragged points
          dragMaxY: data[0].absMax+10, // maximum y-value allowed for dragged points
          dragPrecisionY: 1, // number of decimal places for y-values
        },
        point: {
          events: {
            drag: function (e) {
            },
            drop: function (e) {
              var temp = userResponce
              temp[e.target.x] = e.target.y;
              setUserResponce(temp);
            },
          },
        },
      },
      {
        name: 'Solution',
        data: data[0].next,
        lineWidth: 2,
        visible : false,
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


      },
    },
  }}
    />
    <button onClick={handleSubmit}>submit</button>
  </div>
  );
};

export default DraggableChart;
