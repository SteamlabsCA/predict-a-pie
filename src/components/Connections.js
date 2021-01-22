import './Connections.scss';
import React from 'react';

function Connections({connections, mouseX, mouseY}) {

  const [time, setTime] = React.useState();
  const requestRef = React.useRef();

  const animate = (time) => {
    setTime(time);
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const outputX = (neuron) => {
    const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
    return rect.left + rect.width - 11;
  }

  const outputY = (neuron) => {
    const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
    return rect.top + rect.height / 2;
  };

  const inputX = (neuron, weight) => {
    if (neuron) {
      const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
      return rect.left + 11;
    } else {
      return mouseX;
    }
  }

  const inputY = (neuron, weight) => {
    if (neuron) {
      const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
      return weight > 0 ? rect.top + 15 : rect.top + rect.height - 14;
    } else {
      return mouseY;
    }
  }

  return (
    <svg className="Connections">
      {connections.map((connection, index) => (
        <line
          key={index}
          x1={outputX(connection.from)}
          y1={outputY(connection.from)}
          x2={inputX(connection.to, connection.weight)}
          y2={inputY(connection.to, connection.weight)}
          className="Connections-line" />
      ))}
    </svg>
  )
}

export default Connections;
