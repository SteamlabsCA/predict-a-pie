import './Weights.scss';
import positive from '../assets/positive.svg';
import negative from '../assets/negative.svg';
import Knob from './Knob';
import React from 'react';

function Weights({connections, ...props}) {

  const [preventClose, setPreventClose] = React.useState(false);

  const outputX = (neuron) => {
    const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
    return rect.left + rect.width - 11;
  };

  const outputY = (neuron) => {
    const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
    return rect.top + rect.height / 2;
  };

  const inputX = (neuron, positive) => {
    if (neuron) {
      const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
      return rect.left + 11;
    } else {
      return mouseX;
    }
  };

  const inputY = (neuron, positive) => {
    if (neuron) {
      const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
      return positive ? rect.top + 15 : rect.top + rect.height - 14;
    } else {
      return mouseY;
    }
  };

  const onStartChange = () => {
    setPreventClose(true);
  };

  const onComplete = () => {
    console.log(preventClose);
    if (preventClose) {
      setPreventClose(false);
    } else {
      props.onComplete();
    }
  }

  const editing = connections.filter(connection => connection.editing);

  return editing.length > 0 && (
    <div className="Weights" onClick={onComplete}>
      <svg>
        {editing.map((connection, index) => (
          <g key={index}>
            <line
              x1={outputX(connection.from)}
              y1={outputY(connection.from)}
              x2={inputX(connection.to, connection.positive)}
              y2={inputY(connection.to, connection.positive)}
              className="Connections-line Connections-editing"
            />
          </g>
        ))}
      </svg>
      {editing.map((connection, index) => connection.editing && (
        <Knob
          key={index}
          x={outputX(connection.from) + 11}
          y={outputY(connection.from)}
          value={connection.weight}
          onStartChange={onStartChange}
          onChange={(value) => props.onChange(connection, value)}
        />
      ))}
      <div
        className="Neuron-terminal"
        style={{
          left: inputX(editing[0].to, editing[0].positive) + 'px',
          top: inputY(editing[0].to, editing[0].positive) + 'px'
        }}
      >
        {editing[0].positive && (
          <img src={positive} alt="Positive terminal" />
        )}
        {!editing[0].positive && (
          <img src={negative} alt="Negative terminal" />
        )}
      </div>
    </div>
  );
}

export default Weights;
