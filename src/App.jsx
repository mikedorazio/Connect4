import { useState } from 'react';
import Board from './Board';
import DropZone from './DropZone';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app-container">
        <DropZone />
        <Board />
      </div>
    </>
  )
}

export default App