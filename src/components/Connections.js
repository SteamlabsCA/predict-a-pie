import './Connections.scss';
import React from 'react';

function Connections({connections, mouseX, mouseY}) {

  return (
    <svg className="Connections">
      {connections.map((connection, index) => (
        <line key={index} x1={connection.x1} y1={connection.y1} x2={mouseX} y2={mouseY} className="Connections-line" />
      ))}
    </svg>
  )
}

export default Connections;
