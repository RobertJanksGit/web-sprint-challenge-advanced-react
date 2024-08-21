import React, { useState, useEffect } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialXY = { x: 2, y: 2 };
const initialGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function AppFunctional(props) {
  const [grid, setGrid] = useState(initialGrid);
  const [steps, setSteps] = useState(initialSteps);
  const [activeIndex, setActiveIndex] = useState(4);
  const [formData, setFormData] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);
  const [xY, setXY] = useState(initialXY);
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY(index) {
    if (index < 3) return `(${index + 1}, 1)`;
    if (index > 5) return `(${index - 5}, 3)`;
    else return `(${index - 2}, 2)`;
  }

  function trackXY(index) {
    console.log(index);
    if (index < 3) {
      setXY({ x: index + 1, y: 1 });
    }
    if (index > 5) {
      setXY({ x: index - 5, y: 3 });
    }
    if (index > 2 && index < 6) {
      setXY({ x: index - 2, y: 2 });
    }
  }

  function reset(evt) {
    evt.preventDefault();
    setActiveIndex(4);
    setGrid(initialGrid);
    setSteps(initialSteps);
    setFormData(initialEmail);
    setMessage(initialMessage);
    setXY(initialXY);
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction, idx) {
    let currentIdx = idx;
    setMessage(initialMessage);

    if (direction === "up") {
      if (idx > 2) currentIdx -= 3;
      else setMessage("You can't go up");
    } else if (direction === "down") {
      if (idx < 6) currentIdx += 3;
      else setMessage("You can't go down");
    } else if (direction === "left") {
      if (idx % 3 !== 0) currentIdx -= 1;
      else setMessage("You can't go left");
    } else if (direction === "right") {
      if (idx % 3 !== 2) currentIdx += 1;
      else setMessage("You can't go right");
    }

    return currentIdx;
  }

  // useEffect(() => {}, [grid]);

  function move(evt) {
    evt.preventDefault();

    const direction = evt.target.id;
    const idx = activeIndex;
    const nextIdx = getNextIndex(direction, idx);
    setActiveIndex(nextIdx);
    trackXY(nextIdx);

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
    // You will need this to update the value of the input.
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setFormData(initialEmail);
    try {
      const { data } = await axios.post("http://localhost:9000/api/result", {
        x: xY.x,
        y: xY.y,
        steps: steps,
        email: formData,
      });
      console.log({
        x: xY.x,
        y: xY.y,
        steps: steps,
        email: formData,
      });
      setMessage(data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
    // Use a POST request to send a payload to the server.
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY(activeIndex)}</h3>
        <h3 id="steps">
          You moved {steps} {steps === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id="grid">
        {grid.map((item) => (
          <div
            key={item}
            className={`square${item === activeIndex ? " active" : ""}`}
          >
            {item === activeIndex ? "B" : null}
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
        <input data-testid="submit" id="submit" type="submit"></input>
      </form>
    </div>
  );
}
