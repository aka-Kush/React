import React, { useState } from 'react';
import Board from './components/Board';
import "./styles/root.scss";

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setXNext] = useState(false);

  const handleSquareClick = (position) => {

      if (board[position]) { return;}

      setBoard((prevState) => {
          return prevState.map((square, pos) => {
              if (pos === position) {
                  return isXNext ? 'X' : 'O';  
              }
              return square;
          });
      });

      setXNext ( (prevState) => !prevState)
  }

  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <Board board={board} handleSquareClick={handleSquareClick}/>
    </div>
  );
}

export default App;
