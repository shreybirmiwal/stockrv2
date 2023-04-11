import './App.css';
import DisplayStockData from './DisplayStockData';
import DraggableChart from './DraggableChart';
import { useState } from 'react';
import DummyData from "./DummyData.js";
import { useRef } from 'react';
import React from 'react';

function App() {

  const [data, setData] = useState(DummyData[0]);
  const [oldIndex, setOldIndex] = useState(0);
  const [meridian, setMeridian] = useState(0);

  const [userResponce, setUserResponce] = useState([ DummyData[0][0].next[0],
    DummyData[0][0].next[0],
    DummyData[0][0].next[0],
    DummyData[0][0].next[0],
    DummyData[0][0].next[0],
    DummyData[0][0].next[0],
    DummyData[0][0].next[0],
    DummyData[0][0].next[0],
    DummyData[0][0].next[0],
    DummyData[0][0].next[0],])

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', height: '100%' }}>
        <DisplayStockData oldIndex = {oldIndex} setOldIndex={setOldIndex} setUserResponce={setUserResponce} data={data} setData={setData} userResponce={userResponce}  />
      </div>
      <div style={{ width: '50%', height: '100%', position: 'relative' }}>
        <DraggableChart meridian = {meridian} setMeridian={setMeridian} oldIndex = {oldIndex} setOldIndex={setOldIndex} data={data}setUserResponce={setUserResponce} setData={setData} userResponce={userResponce} />
      </div>
    </div>
  );
}

export default App;