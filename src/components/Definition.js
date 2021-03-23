import './Definition.scss';
import React from 'react';

function Definition({text, children}) {

  const [style, setStyle] = React.useState({});

  const onMouseMove = (event) => {
    setStyle({
      left: event.clientX + 'px',
      top: event.clientY + 'px'
    })
  };

  return (
    <span className="Definition" onMouseMove={onMouseMove}>
      { children }
      <span className="Definition-tooltip" style={style}>
        { text }
      </span>
    </span>
  );
}

export default Definition;
