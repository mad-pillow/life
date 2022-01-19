import { initialState, setNewState } from "./control.js";

function renderTerritory(state = initialState) {
  const parent = document.querySelector("#territory");
  parent.innerHTML = "";

  for (let i = 0; i < initialState.length; i++) {
    const rowBlock = document.createElement("ul");
    rowBlock.className = "territory__row";

    for (let j = 0; j < initialState[i].length; j++) {
      const cell = document.createElement("li");
      cell.className = "territory__cell";
      cell.setAttribute("alive", state[i][j]);
      rowBlock.append(cell);
    }

    parent.append(rowBlock);
  }
}

/* document.documentElement.addEventListener("click", () => {
  renderTerritory(setNewState());
}); */

setInterval(() => {
  renderTerritory(setNewState());
}, 500);
