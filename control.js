function createInitialState(width = 80, height = 50) {
  const initialState = new Array(width);

  for (let i = 0; i < initialState.length; i++) {
    initialState[i] = new Array(height);

    for (let j = 0; j < initialState[i].length; j++) {
      initialState[i][j] = Math.floor(Math.random() * 100) < 10 ? 0 : 1;
    }
  }

  return initialState;
}

let initialState = createInitialState(50, 50);

function getCurrentState(state) {
  let currentState = JSON.parse(JSON.stringify(initialState));
  currentState = currentState.map((item) => item.fill(0));
  return currentState;
}

function countNeighbours(posX, posY) {
  let count = 0;

  for (let k = 0; k < 2; k += 0.25) {
    const alfa = Math.PI * k;

    const deltaX = Math.round(Math.sin(alfa));
    const deltaY = -1 * Math.round(Math.cos(alfa));

    const x = posX + deltaX;
    const y = posY + deltaY;
    if (x < 0 || y < 0 || x > initialState.length - 1 || y > initialState[0].length - 1) continue;

    if (initialState[x][y] === 1) count++;
  }

  return count;
}

function setCellState(posX, posY) {
  const initCellState = initialState[posX][posY];
  const cellState = countNeighbours(posX, posY);
  if (initCellState === 1) {
    if (cellState <= 1) {
      return 0;
    } else if (cellState <= 3) {
      return 1;
    } else if (cellState >= 4) {
      return 0;
    }
  }

  if (initCellState === 0 && cellState <= 3 && cellState > 1) {
    return 1;
  } else {
    return 0;
  }
}

function setNewState() {
  const currentState = getCurrentState(initialState);
  for (let i = 0; i < initialState.length; i++) {
    for (let j = 0; j < initialState[i].length; j++) {
      currentState[i][j] = setCellState(i, j);
    }
  }

  initialState = currentState;
  return initialState;
}

export { initialState, setNewState };
