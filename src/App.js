import './App.css';
import DisplayStockData from './DisplayStockData';
import DraggableChart from './DraggableChart';
import { useState } from 'react';
import DummyData from "./DummyData.js";

function App() {

  const [data, setData] = useState(DummyData[0]);


  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', height: '100%' }}>
        <DisplayStockData data={data} setData={setData}/>
      </div>
      <div style={{ width: '50%', height: '100%', position: 'relative' }}>
        <DraggableChart data={data} setData={setData}/>
      </div>
    </div>
  );
}

export default App;
