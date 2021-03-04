import './Knob.scss';
import React from 'react';

function Knob({x, y, value, ...props}) {

  let mouseX, mouseY, previousValue;

  const onMouseDown = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
  };

  const onMouseUp = () => {
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
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

  return (
    <div className="Knob" onMouseDown={onMouseDown} style={{left: x + 'px', top: y + 'px'}}>
      <div className="Knob-control">
        <div className="Knob-detail" style={{transform: 'rotate(' + (value * 3.6) + 'deg)'}}></div>
      </div>
      <div className="Knob-window">
        <div className="Knob-values" style={{top: ((value - 1) * -2.4) + 'rem'}}>
          {Array(100).fill().map((x, i) =>
            (<div className="Knob-value" key={i}>{i + 1}</div>)
          )}
        </div>
      </div>
    </div>
  )
}

export default Knob;
