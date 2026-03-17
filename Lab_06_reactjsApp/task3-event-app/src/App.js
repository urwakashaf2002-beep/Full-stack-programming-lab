import { useState } from "react";
import "./App.css";

function InteractiveButtons() {
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");

  const colors = ["#f5f7fa", "#ffe0ac", "#a8dadc", "#ff6f61", "#83c5be", "#ffd6e3"];

  const showMessage = () => {
    setMessage("🎉 Welcome to FSP Lab!");
  };

  const changeBackground = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  const showAlert = () => {
    alert("⚡ This is an alert triggered by the button!");
  };

  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <div className="card">
        <h1 className="title">✨ Interactive Buttons ✨</h1>
        <div className="buttons">
          <button className="btn diamond" onClick={showMessage}>Show Message</button>
          <button className="btn diamond" onClick={changeBackground}>Change Background</button>
          <button className="btn diamond" onClick={showAlert}>Show Alert</button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default InteractiveButtons;