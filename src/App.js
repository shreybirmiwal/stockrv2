import './App.css';
import DisplayStockData from './DisplayStockData';
import DraggableChart from './DraggableChart';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', height: '100%' }}>
        <DisplayStockData/>
      </div>
      <div style={{ width: '50%', height: '100%', position: 'relative' }}>
        <DraggableChart/>
      </div>
    </div>
  );
}

export default App;
