import { random, sample } from 'lodash';

export function getStartCellId(size) {
  return random(size ** 2 - 1);
}

export function getPossibleMovesForCell(size) {
  const moveGrid = {};
  for (let i = 0; i < size ** 2; i++) {
    const isStartOfRow = i % size === 0;
    const isFirstRow = i < size - 1;
    const isLastRow = i >= size ** 2 - size && i !== size ** 2 - 1;
    if (isStartOfRow) {
      if (i === 0) {
        // first row, first and last cells
        moveGrid[i] = ['r', 'd'];
        moveGrid[i + size - 1] = ['l', 'd'];
      } else if (i === size ** 2 - size) {
        // last row, first and last cells
        moveGrid[i] = ['r', 'u'];
        moveGrid[i + size - 1] = ['l', 'u'];
      } else {
        // middle rows, first and last cells
        moveGrid[i] = ['r', 'u', 'd'];
        moveGrid[i + size - 1] = ['l', 'u', 'd'];
      }
    } else if (isFirstRow) {
      // first row, cells without first and last cells
      moveGrid[i] = ['r', 'l', 'd'];
    } else if (isLastRow) {
      // last row, cells without first and last cells
      moveGrid[i] = ['r', 'l', 'u'];
    } else if (!moveGrid[i]) {
      // inner cells
      moveGrid[i] = ['r', 'l', 'u', 'd'];
    }
  }
  return moveGrid;
}

export function getMoves(size, numberОfMoves, startCellId, possibleMovesForCell) {
  const road = [];
  let currentCellId = startCellId;
  for (let i = 0; i < numberОfMoves; i++) {
    const nextMoveCellId = sample(possibleMovesForCell[currentCellId]);
    road.push(nextMoveCellId);
    currentCellId = getNextCell(currentCellId, nextMoveCellId, size);
  }
  return [road, currentCellId];
}

function getNextCell(currentCell, comm, size) {
  if (comm === 'u') {
    return currentCell - size;
  }
  if (comm === 'd') {
    return currentCell + size;
  }
  if (comm === 'r') {
    return currentCell + 1;
  }
  return currentCell - 1;
}
