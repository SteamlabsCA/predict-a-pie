import './Connections.scss';
import scissors from '../assets/scissors.svg';
import React from 'react';

function Connections({connections, mouseX, mouseY, ...props}) {

  const [time, setTime] = React.useState();
  const requestRef = React.useRef();

  const [hover, setHover] = React.useState(false);
  const [cursorStyle, setCursorStyle] = React.useState();

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

  const onMouseMove = (event) => {
    setCursorStyle({
      'display': 'block',
      'left': event.clientX + 'px',
      'top': event.clientY + 'px'
    });
  }

  const onMouseOut = (event) => {
    setCursorStyle({
      'display': 'none'
    });
  }

  const onDeleteConnection = (connection) => {
    setCursorStyle({
      'display': 'none'
    });
    props.onDeleteConnection(connection);
  }

  return (
    <div className="Connections">
      <svg>
        {connections.map((connection, index) => (
          <line
            key={index}
            x1={outputX(connection.from)}
            y1={outputY(connection.from)}
            x2={inputX(connection.to, connection.weight)}
            y2={inputY(connection.to, connection.weight)}
            className={connection.from.active ? 'Connections-line Connections-active' : 'Connections-line'}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseOut}
            onMouseDown={(event) => {onDeleteConnection(connection)}}
          />
        ))}
      </svg>
      <img className="Connections-cut" style={cursorStyle} src={scissors} alt="Scissors" />
    </div>
  )
}

export default Connections;
