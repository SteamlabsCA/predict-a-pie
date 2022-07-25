import "./Ticker.scss";
import React from "react";

function Ticker({ x, y, value, ...props }) {
  let mouseX, mouseY, previousValue;
  const [isInputClicked, setIsInputClicked] = React.useState(false);
  const [isArrowClicked, setIsArrowClicked] = React.useState(false);

  const upArrow = React.useRef();
  const downArrow = React.useRef();

  const changeValue = (newValue) => {
    newValue = Math.max(1, newValue);
    newValue = Math.min(100, newValue);
    if (newValue != previousValue) {
      previousValue = newValue;
      props.onChange(newValue);
    }
  };

  const onMouseDown = (event) => {
    console.log("called");
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
      changeValue(newValue);
    }
  };

  const onClickPlus = () => {
    setIsInputClicked(false);
    let newValue = value + 1;
    changeValue(newValue);
  };

  // const onClickMinus = () => {
  //   setIsInputClicked(false);
  //   let newValue = value - 1;
  //   changeValue(newValue);
  // };

  const onMouseDownMinus = () => {
    setIsInputClicked(false);
    let newValue = value - 1;
    changeValue(newValue);
    const timeoutId = setTimeout(timeout, 1000);

    document.addEventListener("mouseup", () => {
      clearTimeout(timeoutId);
    });
  };

  const timeout = () => {
    const decrementId = setInterval(decrement, 200);

    document.addEventListener("mouseup", () => {
      clearInterval(decrementId);
    });
  };

  const decrement = () => {
    if (value > 1) {
      value--;
      changeValue(value);
      console.log("interval");
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
      <button className="Ticker-button" ref={upArrow}>
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
      <button className="Ticker-button" ref={downArrow}>
        <div
          className="Ticker-triangle Ticker-triangle-down"
          onMouseDown={onMouseDownMinus}
        ></div>
      </button>
    </div>
  );
}

export default Ticker;
