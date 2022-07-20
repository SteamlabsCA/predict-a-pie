import "./Ticker.scss";
import React from "react";

function Ticker({ x, y, value, ...props }) {
  let mouseX, mouseY, previousValue;

  const onMouseDown = (event) => {
    props.onStartChange();
    mouseX = event.clientX;
    mouseY = event.clientY;
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
  };

  const onMouseUp = (event) => {
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (event) => {
    const deltaX = event.clientX - mouseX;
    const deltaY = -event.clientY + mouseY;
    const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
    let newValue = parseInt(value) + Math.round(delta / 3);
    newValue = Math.max(1, newValue);
    newValue = Math.min(100, newValue);
    if (newValue != previousValue) {
      previousValue = newValue;
      props.onChange(newValue);
    }
  };

  const onClickPlus = () => {
    let newValue = value + 1;
    newValue = Math.max(1, newValue);
    newValue = Math.min(100, newValue);
    if (newValue != previousValue) {
      previousValue = newValue;
      props.onChange(newValue);
    }
  };

  const onClickMinus = () => {
    let newValue = value - 1;
    newValue = Math.max(1, newValue);
    newValue = Math.min(100, newValue);
    if (newValue != previousValue) {
      previousValue = newValue;
      props.onChange(newValue);
    }
  };

  return (
    <div
      className="Ticker"
      onMouseDown={onMouseDown}
      style={{ left: x + -15 + "px", top: y + "px" }}
    >
      {/* <div className="Ticker-control">
        <div className="Ticker-detail" style={{transform: 'rotate(' + (value * 3.6) + 'deg)'}}></div>
      </div> */}
      <button className="Ticker-button">
        <div
          className="Ticker-triangle Ticker-triangle-up"
          onClick={onClickPlus}
        ></div>
      </button>
      <div className="Ticker-window">
        <div
          className="Ticker-values"
          style={{ top: (value - 1) * -2.4 + "rem" }}
        >
          {Array(100)
            .fill()
            .map((x, i) => (
              <div className="Ticker-value" key={i}>
                {i + 1}
              </div>
            ))}
        </div>
      </div>
      <button className="Ticker-button">
        <div
          className="Ticker-triangle Ticker-triangle-down"
          onClick={onClickMinus}
        ></div>
      </button>
    </div>
  );
}

export default Ticker;
