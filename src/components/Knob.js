import './Knob.scss';
import React from 'react';

function Knob({value, min, max, ...props}) {

  let mouseX, mouseY;

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
    let newValue = parseInt(value) + Math.round(delta / 4);
    newValue = Math.max(min, newValue);
    newValue = Math.min(max, newValue);
    props.onChange(newValue);
  };

  return (
    <div className="Knob" onMouseDown={onMouseDown}>
      <div className="Knob-control"></div>
      <div className="Knob-value">{value}</div>
    </div>
  )
}

export default Knob;
