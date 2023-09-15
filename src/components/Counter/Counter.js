import React, { useState } from "react";

function Counter() {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Count!</button>
    </>
  );
}

export default Counter;

// Can be written this way:
// const counterState = useState(0);
// const counter = counterState[0];
// const setCounter = counterState[1];
