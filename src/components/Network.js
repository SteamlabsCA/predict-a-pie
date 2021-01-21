import './Network.scss';
import Connections from './Connections';
import Layer from './Layer';
import React from 'react';
import { v4 as uuid } from 'uuid';

const testData = [
  {
    'id': uuid(),
    'type': 'input',
    'label': 'Input Layer',
    'neurons': [{
      'id': uuid(),
      'type': 'input',
      'label': 'Neuron'
    }]
  },
  {
    'id': uuid(),
    'label': 'Hidden Layer',
    'neurons': [{
      'id': uuid(),
      'label': 'Neuron'
    }]
  },
  {
    'id': uuid(),
    'type': 'output',
    'label': 'Output Layer',
    'neurons': [{
      'id': uuid(),
      'type': 'output',
      'label': 'Neuron'
    }]
  }
];

function Network() {

  let network = testData;

  const [connections, setConnections] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const [mouseX, setMouseX] = React.useState();
  const [mouseY, setMouseY] = React.useState();

  const isNeuronAdjacent = (n1, n2) => {
    for (let i = 0; i < network.length - 1; i++) {
      if (network[i].neurons.find(neuron => neuron.id === n1)) {
        return network[i+1].neurons.find(neuron => neuron.id === n2)
      }
    }
  }

  const onStartConnection = (neuron) => {
    const rect = neuron.ref.current.getBoundingClientRect();
    const x = rect.left + rect.width - 11;
    const y = rect.top + rect.height / 2;
    setConnections([...connections, {
      from: neuron.id,
      to: false,
      x1: x,
      y1: y,
      x2: false,
      y2: false,
      weight: 0
    }]);
    setDragging(true);
  }

  const onCompleteConnection = (neuron, weight) => {
    if (dragging) {
      let newConnections = [...connections];
      let connection = newConnections.pop();

      // Neurons are on adjacent layers
      if (isNeuronAdjacent(connection.from, neuron.id)) {
        connection.to = neuron.id;
        const rect = neuron.ref.current.getBoundingClientRect();

        // Remove any existing connections
        newConnections = newConnections.filter(item => {
          return !(item.from === connection.from && item.to === neuron.id);
        });

        // Connect to positive terminal
        if (weight > 0) {
          connection.x2 = rect.left + 11;
          connection.y2 = rect.top + 15;

        // Connect to negative terminal
        } else {
          connection.x2 = rect.left + 11;
          connection.y2 = rect.top + rect.height - 14;
        }

        newConnections.push(connection);
      }

      setConnections(newConnections);
      setDragging(false);
    }
  }

  const onMouseMove = (event) => {
    setMouseX(event.clientX);
    setMouseY(event.clientY);
  }

  const onMouseUp = () => {
    if (dragging) {
      setConnections(connections.slice(0, -1));
      setDragging(false);
    }
  }

  return (
    <>
      <div className="Network" onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        {network.map(layer => (
          <Layer
            key={layer.id}
            layer={layer}
            onStartConnection={onStartConnection}
            onCompleteConnection={onCompleteConnection}
          />
        ))}
        <Connections connections={connections} mouseX={mouseX} mouseY={mouseY} />
      </div>
    </>
  );
}

export default Network;
