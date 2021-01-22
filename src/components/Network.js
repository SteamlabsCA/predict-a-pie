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
      if (network[i].neurons.find(neuron => neuron.id === n1.id)) {
        return network[i+1].neurons.find(neuron => neuron.id === n2.id)
      }
    }
  }

  const onStartConnection = (neuron) => {
    setConnections([...connections, {
      from: neuron,
      to: false,
      weight: 0
    }]);
    setDragging(true);
  }

  const onCompleteConnection = (neuron, weight) => {
    if (dragging) {
      let newConnections = [...connections];
      let connection = newConnections.pop();
      if (isNeuronAdjacent(connection.from, neuron)) {
        connection.to = neuron;
        connection.weight = weight;

        // Remove any existing connections
        newConnections = newConnections.filter(item => {
          return !(item.from.id === connection.from.id && item.to.id === neuron.id);
        });

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
