import React, { useState, useEffect } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initialGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function AppFunctional(props) {
  const [grid, setGrid] = useState(initialGrid);
  const [steps, setSteps] = useState(initialSteps);
  const [formData, setFormData] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getIndex(array) {
    return array.indexOf(4);
  }

  function getXY(index) {
    if (index < 3) return `(${index + 1}, 1)`;
    if (index > 5) return `(${index - 5}, 3)`;
    else return `(${index - 2}, 2)`;
  }

  function trackXY() {}

  function reset(evt) {
    evt.preventDefault();
    setGrid(initialGrid);
    setSteps(initialSteps);
    setFormData(initialEmail);
    setMessage(initialMessage);
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction, idx) {
    let currentIdx = idx;
    setMessage(initialMessage);
    if (direction === "up" && idx > 2) currentIdx -= 3;
    else if (direction === "up" && idx < 3) setMessage("You can't go up");

    if (direction === "down" && idx < 6) currentIdx += 3;
    else if (direction === "down" && idx > 5) setMessage("You can't go down");
    if (direction === "left" && idx !== 0 && idx !== 3 && idx !== 6)
      currentIdx -= 1;
    else if (direction === "left" && idx < 3) setMessage("You can't go left");
    if (direction === "right" && idx !== 2 && idx !== 5 && idx !== 8)
      currentIdx += 1;
    else if (direction === "right" && idx < 3) setMessage("You can't go right");

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
    }
  }

  function onChange(evt) {
    setFormData(evt.target.value);
    console.log(evt);
    // You will need this to update the value of the input.
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    if (!formData) setMessage("Ouch: email is required");
    else if (!formData.includes(".com"))
      setMessage("Ouch: email must be a valid email");
    setFormData(initialEmail);
    try {
      const { data } = await axios.post("http://localhost:9000/api/result", {
        x: 1,
        y: 2,
        steps: 4,
        email: "name@email.com",
      });
      setMessage(data.message);
    } catch (err) {
      console.error(err);
    }
    // Use a POST request to send a payload to the server.
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY(getIndex(grid))}</h3>
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
        <h3 id="message">{message}</h3>
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
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={formData}
          id="email"
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
