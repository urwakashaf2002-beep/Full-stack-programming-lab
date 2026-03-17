import { useState } from "react";
import "./App.css";

function Counter() {
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState("");

  const increment = () => {
    setCount(count + 1);
    setWarning(""); // clear warning when incrementing
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setWarning(""); // clear warning when valid
    } else {
      setWarning("⚠️ Count cannot go below 0!");
    }
  };

  const reset = () => {
    setCount(0);
    setWarning(""); // clear warning on reset
  };

  return (
    <div className="counter-container">
      <h1>Smart Counter</h1>
      <div className="counter-card">
        <p className="count-display">{count}</p>
        {warning && <p className="warning">{warning}</p>}
        <div className="buttons">
          <button className="btn increment" onClick={increment}>Increment</button>
          <button className="btn decrement" onClick={decrement}>Decrement</button>
          <button className="btn reset" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Counter;