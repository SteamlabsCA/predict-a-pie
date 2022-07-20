import "./Ticker.scss";
import React from "react";

function Ticker({ x, y, value, ...props }) {
  let mouseX, mouseY, previousValue;
  const [isInputClicked, setIsInputClicked] = React.useState(false);

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
    if (isInputClicked === false) {
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
    }
  };

  const onClickPlus = () => {
    setIsInputClicked(false);
    let newValue = value + 1;
    newValue = Math.max(1, newValue);
    newValue = Math.min(100, newValue);
    if (newValue != previousValue) {
      previousValue = newValue;
      props.onChange(newValue);
    }
  };

  const onClickMinus = () => {
    setIsInputClicked(false);
    let newValue = value - 1;
    newValue = Math.max(1, newValue);
    newValue = Math.min(100, newValue);
    if (newValue != previousValue) {
      previousValue = newValue;
      props.onChange(newValue);
    }
  };

  const onClick = (event) => {
    setIsInputClicked(true);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsInputClicked(false);
    }
    if (event.key === "Enter") {
      setIsInputClicked(false);
      let newValue = event.target.value;
      newValue = Math.max(1, newValue);
      newValue = Math.min(100, newValue);
      if (newValue != previousValue) {
        previousValue = newValue;
        props.onChange(newValue);
      }
    }
  };

  return (
    <div
      className="Ticker"
      onMouseDown={onMouseDown}
      style={{ left: x + -15 + "px", top: y + "px" }}
    >
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
              <div className="Ticker-value" key={i} onClick={onClick}>
                {isInputClicked ? (
                  <input
                    className="Ticker-value Ticker-input"
                    defaultValue={i + 1}
                    onKeyDown={onKeyDown}
                    autoFocus={value === i + 1 ? true : false}
                  />
                ) : (
                  `${i + 1}`
                )}
              </div>
            ))}
        </div>
      </div>
      <button className="Ticker-button">
        <div
          className="Ticker-triangle Ticker-triangle-down"
          onClick={onClickMinus}
          // onMouseDown={onMouseDownMinus}
          // onMouseUp={onMouseUpMinus}
          // onMouseLeave={onMouseUpMinus}
        ></div>
      </button>
    </div>
  );
}

export default Ticker;
