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

const DraggableChart = ({data, setData, userResponce, setUserResponce}) => {
  const chartRef = useRef(null);
  const [PopOpen, setPopOpen] = useState(false);
  const [accuracyPop, SetAccuracyPop] = useState(0);
  
  const handleSubmit = () => {
    console.log(userResponce);
    console.log(data[0].next);

    const chart = chartRef.current.chart;
    chart.series[1].setVisible(true);

    setTimeout(() => {

      var accuracy = determineAcuracy();
      console.log(accuracy)
      SetAccuracyPop(accuracy.toFixed(2))
      setPopOpen(true)

      resetVals()
      
    }, 2500); // Delay of 1 second

  }

  const resetVals = () => {
    setUserResponce([
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
    ])
    
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
    var weightedDiff = 100 - ((averageDifference*110) / (data[0].absMax-data[0].absMin));
    if(weightedDiff < 0) weightedDiff = 0;

    if(weightedDiff !== weightedDiff){
      console.log("BROKEN!")
      //if its nAn
      return 0;
    }

    return weightedDiff;

  }

  const [dataDrag, setDataDrag] = useState([  ]);

  useEffect(() => {
    setDataDrag(
      [
        [0, data[0].next[0]],
        [1, data[0].next[0]],
        [2, data[0].next[0]],
        [3, data[0].next[0]],
        [4, data[0].next[0]],
        [5, data[0].next[0]],
        [6, data[0].next[0]],
        [7, data[0].next[0]],
        [8, data[0].next[0]],
        [9, data[0].next[0]],
      ]
    )

    setUserResponce([
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
      data[0].next[0],
    ])

  }, data); 
  

  return (
    <div style={{ height: "100vh" }}>

      <Popup open={PopOpen} onClose={() => setPopOpen(false)}>
        <div className='bg-blue-200 w-96 h-60 rounded-md '>
          <p className='font-bold flex-row flex justify-center align-middle pt-10'>
            You scored {accuracyPop}%
          </p>
        </div>
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