import './TensorFlowConnections.scss';
import React from 'react';

function TensorFlowConnections({inputs, layers, outputs}) {

  const [lines, setLines] = React.useState([]);
  const svg = React.useRef();

  const neuronX = (neuron) => {
    if (neuron.ref.current) {
      const offset = document.querySelector('.TensorFlowConnections').offsetLeft;
      return neuron.ref.current.offsetLeft + neuron.ref.current.offsetWidth / 2 - offset;
    }
  }

  const neuronY = (neuron) => {
    if (neuron.ref.current) {
      return neuron.ref.current.offsetTop + neuron.ref.current.offsetHeight / 2;
    }
  };

  React.useEffect(() => {

    lines.splice(0, lines.length);

    // Connect inputs to hidden layers
    if (layers.length) {
      for (let i = 0; i < inputs.length; i++) {
        for (let j = 0; j < layers[0].length; j++) {
          lines.push({
            x1: 0,
            y1: neuronY(inputs[i]),
            x2: neuronX(layers[0][j]),
            y2: neuronY(layers[0][j]),
            active: inputs[i].active
          });
        }
      }
    }

    // Connect hidden layers
    for (let i = 0; i < layers.length - 1; i++) {
      for (let j = 0; j < layers[i].length; j++) {
        for (let k = 0; k < layers[i + 1].length; k++) {
          lines.push({
            x1: neuronX(layers[i][j]),
            y1: neuronY(layers[i][j]),
            x2: neuronX(layers[i + 1][k]),
            y2: neuronY(layers[i + 1][k]),
            active: layers[i][j].output > 0.2
          });
        }
      }
    }

    // Connect output layers
    if (layers.length) {
      for (let i = 0; i < layers[layers.length - 1].length; i++) {
        for (let j = 0; j < outputs.length; j++) {
          lines.push({
            x1: neuronX(layers[layers.length - 1][i]),
            y1: neuronY(layers[layers.length - 1][i]),
            x2: document.querySelector('.TensorFlowConnections').offsetWidth,
            y2: neuronY(outputs[j]),
            active: layers[layers.length - 1][i].output > 0.2
          });
        }
      }
    }

    setLines([...lines]);
  }, [layers]);

  return (
    <div className="TensorFlowConnections">
      <svg ref={svg}>
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            className={'TensorFlowConnections-internal-line' + (line.active ? ' TensorFlowConnections-internal-line-active' : '')}
          />
        ))}
      </svg>
    </div>
  )
}

export default TensorFlowConnections;
