import React, { useState } from 'react';
import Main from './components/Main.jsx';
import SideBar from './components/SideBar.jsx';

function App() {
  const [size, setSize] = useState(3);
  const [numberОfMoves, setNumberОfMoves] = useState(10);

  return (
    <div className="app">
      <Main size={size} numberОfMoves={numberОfMoves} />
      <SideBar size={size} setSize={setSize} numberОfMoves={numberОfMoves} setNumberОfMoves={setNumberОfMoves} />
    </div>
  );
}

export default App;
