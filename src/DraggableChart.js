import React, { useState, useEffect, useRef } from 'react';
import Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import draggable from "highcharts/modules/draggable-points";
import Popup from 'reactjs-popup';
import HighchartsReact from "highcharts-react-official";
import DummyData from './DummyData';

if (typeof Highcharts === "object") {
  more(Highcharts);
  draggable(Highcharts);
}

const DraggableChart = ({data, setUserResponce, userResponce, setData, oldIndex, setOldIndex, meridian, setMeridian}) => {
  const chartRef = useRef(null);
  const [PopOpen, setPopOpen] = useState(false);
  const [accuracyPop, SetAccuracyPop] = useState(0);
  const [values, setValues] = useState([data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0]])


  const handleSubmit = () => {
    console.log(userResponce.current);
    //console.log(data[0].next);

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
    //console.log(data[0].next[0]);
    
    setUserResponce( {
      current : 
      [
        DummyData[oldIndex][0].next[0],
        DummyData[oldIndex][0].next[0],
        DummyData[oldIndex][0].next[0],
        DummyData[oldIndex][0].next[0],
        DummyData[oldIndex][0].next[0],
        DummyData[oldIndex][0].next[0],
        DummyData[oldIndex][0].next[0],
        DummyData[oldIndex][0].next[0],
        DummyData[oldIndex][0].next[0],
        DummyData[oldIndex][0].next[0],
      ]
    }
    )
    //setValues([data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0]])

    setValues([DummyData[oldIndex][0].next[0],DummyData[oldIndex][0].next[0],DummyData[oldIndex][0].next[0],DummyData[oldIndex][0].next[0],DummyData[oldIndex][0].next[0],DummyData[oldIndex][0].next[0],DummyData[oldIndex][0].next[0],DummyData[oldIndex][0].next[0],DummyData[oldIndex][0].next[0],DummyData[oldIndex][0].next[0]])
    //console.log("WE ARE RESETING DATA! " + userResponce.current)

  }

  useEffect(() => {
    resetVals()
    setMeridian(data[0].next[0])
    //console.log("data updated! " + userResponce.current)

  }, [data]);

  const handleNewPuzzle = () => {
    resetVals()

    var randomIndex = 0;
    while(randomIndex == oldIndex){
      randomIndex = Math.floor(Math.random() * DummyData.length);
    }

      setOldIndex(randomIndex)
      setData(DummyData[randomIndex]);
      
      setUserResponce( {
        current : 
        [
          DummyData[randomIndex][0].next[0],
          DummyData[randomIndex][0].next[0],
          DummyData[randomIndex][0].next[0],
          DummyData[randomIndex][0].next[0],
          DummyData[randomIndex][0].next[0],
          DummyData[randomIndex][0].next[0],
          DummyData[randomIndex][0].next[0],
          DummyData[randomIndex][0].next[0],
          DummyData[randomIndex][0].next[0],
          DummyData[randomIndex][0].next[0],
        ]
      })

      setValues([data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0],data[0].next[0]])

    
    setPopOpen(false); // Close the popup

  }

  const determineAcuracy = () => {
    //should be data[0].next
    //is userResponce


    const numItems = userResponce.current.length;
    let totalDifference = 0;
    
    for (let i = 0; i < numItems; i++) {
      
      if(userResponce.current[i] == meridian) userResponce.current[i] = data[0].next[0];

      const difference = Math.abs(data[0].next[i] - userResponce.current[i]) * 1;
      totalDifference += (difference.toFixed(2)*1);
      //console.log("total " +totalDifference)
    }

    setMeridian(data[0].next[0]);
    
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
  

  return (
    <div style={{ height: "100vh" }}>

      <Popup open={PopOpen} onClose={() => setPopOpen(false)} closeOnDocumentClick={false}>
        <div className='bg-blue-200 w-96 h-60 rounded-md'>
          <p className='font-bold flex-row flex justify-center align-middle pt-10'>
            You scored {accuracyPop}%
          </p>
          <button className='block mx-auto mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={handleNewPuzzle}>
            New Puzzle
          </button>
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
        data: values,
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
              temp.current[e.target.x] = e.target.y;
              setUserResponce(temp);

              //temp[e.target.x] = e.target.y;
              //console.log(e.target.y)
              //console.log("TEMP " + temp)
              //userResponce = temp;
              //SetdisplayedDrag(temp);
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