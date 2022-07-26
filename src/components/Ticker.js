import "./Ticker.scss";
import React from "react";

// comment: implemented drag and change number feature, but it also happens when holding arrows AND moving cursor
// comment: can't figure out why setIsArrowClicked can't be changed in onmousedown and onmouseup

function Ticker({ x, y, value, ...props }) {
  let mouseX, mouseY, previousValue;
  const [isInputClicked, setIsInputClicked] = React.useState(false);
  const [isArrowClicked, setIsArrowClicked] = React.useState(false);

  const changeValue = (newValue) => {
    newValue = Math.max(1, newValue);
    newValue = Math.min(100, newValue);
    if (newValue != previousValue) {
      previousValue = newValue;
      props.onChange(newValue);
    }
  };

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

  let prevY;
  const onMouseMove = (event) => {
    if (isInputClicked === false && isArrowClicked === false) {
      if (event.clientY > prevY) {
        console.log("decrease");
        value--;
        changeValue(value);
      } else if (event.clientY < prevY) {
        console.log("increase");
        value++;
        changeValue(value);
      } else {
        console.log("same");
      }

      prevY = event.clientY;
    }
  };

  const onMouseDownPlus = () => {
    setIsInputClicked(false);
    setIsArrowClicked(true);

    let newValue = value + 1;
    changeValue(newValue);
    const timeoutId = setTimeout(timeoutIncrement, 1000);

    document.addEventListener("mouseup", () => {
      clearTimeout(timeoutId);
      setIsArrowClicked(false);
    });
  };

  const timeoutIncrement = () => {
    const incrementId = setInterval(increment, 200);

    document.addEventListener("mouseup", () => {
      clearInterval(incrementId);
    });
  };

  const increment = () => {
    if (value < 100) {
      value++;
      changeValue(value);
    }
  };

  const onMouseDownMinus = () => {
    setIsInputClicked(false);
    setIsArrowClicked(true);

    let newValue = value - 1;
    changeValue(newValue);
    const timeoutId = setTimeout(timeoutDecrement, 1000);

    document.addEventListener("mouseup", () => {
      clearTimeout(timeoutId);
      setIsArrowClicked(false);
    });
  };

  const timeoutDecrement = () => {
    const decrementId = setInterval(decrement, 200);

    document.addEventListener("mouseup", () => {
      clearInterval(decrementId);
    });
  };

  const decrement = () => {
    if (value > 1) {
      value--;
      changeValue(value);
    }
  };

  const onClick = () => {
    setIsInputClicked(true);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsInputClicked(false);
    }
    if (event.key === "Enter") {
      setIsInputClicked(false);
      let newValue = event.target.value;

      if (newValue !== "") {
        changeValue(newValue);
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
          onMouseDown={onMouseDownPlus}
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
                    type="number"
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
          onMouseDown={onMouseDownMinus}
        ></div>
      </button>
    </div>
  );
}

export default Ticker;
