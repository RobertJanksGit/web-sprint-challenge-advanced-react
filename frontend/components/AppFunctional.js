import React, { useState, useEffect } from "react";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initialGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function AppFunctional(props) {
  const [grid, setGrid] = useState(initialGrid);
  const [steps, setSteps] = useState(initialSteps);
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getIndex(array) {
    return array.indexOf(4);
  }

  function getXY() {}

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset(evt) {
    evt.preventDefault();
    setGrid(initialGrid);
    setSteps(initialSteps);
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction, idx) {
    let currentIdx = idx;
    if (direction === "up" && idx > 2) currentIdx -= 3;
    if (direction === "down" && idx < 6) currentIdx += 3;
    if (direction === "left" && idx !== 0 && idx !== 3 && idx !== 6)
      currentIdx -= 1;
    if (direction === "right" && idx !== 2 && idx !== 5 && idx !== 8)
      currentIdx += 1;

    return currentIdx;
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  useEffect(() => {}, [grid]);

  function move(evt) {
    evt.preventDefault();

    const direction = evt.target.id;
    const idx = getIndex(grid);
    const nextIdx = getNextIndex(direction, idx);

    if (idx !== nextIdx) {
      const newGrid = [...grid];

      newGrid.splice(idx, 1);
      newGrid.splice(nextIdx, 0, 4);
      setGrid(newGrid);
      setSteps(steps + 1);
      console.log(steps);
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {grid.map((idx) => (
          <div key={idx} className={`square${idx === 4 ? " active" : ""}`}>
            {idx === 4 ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left">
          LEFT
        </button>
        <button onClick={move} id="up">
          UP
        </button>
        <button onClick={move} id="right">
          RIGHT
        </button>
        <button onClick={move} id="down">
          DOWN
        </button>
        <button onClick={reset} id="reset">
          reset
        </button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
