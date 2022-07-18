import React,  { useState, useEffect } from 'react'
import { getStartCellId, getPossibleMovesForCell, getMoves } from '../utils';

import Left from '../img/Left.svg';
import Right from '../img/Right.svg';
import Down from '../img/Down.svg';
import Up from '../img/Up.svg';
import Flag from '../img/Flag.svg';

const btns = {
  l: Left,
  r: Right,
  d: Down,
  u: Up,
};

function Main({size, numberОfMoves }) {
  const [startCellId, setStartCellId] = useState(null);
  const [moves, setMoves] = useState([]);
  const [answerCellId, setAnswerCellId] = useState(null);
  const [selectedСellId, setSelectedCellId] = useState(null);

  function newGame() {
    const possibleMovesForCell = getPossibleMovesForCell(size);
    const vstartCellId = getStartCellId(size);
    const [vmoves, vcorrectAnswer] = getMoves(size, numberОfMoves, vstartCellId, possibleMovesForCell);
    setStartCellId(vstartCellId);
    setMoves(vmoves);
    setAnswerCellId(vcorrectAnswer);
    setSelectedCellId(null)
  }

  useEffect(() => {
    newGame()
  }, [size, numberОfMoves])

  return (
    <div className="main">
    <div className="board">
      {Array(size ** 2)
        .fill()
        .map((e, i) => i)
        .map((cellId) => {
          const classes = ['cell', 'board__cell'];
          const isSellectedCell = selectedСellId !== null;
          const isCorrectCell = isSellectedCell && cellId === answerCellId
          const isAnswerCell = isSellectedCell && selectedСellId === cellId

          if (isCorrectCell) {
            classes.push("cell_final")
          }
          if (isAnswerCell) {
            classes.push(selectedСellId === answerCellId ? 'cell_success' : 'cell_fail');
          }
          return (
            <button
              disabled={isSellectedCell}
              key={cellId}
              id={cellId}
              className={classes.join(' ')}
              onClick={() => setSelectedCellId(cellId)}
            >
              {cellId === startCellId ? <img src={Flag} alt="start" /> : ''}
            </button>
          );
        })}
    </div>

    <div className="moves">
      {moves.map((move, i) => (
        <div key={i} className="cell">
          <img src={btns[move]} alt={`arraw ${move}`} />
        </div>
      ))}
    </div>
    {selectedСellId && <button className="btn" onClick={newGame}>Далее {'->'}</button>}
  </div>
  )
}

export default Main